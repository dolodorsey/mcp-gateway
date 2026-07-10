import crypto from "node:crypto";
import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import {
  archiveMessage,
  createDraft,
  getAttachment,
  getMessage,
  getThread,
  listAccounts,
  listLabels,
  markRead,
  modifyMessage,
  searchMessages,
  sendMessage,
  trashMessage,
} from "./gmail.js";

const app = express();
const port = Number(process.env.PORT || 8787);
const transports = new Map();

app.disable("x-powered-by");
app.use(express.json({ limit: "2mb" }));

function timingSafeEqual(a, b) {
  const left = Buffer.from(String(a || ""));
  const right = Buffer.from(String(b || ""));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function requireGatewayKey(req, res, next) {
  const expected = process.env.MCP_GATEWAY_KEY;
  if (!expected) return res.status(503).json({ error: "MCP_GATEWAY_KEY is not configured" });
  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!timingSafeEqual(token, expected)) return res.status(401).json({ error: "Unauthorized" });

  const allowed = String(process.env.MCP_ALLOWED_ORIGINS || "").split(",").map((value) => value.trim()).filter(Boolean);
  const origin = req.headers.origin;
  if (origin && allowed.length && !allowed.includes(origin)) return res.status(403).json({ error: "Origin not allowed" });
  next();
}

function output(value) {
  return {
    content: [{ type: "text", text: JSON.stringify(value, null, 2) }],
  };
}

function toolHandler(handler) {
  return async (args) => {
    try {
      return output(await handler(args));
    } catch (error) {
      return {
        isError: true,
        content: [{ type: "text", text: JSON.stringify({ ok: false, error: error?.message || String(error) }, null, 2) }],
      };
    }
  };
}

const accountIdSchema = z.string().uuid().describe("Exact connected Gmail account UUID. Never infer or substitute an email address.");
const recipientSchema = z.union([z.string().email(), z.array(z.string().email()).min(1)]);

