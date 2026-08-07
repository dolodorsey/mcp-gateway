import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const IG_APP_ID = Deno.env.get("INSTAGRAM_APP_ID") || "";
const CALLBACK = Deno.env.get("INSTAGRAM_OAUTH_REDIRECT_URI") || `${SUPABASE_URL}/functions/v1/instagram-login-callback`;
const DEFAULT_RETURN = "https://www.doctordorsey.com/ops-os/connections";
const SCOPES = [
  "instagram_business_basic",
  "instagram_business_content_publish",
  "instagram_business_manage_comments",
  "instagram_business_manage_messages",
  "instagram_business_manage_insights",
];
const db = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
const cors = { "access-control-allow-origin": "*", "access-control-allow-headers": "authorization,apikey,content-type", "access-control-allow-methods": "GET,POST,OPTIONS" };
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b, null, 2), { status: s, headers: { ...cors, "content-type": "application/json", "cache-control": "no-store" } });
function b64u(bytes: Uint8Array) { let s = ""; for (const b of bytes) s += String.fromCharCode(b); return btoa(s).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", ""); }
function randomToken() { const b = new Uint8Array(32); crypto.getRandomValues(b); return b64u(b); }
async function sha(v: string) { const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(v)); return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, "0")).join(""); }
function safeReturn(v: string | null) { try { const u = new URL(v || DEFAULT_RETURN); return u.protocol === "https:" ? u.toString() : DEFAULT_RETURN; } catch { return DEFAULT_RETURN; } }
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (!IG_APP_ID) return json({ ok: false, error: "missing_instagram_app_id" }, 500);
  const url = new URL(req.url); let body: any = {}; if (req.method === "POST") body = await req.json().catch(() => ({}));
  const handle = String(body.ig_handle || url.searchParams.get("ig_handle") || "").replace(/^@/, "").toLowerCase();
  const brandSlug = String(body.brand_slug || url.searchParams.get("brand_slug") || handle || "khg");
  const returnUrl = safeReturn(String(body.return_url || url.searchParams.get("return_url") || ""));
  const state = randomToken();
  const { error } = await db.from("connection_oauth_states").insert({ provider: "instagram_login", brand_slug: brandSlug, account_identifier: handle || "instagram_direct", state_token_hash: await sha(state), redirect_uri: CALLBACK, return_url: returnUrl, status: "created", requested_permissions: SCOPES, metadata: { execution_policy: "instagram_login_direct", expected_handle: handle || null, includes_insights: true }, expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString() });
  if (error) return json({ ok: false, error: error.message }, 500);
  const auth = new URL("https://www.instagram.com/oauth/authorize"); auth.searchParams.set("client_id", IG_APP_ID); auth.searchParams.set("redirect_uri", CALLBACK); auth.searchParams.set("response_type", "code"); auth.searchParams.set("scope", SCOPES.join(",")); auth.searchParams.set("state", state);
  const wantsJson = req.method === "POST" || (req.headers.get("accept") || "").includes("application/json");
  if (wantsJson) return json({ ok: true, execution_policy: "instagram_login_direct", auth_url: auth.toString(), callback: CALLBACK, return_url: returnUrl, scopes: SCOPES, expires_in_seconds: 900 });
  return new Response(null, { status: 302, headers: { ...cors, location: auth.toString() } });
});
