import { decryptSecret, encryptSecret } from "./vault.js";
import { insert, select, update } from "./supabase.js";
import { buildRawEmail, normalizeGmailMessage } from "./mime.js";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GMAIL_API = "https://gmail.googleapis.com/gmail/v1/users/me";
const nowIso = () => new Date().toISOString();
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function assertUuid(value) {
  if (!uuidPattern.test(String(value || ""))) throw new Error("A valid account_id is required");
}

async function getAccount(accountId) {
  assertUuid(accountId);
  const rows = await select(
    "connected_accounts",
    `id=eq.${accountId}&provider=eq.gmail&platform=eq.email&select=*&limit=1`
  );
  const account = rows[0];
  if (!account) throw new Error("Gmail account not found");
  if (account.connection_status !== "connected") throw new Error("Gmail account is not connected");
  return account;
}

async function getCredential(accountId) {
  const rows = await select(
    "connected_account_credentials",
    `connected_account_id=eq.${accountId}&provider=eq.gmail&credential_type=eq.oauth&status=eq.active&select=*&order=updated_at.desc&limit=1`
  );
  const credential = rows[0];
  if (!credential) throw new Error("Active OAuth credential not found for this account");
  return credential;
}

function requireCapability(account, capability) {
  if (!account[capability]) throw new Error(`Account policy blocks ${capability.replace("can_", "")}`);
  if (account.approval_mode === "read_only" && !["can_read", "can_search"].includes(capability)) {
    throw new Error("Account is configured as read only");
  }
}

async function postForm(url, fields) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(fields),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error_description || data.error || `Google OAuth failed (${response.status})`);
  return data;
}

async function accessToken(account, credential, force = false) {
  if (!force && credential.encrypted_access_token && credential.expires_at && new Date(credential.expires_at).getTime() > Date.now() + 60_000) {
    return decryptSecret(credential.encrypted_access_token);
  }
  if (!credential.encrypted_refresh_token) throw new Error("Refresh token missing; reconnect this Gmail account");
  if (!process.env.GOOGLE_OAUTH_CLIENT_ID || !process.env.GOOGLE_OAUTH_CLIENT_SECRET) {
    throw new Error("Google OAuth client configuration is missing");
  }

  const tokenData = await postForm(GOOGLE_TOKEN_URL, {
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    refresh_token: decryptSecret(credential.encrypted_refresh_token),
    grant_type: "refresh_token",
  });
  const expiresAt = new Date(Date.now() + Number(tokenData.expires_in || 3600) * 1000).toISOString();
  await update("connected_account_credentials", `id=eq.${credential.id}`, {
    encrypted_access_token: encryptSecret(tokenData.access_token),
    expires_at: expiresAt,
    last_rotated_at: nowIso(),
    last_verified_at: nowIso(),
    updated_at: nowIso(),
  });
  await update("connected_accounts", `id=eq.${account.id}`, {
    token_expires_at: expiresAt,
    last_verified_at: nowIso(),
    blocking_reason: null,
    updated_at: nowIso(),
  });
  return tokenData.access_token;
}