function buildServer(requestedBy) {
  const server = new McpServer({
    name: "kollective-email-gateway",
    version: "1.0.0",
  });

  server.registerTool(
    "email_list_accounts",
    {
      description: "List credential-free Gmail accounts available to the gateway. Use this first to obtain the exact account_id.",
      inputSchema: {
        brand_slug: z.string().optional(),
        connected_only: z.boolean().default(true),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    toolHandler(({ brand_slug, connected_only }) => listAccounts({ brandSlug: brand_slug, connectedOnly: connected_only }))
  );

  server.registerTool(
    "email_search_messages",
    {
      description: "Search one explicitly selected Gmail account using Gmail search syntax.",
      inputSchema: {
        account_id: accountIdSchema,
        query: z.string().default(""),
        max_results: z.number().int().min(1).max(100).default(25),
        page_token: z.string().optional(),
        include_spam_trash: z.boolean().default(false),
        include_content: z.boolean().default(false),
      },
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    toolHandler((args) => searchMessages(args.account_id, {
      query: args.query,
      maxResults: args.max_results,
      pageToken: args.page_token,
      includeSpamTrash: args.include_spam_trash,
      includeContent: args.include_content,
    }))
  );

  server.registerTool(
    "email_get_message",
    {
      description: "Read and normalize one Gmail message from one explicit account.",
      inputSchema: {
        account_id: accountIdSchema,
        message_id: z.string().min(1),
        format: z.enum(["full", "metadata", "minimal", "raw"]).default("full"),
      },
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    toolHandler(({ account_id, message_id, format }) => getMessage(account_id, message_id, format))
  );

  server.registerTool(
    "email_get_thread",
    {
      description: "Read a Gmail thread from one explicit account.",
      inputSchema: {
        account_id: accountIdSchema,
        thread_id: z.string().min(1),
        format: z.enum(["full", "metadata", "minimal"]).default("full"),
      },
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    toolHandler(({ account_id, thread_id, format }) => getThread(account_id, thread_id, format))
  );

  server.registerTool(
    "email_list_labels",
    {
      description: "List Gmail labels for one explicit account.",
      inputSchema: { account_id: accountIdSchema },
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    toolHandler(({ account_id }) => listLabels(account_id))
  );

  server.registerTool(
    "email_get_attachment",
    {
      description: "Retrieve a Gmail attachment body as base64url data from one explicit account.",
      inputSchema: {
        account_id: accountIdSchema,
        message_id: z.string().min(1),
        attachment_id: z.string().min(1),
      },
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    toolHandler(({ account_id, message_id, attachment_id }) => getAttachment(account_id, message_id, attachment_id))
  );

  const messageSchema = {
    account_id: accountIdSchema,
    to: recipientSchema,
    cc: z.array(z.string().email()).default([]),
    bcc: z.array(z.string().email()).default([]),
    subject: z.string().min(1),
    text: z.string().optional(),
    html: z.string().optional(),
  };

  server.registerTool(
    "email_create_draft",
    {
      description: "Create a draft in one explicit Gmail account. This does not send the email.",
      inputSchema: messageSchema,
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
    },
    toolHandler(({ account_id, ...message }) => createDraft(account_id, message, requestedBy))
  );

  server.registerTool(
    "email_send_message",
    {
      description: "Send from one explicit Gmail account. Mailboxes in confirm_before_send mode return approval_required until confirmed=true.",
      inputSchema: {
        ...messageSchema,
        confirmed: z.boolean().default(false).describe("True only after the user approves the exact recipients, subject, and body."),
      },
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: true },
    },
    toolHandler(({ account_id, confirmed, ...message }) => sendMessage(account_id, message, { confirmed, requestedBy }))
  );

  server.registerTool(
    "email_reply",
    {
      description: "Reply inside an existing Gmail thread from one explicit account.",
      inputSchema: {
        ...messageSchema,
        thread_id: z.string().min(1),
        in_reply_to: z.string().optional(),
        references: z.string().optional(),
        confirmed: z.boolean().default(false),
      },
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: true },
    },
    toolHandler(({ account_id, thread_id, in_reply_to, references, confirmed, ...message }) => sendMessage(account_id, {
      ...message,
      threadId: thread_id,
      inReplyTo: in_reply_to,
      references,
    }, { confirmed, requestedBy }))
  );

  server.registerTool(
    "email_modify_message",
    {
      description: "Add or remove Gmail labels on one message in one explicit account.",
      inputSchema: {
        account_id: accountIdSchema,
        message_id: z.string().min(1),
        add_label_ids: z.array(z.string()).default([]),
        remove_label_ids: z.array(z.string()).default([]),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    toolHandler(({ account_id, message_id, add_label_ids, remove_label_ids }) => modifyMessage(account_id, message_id, { addLabelIds: add_label_ids, removeLabelIds: remove_label_ids }, requestedBy))
  );

  server.registerTool(
    "email_archive_message",
    {
      description: "Archive one message by removing the INBOX label in one explicit account.",
      inputSchema: { account_id: accountIdSchema, message_id: z.string().min(1) },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    toolHandler(({ account_id, message_id }) => archiveMessage(account_id, message_id, requestedBy))
  );

  server.registerTool(
    "email_mark_read",
    {
      description: "Mark one message read or unread in one explicit account.",
      inputSchema: {
        account_id: accountIdSchema,
        message_id: z.string().min(1),
        read: z.boolean().default(true),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    toolHandler(({ account_id, message_id, read }) => markRead(account_id, message_id, read, requestedBy))
  );

  server.registerTool(
    "email_trash_message",
    {
      description: "Move one message to Trash. The selected account must have can_delete enabled and confirmed must be true.",
      inputSchema: {
        account_id: accountIdSchema,
        message_id: z.string().min(1),
        confirmed: z.boolean().default(false),
      },
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
    },
    toolHandler(({ account_id, message_id, confirmed }) => trashMessage(account_id, message_id, { confirmed, requestedBy }))
  );

  return server;
}

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "kollective-email-gateway", version: "1.0.0", active_sessions: transports.size });
});

app.post("/mcp", requireGatewayKey, async (req, res) => {
  const sessionId = req.headers["mcp-session-id"];
  try {
    let transport;
    if (sessionId && transports.has(sessionId)) {
      transport = transports.get(sessionId);
    } else if (!sessionId && isInitializeRequest(req.body)) {
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => crypto.randomUUID(),
        onsessioninitialized: (id) => transports.set(id, transport),
      });
      transport.onclose = () => {
        if (transport.sessionId) transports.delete(transport.sessionId);
      };
      const requestedBy = String(req.headers["x-mcp-client-id"] || "authenticated-mcp-client").slice(0, 120);
      await buildServer(requestedBy).connect(transport);
    } else {
      return res.status(400).json({ jsonrpc: "2.0", error: { code: -32000, message: "Invalid or missing MCP session" }, id: null });
    }
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("MCP POST error", error);
    if (!res.headersSent) res.status(500).json({ jsonrpc: "2.0", error: { code: -32603, message: "Internal server error" }, id: null });
  }
});

app.get("/mcp", requireGatewayKey, async (req, res) => {
  const sessionId = req.headers["mcp-session-id"];
  const transport = sessionId ? transports.get(sessionId) : null;
  if (!transport) return res.status(400).send("Invalid or missing MCP session ID");
  await transport.handleRequest(req, res);
});

app.delete("/mcp", requireGatewayKey, async (req, res) => {
  const sessionId = req.headers["mcp-session-id"];
  const transport = sessionId ? transports.get(sessionId) : null;
  if (!transport) return res.status(400).send("Invalid or missing MCP session ID");
  await transport.handleRequest(req, res);
});

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Kollective Email Gateway MCP listening on port ${port}`);
});

async function shutdown() {
  for (const transport of transports.values()) {
    try { await transport.close(); } catch {}
  }
  transports.clear();
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
