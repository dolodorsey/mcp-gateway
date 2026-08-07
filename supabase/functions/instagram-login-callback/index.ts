import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const IG_APP_ID = Deno.env.get("INSTAGRAM_APP_ID") || "";
const IG_APP_SECRET = Deno.env.get("INSTAGRAM_APP_SECRET") || "";
const CALLBACK = Deno.env.get("INSTAGRAM_OAUTH_REDIRECT_URI") || `${SUPABASE_URL}/functions/v1/instagram-login-callback`;
const ENC_KEY = Deno.env.get("CONNECTION_TOKEN_ENCRYPTION_KEY") || "";
const DEFAULT_RETURN = "https://www.doctordorsey.com/ops-os/connections";
const WEBHOOK_FIELDS = ["comments","live_comments","messages","messaging_postbacks","message_reactions","messaging_seen","messaging_referral","mentions","story_insights"];
const db = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
const cors = { "access-control-allow-origin": "*", "access-control-allow-headers": "authorization,apikey,content-type", "access-control-allow-methods": "GET,OPTIONS" };

function b64u(bytes: Uint8Array) { let s = ""; for (const b of bytes) s += String.fromCharCode(b); return btoa(s).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", ""); }
async function sha(v: string) { const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(v)); return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, "0")).join(""); }
async function encrypt(value: string) {
  if (!ENC_KEY) throw new Error("missing_connection_token_encryption_key");
  const kb = Uint8Array.from(atob(ENC_KEY), (c) => c.charCodeAt(0));
  if (![16, 24, 32].includes(kb.length)) throw new Error("invalid_connection_token_encryption_key");
  const iv = new Uint8Array(12); crypto.getRandomValues(iv);
  const key = await crypto.subtle.importKey("raw", kb, "AES-GCM", false, ["encrypt"]);
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(value));
  return `v1:${b64u(iv)}:${b64u(new Uint8Array(ct))}`;
}
function safeReturn(v: string | null) { try { const u = new URL(v || DEFAULT_RETURN); return u.protocol === "https:" ? u.toString() : DEFAULT_RETURN; } catch { return DEFAULT_RETURN; } }
function redirect(base: string, params: Record<string, string>) { const u = new URL(safeReturn(base)); for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v); return new Response(null, { status: 302, headers: { ...cors, location: u.toString() } }); }
async function igGet(path:string, token:string, params:Record<string,string>={}) { const u=new URL(`https://graph.instagram.com/${path.replace(/^\//,"")}`); u.searchParams.set("access_token",token); for(const[k,v]of Object.entries(params))u.searchParams.set(k,v); const r=await fetch(u); const b=await r.json().catch(()=>({})); return {ok:r.ok&&!b?.error,status:r.status,body:b,error:r.ok&&!b?.error?null:String(b?.error?.message||`http_${r.status}`).slice(0,300)}; }
async function igPost(path:string, token:string, params:Record<string,string>={}) { const u=new URL(`https://graph.instagram.com/${path.replace(/^\//,"")}`); const body=new URLSearchParams({access_token:token,...params}); const r=await fetch(u,{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body}); const b=await r.json().catch(()=>({})); return {ok:r.ok&&!b?.error,status:r.status,body:b,error:r.ok&&!b?.error?null:String(b?.error?.message||`http_${r.status}`).slice(0,300)}; }
async function setCapability(socialId:string,key:string,ok:boolean,permission:string,reason:string|null,metadata:any={}) { const now=new Date().toISOString(); await db.from("social_account_capabilities").upsert({social_account_id:socialId,capability_key:key,capability_status:ok?"verified":"degraded",permission_name:permission,test_method:"instagram_login_live_probe",verified_at:now,last_success_at:ok?now:null,last_failure_at:ok?null:now,failure_reason_safe:ok?null:reason,metadata,updated_at:now},{onConflict:"social_account_id,capability_key"}); }

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const incoming = new URL(req.url);
  let returnUrl = DEFAULT_RETURN;
  try {
    const err = incoming.searchParams.get("error");
    if (err) return redirect(returnUrl, { connection_status: "failed", provider: "instagram_login", error: String(incoming.searchParams.get("error_description") || err).slice(0, 160) });
    const code = incoming.searchParams.get("code");
    const state = incoming.searchParams.get("state");
    if (!code || !state) throw new Error("missing_code_or_state");
    if (!IG_APP_ID || !IG_APP_SECRET) throw new Error("missing_instagram_app_credentials");

    const { data: stateRow, error: stateError } = await db.from("connection_oauth_states")
      .select("*").eq("provider", "instagram_login").eq("state_token_hash", await sha(state))
      .eq("status", "created").gt("expires_at", new Date().toISOString()).maybeSingle();
    if (stateError) throw stateError;
    if (!stateRow) throw new Error("invalid_or_expired_state");
    returnUrl = stateRow.return_url || returnUrl;

    const form = new URLSearchParams();
    form.set("client_id", IG_APP_ID); form.set("client_secret", IG_APP_SECRET); form.set("grant_type", "authorization_code"); form.set("redirect_uri", CALLBACK); form.set("code", code);
    const shortRes = await fetch("https://api.instagram.com/oauth/access_token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: form });
    const shortBody = await shortRes.json().catch(() => ({}));
    if (!shortRes.ok || !shortBody?.access_token) throw new Error(shortBody?.error_message || shortBody?.error?.message || `short_token_exchange_failed_${shortRes.status}`);

    const longUrl = new URL("https://graph.instagram.com/access_token");
    longUrl.searchParams.set("grant_type", "ig_exchange_token"); longUrl.searchParams.set("client_secret", IG_APP_SECRET); longUrl.searchParams.set("access_token", String(shortBody.access_token));
    const longRes = await fetch(longUrl); const longBody = await longRes.json().catch(() => ({}));
    const token = String(longBody?.access_token || shortBody.access_token);
    const expiresSeconds = Number(longBody?.expires_in || 5184000);
    const expiresAt = new Date(Date.now() + Math.max(86400, expiresSeconds) * 1000).toISOString();

    const me = await igGet("me",token,{fields:"user_id,username,account_type,name,profile_picture_url"});
    if (!me.ok || !me.body?.username) throw new Error(me.error || "profile_lookup_failed");

    const handle = String(me.body.username).replace(/^@/, "").toLowerCase();
    const igId = String(me.body.user_id || me.body.id || "");
    const brandSlug = String(stateRow.brand_slug || handle);
    const now = new Date().toISOString();
    const scopes = Array.isArray(stateRow.requested_permissions) ? stateRow.requested_permissions.map(String) : [];

    const insightProbe = scopes.includes("instagram_business_manage_insights")
      ? await igGet(`${igId}/insights`,token,{metric:"reach,profile_views",period:"day"})
      : {ok:false,status:0,body:{},error:"insights_scope_not_granted"};
    const webhookProbe = await igPost(`${igId}/subscribed_apps`,token,{subscribed_fields:WEBHOOK_FIELDS.join(",")});

    const { data: account, error: accountError } = await db.from("connected_accounts").upsert({
      brand_slug: brandSlug, provider: "instagram_login", platform: "instagram",
      account_identifier: handle, display_name: `@${handle}`, external_account_id: igId,
      connection_status: "connected", permission_status: "instagram_login_verified",
      scopes, token_expires_at: expiresAt, last_verified_at: now,
      worker_enabled: true, queue_enabled: true, blocking_reason: null, approval_mode: "confirm_before_send",
      metadata: { execution_policy: "instagram_login_direct", api_host: "graph.instagram.com", account_type: me.body.account_type || null, facebook_page_required: false, insights_verified: insightProbe.ok, webhook_subscribed: webhookProbe.ok },
      updated_at: now,
    }, { onConflict: "provider,account_identifier,brand_slug" }).select("id").single();
    if (accountError) throw accountError;

    await db.from("connected_account_credentials").update({ status: "rotated", updated_at: now })
      .eq("connected_account_id", account.id).eq("provider", "instagram_login").eq("status", "active");
    const { error: credError } = await db.from("connected_account_credentials").insert({
      connected_account_id: account.id, provider: "instagram_login", credential_type: "instagram_user_token",
      encrypted_access_token: await encrypt(token), scopes, expires_at: expiresAt,
      last_rotated_at: now, last_verified_at: now, status: "active",
    });
    if (credError) throw credError;

    const { data: existingSocial } = await db.from("social_accounts").select("id").eq("platform", "instagram").ilike("username", handle).limit(1).maybeSingle();
    const capabilities = ["read","publish","comments","messages",...(insightProbe.ok?["insights"]:[]),...(webhookProbe.ok?["webhooks"]:[])];
    const payload = {
      brand: brandSlug, brand_key: brandSlug, platform: "instagram", username: handle,
      external_account_id: igId, instagram_user_id: igId,
      display_name: me.body.name || `@${handle}`, profile_image_url: me.body.profile_picture_url || null,
      status: "connected", webhook_status: webhookProbe.ok ? "active" : "degraded", enabled: true,
      granted_permissions: scopes, capabilities,
      connected_at: now, last_verified_at: now, last_successful_sync_at: now,
      last_provider_error: webhookProbe.ok ? null : webhookProbe.error, reconnect_reason: null,
      metadata: { execution_policy: "instagram_login_direct", api_host: "graph.instagram.com", connected_account_id: account.id, source_of_truth: "instagram_business_login", facebook_page_required: false, insights_verified: insightProbe.ok, webhook_subscribed: webhookProbe.ok },
      updated_at: now,
    };
    let socialId = existingSocial?.id || null;
    if (socialId) {
      const { error: socialError } = await db.from("social_accounts").update(payload).eq("id", socialId); if (socialError) throw socialError;
    } else {
      const { data: inserted, error: socialError } = await db.from("social_accounts").insert(payload).select("id").single(); if (socialError) throw socialError; socialId = inserted.id;
    }

    if (socialId) {
      await setCapability(socialId,"read",true,"instagram_business_basic",null,{provider:"instagram_login"});
      await setCapability(socialId,"publish",scopes.includes("instagram_business_content_publish"),"instagram_business_content_publish",scopes.includes("instagram_business_content_publish")?null:"scope_not_granted",{provider:"instagram_login",non_destructive:true});
      await setCapability(socialId,"comments",scopes.includes("instagram_business_manage_comments"),"instagram_business_manage_comments",scopes.includes("instagram_business_manage_comments")?null:"scope_not_granted",{provider:"instagram_login",non_destructive:true});
      await setCapability(socialId,"messages",scopes.includes("instagram_business_manage_messages"),"instagram_business_manage_messages",scopes.includes("instagram_business_manage_messages")?null:"scope_not_granted",{provider:"instagram_login",non_destructive:true});
      await setCapability(socialId,"insights",insightProbe.ok,"instagram_business_manage_insights",insightProbe.error,{provider:"instagram_login",http_status:insightProbe.status});
      await setCapability(socialId,"webhooks",webhookProbe.ok,"instagram_business_webhooks",webhookProbe.error,{provider:"instagram_login",http_status:webhookProbe.status,fields:WEBHOOK_FIELDS});
      await db.from("social_webhook_subscriptions").upsert({account_id:socialId,brand_key:brandSlug,ig_handle:`@${handle}`,ig_user_id:igId,status:webhookProbe.ok?"active":"degraded",subscribed_fields:webhookProbe.ok?WEBHOOK_FIELDS:[],subscribed_at:webhookProbe.ok?now:null,last_verified_at:now,last_error:webhookProbe.ok?null:webhookProbe.error,metadata:{provider:"instagram_login",api_host:"graph.instagram.com",live_probe:true},updated_at:now},{onConflict:"account_id,facebook_page_id"});
    }

    await db.from("connection_oauth_states").update({ status: "completed", completed_at: now, metadata: { ...(stateRow.metadata || {}), connected_handle: handle, instagram_user_id: igId, insights_verified: insightProbe.ok, webhook_subscribed: webhookProbe.ok } }).eq("id", stateRow.id);
    await db.from("connection_audit_log").insert({ provider: "instagram_login", brand_slug: brandSlug, action: "instagram_login_callback", status: "connected", message: `Connected @${handle} via Instagram Login; insights=${insightProbe.ok}; webhooks=${webhookProbe.ok}.`, metadata: { execution_policy: "instagram_login_direct", instagram_user_id: igId, expires_at: expiresAt, insights_verified: insightProbe.ok, webhook_subscribed: webhookProbe.ok, secrets_returned:false } });

    return redirect(returnUrl, { connection_status: "connected", provider: "instagram_login", handle, insights: insightProbe.ok?"verified":"degraded", webhooks: webhookProbe.ok?"active":"degraded" });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const { error: auditError } = await db.from("connection_audit_log").insert({ provider: "instagram_login", action: "instagram_login_callback", status: "failed", message, metadata: { execution_policy: "instagram_login_direct", secrets_returned:false } });
    if (auditError) console.error("callback_audit_failed", auditError.message);
    return redirect(returnUrl, { connection_status: "failed", provider: "instagram_login", error: message.slice(0, 180) });
  }
});
