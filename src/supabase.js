const SUPABASE_URL = process.env.SUPABASE_URL || "https://dzlmtvodpyhetvektfuo.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function assertConfigured() {
  if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error("Supabase service configuration is missing");
}

function headers(extra = {}) {
  assertConfigured();
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    ...extra,
  };
}

async function parse(response) {
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const detail = data?.message || data?.details || data?.hint || `HTTP ${response.status}`;
    throw new Error(`Supabase request failed: ${detail}`);
  }
  return data;
}

export async function select(table, query = "") {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query ? `?${query}` : ""}`, {
    headers: headers(),
    cache: "no-store",
  });
  return (await parse(response)) || [];
}

export async function insert(table, value) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: headers({ "Content-Type": "application/json", Prefer: "return=representation" }),
    body: JSON.stringify(value),
  });
  return await parse(response);
}

export async function update(table, match, value) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${match}`, {
    method: "PATCH",
    headers: headers({ "Content-Type": "application/json", Prefer: "return=representation" }),
    body: JSON.stringify(value),
  });
  return await parse(response);
}
