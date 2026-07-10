import crypto from "node:crypto";

function cleanHeader(value) {
  return String(value || "").replace(/[\r\n]+/g, " ").trim();
}

function addressList(value) {
  const values = Array.isArray(value) ? value : [value];
  return values.filter(Boolean).map(cleanHeader);
}

function encodedSubject(subject) {
  return `=?UTF-8?B?${Buffer.from(cleanHeader(subject), "utf8").toString("base64")}?=`;
}

export function buildRawEmail({ from, to, cc = [], bcc = [], subject, text, html, inReplyTo, references }) {
  const recipients = addressList(to);
  if (!recipients.length) throw new Error("At least one recipient is required");
  if (!subject) throw new Error("subject is required");

  const lines = [
    `From: ${cleanHeader(from)}`,
    `To: ${recipients.join(", ")}`,
    ...(addressList(cc).length ? [`Cc: ${addressList(cc).join(", ")}`] : []),
    ...(addressList(bcc).length ? [`Bcc: ${addressList(bcc).join(", ")}`] : []),
    `Subject: ${encodedSubject(subject)}`,
    "MIME-Version: 1.0",
  ];
  if (inReplyTo) lines.push(`In-Reply-To: ${cleanHeader(inReplyTo)}`);
  if (references) lines.push(`References: ${cleanHeader(references)}`);

  if (html && text) {
    const boundary = `khg_${crypto.randomBytes(12).toString("hex")}`;
    lines.push(
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      "",
      `--${boundary}`,
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: 8bit",
      "",
      String(text),
      `--${boundary}`,
      "Content-Type: text/html; charset=UTF-8",
      "Content-Transfer-Encoding: 8bit",
      "",
      String(html),
      `--${boundary}--`
    );
  } else if (html) {
    lines.push("Content-Type: text/html; charset=UTF-8", "Content-Transfer-Encoding: 8bit", "", String(html));
  } else {
    lines.push("Content-Type: text/plain; charset=UTF-8", "Content-Transfer-Encoding: 8bit", "", String(text || ""));
  }

  return Buffer.from(lines.join("\r\n"), "utf8").toString("base64url");
}

export function decodeBody(data) {
  if (!data) return "";
  try {
    return Buffer.from(String(data), "base64url").toString("utf8");
  } catch {
    return "";
  }
}

export function normalizeGmailMessage(message) {
  const headers = Object.fromEntries((message?.payload?.headers || []).map((header) => [String(header.name || "").toLowerCase(), header.value]));
  let text = "";
  let html = "";

  const walk = (part) => {
    if (!part) return;
    const body = decodeBody(part.body?.data);
    if (part.mimeType === "text/plain" && body && !text) text = body;
    if (part.mimeType === "text/html" && body && !html) html = body;
    for (const child of part.parts || []) walk(child);
  };
  walk(message?.payload);

  return {
    id: message?.id,
    thread_id: message?.threadId,
    label_ids: message?.labelIds || [],
    snippet: message?.snippet || "",
    history_id: message?.historyId,
    internal_date: message?.internalDate,
    headers: {
      from: headers.from || "",
      to: headers.to || "",
      cc: headers.cc || "",
      subject: headers.subject || "",
      date: headers.date || "",
      message_id: headers["message-id"] || "",
      in_reply_to: headers["in-reply-to"] || "",
      references: headers.references || "",
    },
    text,
    html,
    attachments: collectAttachments(message?.payload),
  };
}

function collectAttachments(payload) {
  const items = [];
  const walk = (part) => {
    if (!part) return;
    if (part.filename && part.body?.attachmentId) {
      items.push({
        filename: part.filename,
        mime_type: part.mimeType,
        size: part.body.size || 0,
        attachment_id: part.body.attachmentId,
      });
    }
    for (const child of part.parts || []) walk(child);
  };
  walk(payload);
  return items;
}
