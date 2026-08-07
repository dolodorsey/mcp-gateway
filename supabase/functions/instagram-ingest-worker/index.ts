import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const db = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
const enc = new TextEncoder();
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

async function sha256(value: string) {
  const d = await crypto.subtle.digest("SHA-256", enc.encode(value));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function hmacHex(secret: string, body: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(body));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function constantTimeEqual(a: string, b: string) { if (a.length !== b.length) return false; let diff = 0; for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i); return diff === 0; }
async function candidateSecrets() {
  const values = new Set<string>();
  for (const name of ["META_APP_SECRET", "INSTAGRAM_APP_SECRET", "META_LEGACY_APP_SECRET"]) { const v = Deno.env.get(name); if (v) values.add(v); }
  const { data } = await db.from("credentials").select("credential_value").eq("credential_key", "facebook_app_secret").eq("is_active", true).limit(3);
  for (const row of data || []) { const v = row?.credential_value?.secret; if (typeof v === "string" && v) values.add(v); }
  return [...values];
}
async function verifySignature(raw: string, header: string | null) {
  if (!header?.startsWith("sha256=")) return false;
  const expected = header.slice(7).toLowerCase();
  for (const secret of await candidateSecrets()) if (constantTimeEqual(await hmacHex(secret, raw), expected)) return true;
  return false;
}
async function resolveSocialAccount(entryId: string) {
  const { data } = await db.from("social_accounts").select("id,brand_key,brand,username,instagram_user_id,external_account_id,facebook_page_id,connection_id")
    .eq("platform", "instagram").or(`instagram_user_id.eq.${entryId},external_account_id.eq.${entryId},facebook_page_id.eq.${entryId}`).eq("enabled", true).limit(1).maybeSingle();
  return data || null;
}
async function resolveInstagramAccount(entryId: string) {
  const { data } = await db.from("instagram_accounts").select("id,ig_user_id,username,brand_key").eq("ig_user_id", entryId).limit(1).maybeSingle();
  return data || null;
}
function eventRoute(type: string) {
  if (type === "comments" || type === "live_comments") return ["comment_agent", "lead_agent"];
  if (type === "message" || type === "messaging_postbacks" || type === "messaging_referral") return ["dm_agent", "lead_agent"];
  if (type === "mentions") return ["community_agent"];
  return ["social_inbound_router"];
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token") || "";
    const challenge = url.searchParams.get("hub.challenge") || "";
    if (mode !== "subscribe" || !token || !challenge) return new Response("bad request", { status: 400 });
    const tokenHash = await sha256(token);
    const { data } = await db.from("meta_webhook_app_configs").select("id").eq("verify_token_hash", tokenHash).in("status", ["pending", "active", "repairing"]).limit(1).maybeSingle();
    if (!data) return new Response("forbidden", { status: 403 });
    await db.from("meta_webhook_app_configs").update({ last_verified_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq("id", data.id);
    return new Response(challenge, { status: 200, headers: { "content-type": "text/plain" } });
  }
  if (req.method !== "POST") return new Response("method not allowed", { status: 405 });

  const raw = await req.text();
  const signatureHeader = req.headers.get("x-hub-signature-256");
  if (!(await verifySignature(raw, signatureHeader))) return json({ ok: false, error: "invalid_webhook_signature" }, 401);
  let payload: any; try { payload = JSON.parse(raw); } catch { return json({ ok: false, error: "invalid_json" }, 400); }
  if (!payload || !Array.isArray(payload.entry)) return json({ ok: true, accepted: 0, ignored: true });

  const providerEventId = `meta:${await sha256(raw)}`;
  const now = new Date().toISOString();
  const { data: webhookRow, error: webhookError } = await db.from("social_webhook_events")
    .upsert({ provider: "meta", provider_event_id: providerEventId, signature_sha256: signatureHeader?.slice(7) || null, received_at: now, status: "received", raw_event: payload, error: null }, { onConflict: "provider,provider_event_id" })
    .select("id").single();
  if (webhookError) return json({ ok: false, error: "webhook_store_failed" }, 500);

  let eventIndex = 0, accepted = 0; const errors: string[] = [];
  for (const entry of payload.entry) {
    const entryId = String(entry?.id || "");
    const social = entryId ? await resolveSocialAccount(entryId) : null;
    const igAccount = entryId ? await resolveInstagramAccount(entryId) : null;
    const brandKey = social?.brand_key || social?.brand || igAccount?.brand_key || null;
    const handle = social?.username || igAccount?.username || null;

    for (const change of Array.isArray(entry?.changes) ? entry.changes : []) {
      const field = String(change?.field || "change"), value = change?.value || {};
      const commentId = value?.id ? String(value.id) : null;
      const mediaId = value?.media?.id ? String(value.media.id) : (value?.media_id ? String(value.media_id) : null);
      const senderId = value?.from?.id ? String(value.from.id) : null;
      const senderUsername = value?.from?.username ? String(value.from.username) : null;
      const text = value?.text != null ? String(value.text) : null;
      const individualId = commentId ? `comment:${commentId}` : `change:${await sha256(JSON.stringify(change))}`;
      const needsResponse = ["comments", "live_comments"].includes(field) && senderId !== entryId;
      const inbound = { provider: "meta", webhook_event_id: webhookRow.id, provider_event_id: individualId, event_index: eventIndex++, account_id: social?.id || null, connection_id: social?.connection_id || null, brand_key: brandKey, ig_handle: handle, ig_user_id: social?.instagram_user_id || igAccount?.ig_user_id || entryId || null, facebook_page_id: social?.facebook_page_id || null, event_type: field, event_action: value?.verb || null, sender_id: senderId, sender_username: senderUsername, recipient_id: entryId || null, media_id: mediaId, comment_id: commentId, message_id: null, text, raw_payload: change, status: "new", priority: needsResponse ? "high" : "normal", needs_response: needsResponse, routed_to: eventRoute(field), received_at: now, updated_at: now };
      const { error } = await db.from("social_inbound_events").upsert(inbound, { onConflict: "provider,provider_event_id,event_index", ignoreDuplicates: true });
      if (error) errors.push(error.message); else accepted++;
      if (["comments", "live_comments"].includes(field)) {
        const { error: igError } = await db.from("instagram_webhook_events").insert({ ig_account_id: igAccount?.id || null, ig_user_id: entryId || null, event_type: field, igsid: senderId, comment_id: commentId, media_id: mediaId, provider_event_id: individualId, signature_verified: true, payload: change, status: "processed", received_at: now, processed_at: now });
        if (igError && !igError.message.toLowerCase().includes("duplicate")) errors.push(igError.message);
      }
    }

    for (const item of Array.isArray(entry?.messaging) ? entry.messaging : []) {
      let type = "message"; if (item?.postback) type = "messaging_postbacks"; else if (item?.reaction) type = "message_reactions"; else if (item?.read) type = "messaging_seen"; else if (item?.referral) type = "messaging_referral";
      const senderId = item?.sender?.id ? String(item.sender.id) : null, recipientId = item?.recipient?.id ? String(item.recipient.id) : entryId || null;
      const messageId = item?.message?.mid ? String(item.message.mid) : (item?.postback?.mid ? String(item.postback.mid) : null);
      const text = item?.message?.text != null ? String(item.message.text) : (item?.postback?.title != null ? String(item.postback.title) : null);
      const individualId = messageId ? `message:${messageId}` : `${type}:${await sha256(JSON.stringify(item))}`;
      const needsResponse = type === "message" && !Boolean(item?.message?.is_echo) && senderId !== entryId;
      const inbound = { provider: "meta", webhook_event_id: webhookRow.id, provider_event_id: individualId, event_index: eventIndex++, account_id: social?.id || null, connection_id: social?.connection_id || null, brand_key: brandKey, ig_handle: handle, ig_user_id: social?.instagram_user_id || igAccount?.ig_user_id || entryId || null, facebook_page_id: social?.facebook_page_id || null, event_type: type, event_action: item?.postback?.payload || item?.reaction?.action || null, sender_id: senderId, sender_username: null, recipient_id: recipientId, media_id: null, comment_id: null, message_id: messageId, text, raw_payload: item, status: "new", priority: needsResponse ? "high" : "normal", needs_response: needsResponse, routed_to: eventRoute(type), received_at: now, updated_at: now };
      const { error } = await db.from("social_inbound_events").upsert(inbound, { onConflict: "provider,provider_event_id,event_index", ignoreDuplicates: true });
      if (error) errors.push(error.message); else accepted++;
    }

    if (entryId) await db.from("social_webhook_subscriptions").update({ last_webhook_received_at: now, last_verified_at: now, status: "active", last_error: null, updated_at: now }).or(`ig_user_id.eq.${entryId},facebook_page_id.eq.${entryId}`);
  }

  await db.from("social_webhook_events").update({ status: errors.length ? "error" : "processed", processed_at: now, error: errors.length ? errors.slice(0, 5).join(" | ") : null }).eq("id", webhookRow.id);
  await db.from("meta_webhook_app_configs").update({ last_webhook_received_at: now, updated_at: now }).eq("status", "active");
  return json({ ok: true, accepted, errors: errors.length });
});
