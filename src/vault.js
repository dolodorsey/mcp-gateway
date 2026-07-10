import crypto from "node:crypto";

const AAD = Buffer.from("khg-email-token-v1", "utf8");

function key() {
  const source = process.env.EMAIL_TOKEN_ENCRYPTION_KEY;
  if (!source) throw new Error("EMAIL_TOKEN_ENCRYPTION_KEY is not configured");
  return crypto.createHash("sha256").update(source, "utf8").digest();
}

export function encryptSecret(value) {
  if (!value) return null;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key(), iv);
  cipher.setAAD(AAD);
  const ciphertext = Buffer.concat([cipher.update(String(value), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return ["v1", iv.toString("base64url"), tag.toString("base64url"), ciphertext.toString("base64url")].join(".");
}

export function decryptSecret(payload) {
  if (!payload) return null;
  const [version, iv, tag, ciphertext] = String(payload).split(".");
  if (version !== "v1" || !iv || !tag || !ciphertext) throw new Error("Unsupported encrypted credential format");
  const decipher = crypto.createDecipheriv("aes-256-gcm", key(), Buffer.from(iv, "base64url"));
  decipher.setAAD(AAD);
  decipher.setAuthTag(Buffer.from(tag, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(ciphertext, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}
