import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.112.0";
import { createRemoteJWKSet, importPKCS8, jwtVerify, SignJWT } from "npm:jose@5.9.6";

const ISSUER = "https://token.actions.githubusercontent.com";
const AUDIENCE = "mission365-apple-release";
const CREDENTIAL_KEY = "apple_appstoreconnect_5RBY84349Q";
const REPOSITORY = "dolodorsey/mission-365";
const WORKFLOW_REF = "dolodorsey/mission-365/.github/workflows/ios-testflight.yml@refs/heads/main";
const BUNDLE_ID = "com.mission365.app";
const JWKS = createRemoteJWKSet(new URL(`${ISSUER}/.well-known/jwks`));

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function appleToken(privateKey: string, keyId: string, issuerId: string) {
  const key = await importPKCS8(privateKey, "ES256");
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({})
    .setProtectedHeader({ alg: "ES256", kid: keyId, typ: "JWT" })
    .setIssuer(issuerId)
    .setAudience("appstoreconnect-v1")
    .setIssuedAt(now)
    .setExpirationTime(now + 600)
    .sign(key);
}

async function appleRequest(jwt: string, path: string) {
  let lastStatus = 0;
  let lastBody: any = {};
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const response = await fetch(`https://api.appstoreconnect.apple.com${path}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const body = await response.json().catch(() => ({}));
      lastStatus = response.status;
      lastBody = body;
      if (response.ok) return { ok: true, status: response.status, body };
      if (![429, 500, 502, 503, 504].includes(response.status)) {
        return { ok: false, status: response.status, body };
      }
    } catch (error) {
      lastBody = { errors: [{ detail: String(error) }] };
    }
    if (attempt < 4) await sleep(attempt * 1200);
  }
  return { ok: false, status: lastStatus || 503, body: lastBody };
}

async function appleFetch(jwt: string, path: string) {
  const response = await appleRequest(jwt, path);
  if (!response.ok) {
    const detail =
      response.body?.errors?.[0]?.detail ||
      response.body?.errors?.[0]?.title ||
      `Apple API ${response.status}`;
    throw new Error(`${detail} [${response.status}]`);
  }
  return response.body;
}

async function existingDistributionProfile(
  jwt: string,
  bundleIdentifier: string,
  certificateId: string,
) {
  const bundles = await appleFetch(
    jwt,
    `/v1/bundleIds?filter[identifier]=${encodeURIComponent(bundleIdentifier)}&fields[bundleIds]=name,platform,identifier&limit=10`,
  );
  const bundle =
    (bundles?.data || []).find(
      (item: any) => item?.attributes?.identifier === bundleIdentifier,
    ) || bundles?.data?.[0];
  if (!bundle?.id) throw new Error(`Apple bundle ID not registered: ${bundleIdentifier}`);

  const profiles = await appleFetch(
    jwt,
    `/v1/bundleIds/${encodeURIComponent(bundle.id)}/profiles?fields[profiles]=name,platform,profileType,profileState,uuid,createdDate,expirationDate&limit=200`,
  );
  const now = Date.now();
  const candidates = (profiles?.data || [])
    .filter((profile: any) => {
      const attributes = profile?.attributes || {};
      const expiry = attributes.expirationDate
        ? Date.parse(attributes.expirationDate)
        : Number.NaN;
      return (
        attributes.profileType === "IOS_APP_STORE" &&
        attributes.profileState === "ACTIVE" &&
        (Number.isNaN(expiry) || expiry > now)
      );
    })
    .sort(
      (a: any, b: any) =>
        Date.parse(b?.attributes?.createdDate || "1970-01-01") -
        Date.parse(a?.attributes?.createdDate || "1970-01-01"),
    );

  for (const profile of candidates) {
    try {
      const relationship = await appleFetch(
        jwt,
        `/v1/profiles/${encodeURIComponent(profile.id)}/relationships/certificates?limit=200`,
      );
      if (!(relationship?.data || []).some((cert: any) => cert?.id === certificateId)) {
        continue;
      }
      const detail = await appleRequest(
        jwt,
        `/v1/profiles/${encodeURIComponent(profile.id)}?fields[profiles]=name,profileType,profileState,profileContent,uuid,expirationDate`,
      );
      if (!detail.ok) {
        if (detail.status === 404) {
          console.warn("Skipping stale Apple provisioning profile", profile.id);
          continue;
        }
        const message =
          detail.body?.errors?.[0]?.detail ||
          detail.body?.errors?.[0]?.title ||
          `Apple API ${detail.status}`;
        throw new Error(`${message} [${detail.status}]`);
      }
      const attributes = detail.body?.data?.attributes || {};
      const content = String(attributes.profileContent || "");
      if (!content) continue;
      return {
        id: profile.id,
        name: String(attributes.name || profile.attributes?.name || ""),
        uuid: String(attributes.uuid || profile.attributes?.uuid || ""),
        content,
        expirationDate: String(
          attributes.expirationDate || profile.attributes?.expirationDate || "",
        ),
      };
    } catch (error) {
      if (String(error).includes("[404]")) {
        console.warn("Skipping stale Apple provisioning profile", profile.id);
        continue;
      }
      throw error;
    }
  }

  throw new Error(
    `No downloadable active IOS_APP_STORE profile tied to the stored distribution certificate for ${bundleIdentifier}`,
  );
}

Deno.serve(async (request) => {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return json({ error: "GitHub OIDC token required" }, 401);

  let payload: Record<string, unknown>;
  try {
    const verified = await jwtVerify(token, JWKS, {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    payload = verified.payload as Record<string, unknown>;
  } catch (error) {
    console.error("Mission 365 GitHub OIDC verification failed", String(error));
    return json({ error: "Invalid GitHub OIDC token" }, 401);
  }

  if (String(payload.repository || "") !== REPOSITORY) {
    return json({ error: "Repository is not authorized for Mission 365 Apple release credentials" }, 403);
  }
  if (String(payload.ref || "") !== "refs/heads/main") {
    return json({ error: "Mission 365 Apple release credentials are main-branch only" }, 403);
  }
  if (String(payload.workflow_ref || "") !== WORKFLOW_REF) {
    return json({ error: "Workflow is not authorized for Mission 365 Apple release credentials" }, 403);
  }
  if (String(payload.runner_environment || "") !== "github-hosted") {
    return json({ error: "GitHub-hosted runner required" }, 403);
  }

  const url = Deno.env.get("SUPABASE_URL") || "";
  const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  if (!url || !service) return json({ error: "Credential broker runtime unavailable" }, 503);

  const admin = createClient(url, service, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await admin
    .from("credentials")
    .select("credential_value,is_active")
    .eq("credential_key", CREDENTIAL_KEY)
    .maybeSingle();
  if (error || !data?.is_active || !data?.credential_value) {
    console.error(
      "Mission 365 Apple release credential record unavailable",
      error?.message || "missing",
    );
    return json({ error: "Apple release credential record unavailable" }, 503);
  }

  const value = data.credential_value as Record<string, any>;
  const privateKey = String(value.api_private_key_p8 || "");
  const keyId = String(value.key_id || "");
  const issuerId = String(value.issuer_id || "");
  const teamId = String(value.team_id || "");
  const p12Base64 = String(value.p12_base64 || "");
  const p12Password = String(value.p12_password || "");
  const certId = String(value.apple_distribution_cert_id || "");
  if (!privateKey || !keyId || !issuerId || !teamId || !p12Base64 || !p12Password || !certId) {
    console.error("Mission 365 Apple release credential set incomplete");
    return json({ error: "Apple release credential set is incomplete" }, 503);
  }

  let stage = "apple_token";
  try {
    const jwt = await appleToken(privateKey, keyId, issuerId);
    stage = "certificate_lookup";
    const cert = await appleFetch(
      jwt,
      `/v1/certificates/${encodeURIComponent(certId)}?fields[certificates]=certificateContent,certificateType,displayName,expirationDate,activated`,
    );
    const attributes = cert?.data?.attributes || {};
    const certificateContent = String(attributes.certificateContent || "");
    const certificateExpiration = String(attributes.expirationDate || "");
    const expirationMs = certificateExpiration
      ? Date.parse(certificateExpiration)
      : Number.NaN;
    if (
      attributes.activated === false ||
      !certificateContent ||
      (!Number.isNaN(expirationMs) && expirationMs <= Date.now())
    ) {
      throw new Error("Stored Apple distribution certificate is inactive or expired");
    }

    stage = "distribution_profile";
    const profile = await existingDistributionProfile(jwt, BUNDLE_ID, certId);

    return json({
      key_id: keyId,
      issuer_id: issuerId,
      team_id: teamId,
      key_content_base64: btoa(privateKey),
      distribution_private_key_p12_base64: p12Base64,
      distribution_private_key_p12_password: p12Password,
      distribution_certificate_content_base64: certificateContent,
      distribution_certificate_id: certId,
      distribution_certificate_type: String(attributes.certificateType || ""),
      distribution_certificate_expiration: certificateExpiration,
      provisioning_profile_content_base64: profile.content,
      provisioning_profile_name: profile.name,
      provisioning_profile_uuid: profile.uuid,
      provisioning_profile_expiration: profile.expirationDate,
      bundle_identifier: BUNDLE_ID,
      repository: REPOSITORY,
    });
  } catch (error) {
    const message = String(error).slice(0, 800);
    console.error("Mission 365 Apple release broker failed", stage, message);
    await admin.from("apple_release_broker_diagnostic_log").insert({
      repository: REPOSITORY,
      stage,
      error_message: message,
    });
    return json(
      {
        error: "Mission 365 Apple release provisioning failed",
        stage,
        detail: message.slice(0, 400),
      },
      503,
    );
  }
});