export async function gmailRequest(accountId, path, options = {}) {
  const account = await getAccount(accountId);
  const credential = await getCredential(account.id);

  const execute = async (force) => {
    const token = await accessToken(account, credential, force);
    return fetch(`${GMAIL_API}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(options.headers || {}),
      },
    });
  };

  let response = await execute(false);
  if (response.status === 401) response = await execute(true);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || `Gmail API failed (${response.status})`);
  return { account, data };
}

async function actionLog({ account, toolName, actionType, status, approvalStatus = "not_required", requestedBy = "mcp-client", messageId = null, threadId = null, recipients = [], payload = {}, error = null }) {
  try {
    await insert("email_action_logs", {
      connected_account_id: account?.id || null,
      brand_slug: account?.brand_slug || null,
      requested_by_type: "agent",
      requested_by_id: requestedBy,
      tool_name: toolName,
      action_type: actionType,
      gmail_message_id: messageId,
      gmail_thread_id: threadId,
      recipients,
      request_payload_redacted: payload,
      approval_status: approvalStatus,
      status,
      error_message: error,
      completed_at: ["completed", "failed", "blocked"].includes(status) ? nowIso() : null,
    });
  } catch {}
}

export async function listAccounts({ brandSlug, connectedOnly = true } = {}) {
  const filters = ["select=*"];
  if (brandSlug) filters.push(`brand_slug=eq.${encodeURIComponent(brandSlug)}`);
  if (connectedOnly) filters.push("connection_status=eq.connected");
  filters.push("order=brand_slug.asc,email_address.asc");
  return select("v_gmail_connected_accounts", filters.join("&"));
}

export async function listLabels(accountId) {
  const account = await getAccount(accountId);
  requireCapability(account, "can_read");
  return (await gmailRequest(accountId, "/labels")).data;
}

export async function searchMessages(accountId, { query = "", maxResults = 25, pageToken = null, includeSpamTrash = false, includeContent = false } = {}) {
  const account = await getAccount(accountId);
  requireCapability(account, "can_search");
  const params = new URLSearchParams({
    maxResults: String(Math.min(Math.max(Number(maxResults) || 25, 1), includeContent ? 20 : 100)),
    includeSpamTrash: String(Boolean(includeSpamTrash)),
  });
  if (query) params.set("q", query);
  if (pageToken) params.set("pageToken", pageToken);
  const result = (await gmailRequest(accountId, `/messages?${params.toString()}`)).data;
  if (!includeContent || !result.messages?.length) return result;
  const messages = await Promise.all(result.messages.map(async ({ id }) => getMessage(accountId, id, "full")));
  return { ...result, messages };
}

export async function getMessage(accountId, messageId, format = "full") {
  const account = await getAccount(accountId);
  requireCapability(account, "can_read");
  const data = (await gmailRequest(accountId, `/messages/${encodeURIComponent(messageId)}?format=${encodeURIComponent(format)}`)).data;
  return format === "full" ? normalizeGmailMessage(data) : data;
}

export async function getThread(accountId, threadId, format = "full") {
  const account = await getAccount(accountId);
  requireCapability(account, "can_read");
  const data = (await gmailRequest(accountId, `/threads/${encodeURIComponent(threadId)}?format=${encodeURIComponent(format)}`)).data;
  if (format !== "full") return data;
  return { ...data, messages: (data.messages || []).map(normalizeGmailMessage) };
}

export async function getAttachment(accountId, messageId, attachmentId) {
  const account = await getAccount(accountId);
  requireCapability(account, "can_read");
  return (await gmailRequest(accountId, `/messages/${encodeURIComponent(messageId)}/attachments/${encodeURIComponent(attachmentId)}`)).data;
}

export async function createDraft(accountId, message, requestedBy = "mcp-client") {
  const account = await getAccount(accountId);
  requireCapability(account, "can_draft");
  const raw = buildRawEmail({ ...message, from: account.account_identifier });
  const result = (await gmailRequest(accountId, "/drafts", {
    method: "POST",
    body: JSON.stringify({ message: { raw, ...(message.threadId ? { threadId: message.threadId } : {}) } }),
  })).data;
  await actionLog({ account, toolName: "email_create_draft", actionType: "draft", status: "completed", requestedBy, messageId: result.message?.id, threadId: result.message?.threadId, recipients: Array.isArray(message.to) ? message.to : [message.to], payload: { subject: message.subject } });
  return result;
}

function sendApproved(account, confirmed) {
  if (account.approval_mode === "read_only") throw new Error("Account is read only");
  if (account.approval_mode === "draft_only") throw new Error("Account is draft only");
  return account.approval_mode !== "confirm_before_send" || confirmed === true;
}

export async function sendMessage(accountId, message, { confirmed = false, requestedBy = "mcp-client" } = {}) {
  const account = await getAccount(accountId);
  requireCapability(account, message.threadId ? "can_reply" : "can_send");
  const recipients = Array.isArray(message.to) ? message.to : [message.to];
  if (!sendApproved(account, confirmed)) {
    await actionLog({ account, toolName: message.threadId ? "email_reply" : "email_send_message", actionType: message.threadId ? "reply" : "send", status: "pending_approval", approvalStatus: "required", requestedBy, recipients, payload: { subject: message.subject } });
    return {
      ok: false,
      approval_required: true,
      account_id: account.id,
      mailbox: account.account_identifier,
      instruction: "Ask the user to approve this exact message, then call again with confirmed=true.",
    };
  }

  const raw = buildRawEmail({ ...message, from: account.account_identifier });
  try {
    const data = (await gmailRequest(accountId, "/messages/send", {
      method: "POST",
      body: JSON.stringify({ raw, ...(message.threadId ? { threadId: message.threadId } : {}) }),
    })).data;
    await actionLog({ account, toolName: message.threadId ? "email_reply" : "email_send_message", actionType: message.threadId ? "reply" : "send", status: "completed", approvalStatus: account.approval_mode === "confirm_before_send" ? "approved" : "not_required", requestedBy, messageId: data.id, threadId: data.threadId, recipients, payload: { subject: message.subject } });
    return { ok: true, ...data, mailbox: account.account_identifier };
  } catch (error) {
    await actionLog({ account, toolName: message.threadId ? "email_reply" : "email_send_message", actionType: message.threadId ? "reply" : "send", status: "failed", approvalStatus: account.approval_mode === "confirm_before_send" ? "approved" : "not_required", requestedBy, recipients, payload: { subject: message.subject }, error: error?.message || String(error) });
    throw error;
  }
}

export async function modifyMessage(accountId, messageId, { addLabelIds = [], removeLabelIds = [] } = {}, requestedBy = "mcp-client") {
  const account = await getAccount(accountId);
  requireCapability(account, "can_label");
  const data = (await gmailRequest(accountId, `/messages/${encodeURIComponent(messageId)}/modify`, {
    method: "POST",
    body: JSON.stringify({ addLabelIds, removeLabelIds }),
  })).data;
  await actionLog({ account, toolName: "email_modify_message", actionType: "modify", status: "completed", requestedBy, messageId, threadId: data.threadId, payload: { addLabelIds, removeLabelIds } });
  return data;
}

export async function archiveMessage(accountId, messageId, requestedBy = "mcp-client") {
  const account = await getAccount(accountId);
  requireCapability(account, "can_archive");
  return modifyMessage(accountId, messageId, { removeLabelIds: ["INBOX"] }, requestedBy);
}

export async function markRead(accountId, messageId, read = true, requestedBy = "mcp-client") {
  return modifyMessage(accountId, messageId, read ? { removeLabelIds: ["UNREAD"] } : { addLabelIds: ["UNREAD"] }, requestedBy);
}

export async function trashMessage(accountId, messageId, { confirmed = false, requestedBy = "mcp-client" } = {}) {
  const account = await getAccount(accountId);
  requireCapability(account, "can_delete");
  if (!confirmed) {
    await actionLog({ account, toolName: "email_trash_message", actionType: "trash", status: "pending_approval", approvalStatus: "required", requestedBy, messageId });
    return { ok: false, approval_required: true, instruction: "Confirm the trash action, then call again with confirmed=true." };
  }
  const data = (await gmailRequest(accountId, `/messages/${encodeURIComponent(messageId)}/trash`, {
    method: "POST",
    body: "{}",
  })).data;
  await actionLog({ account, toolName: "email_trash_message", actionType: "trash", status: "completed", approvalStatus: "approved", requestedBy, messageId, threadId: data.threadId });
  return { ok: true, ...data };
}
