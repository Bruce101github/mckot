import "server-only";

const REQUIRED = ["RESEND_API_KEY", "RESEND_FROM_EMAIL", "RESEND_FROM_NAME", "RESEND_REPLY_TO"] as const;

type RequiredKey = (typeof REQUIRED)[number];

type EmailEnv = {
  apiKey: string;
  fromEmail: string;
  fromName: string;
  replyTo: string;
  internalRecipient: string;
};

let cached: EmailEnv | null = null;

export function getEmailEnv(): EmailEnv {
  if (cached) return cached;

  const missing: RequiredKey[] = REQUIRED.filter((k) => !process.env[k]);
  if (missing.length) {
    const msg = `Missing required Resend env vars: ${missing.join(", ")}`;
    if (process.env.NODE_ENV === "production") throw new Error(msg);
    console.warn(`[email] ${msg}. Sends will fail until set.`);
  }

  cached = {
    apiKey: process.env.RESEND_API_KEY ?? "",
    fromEmail: process.env.RESEND_FROM_EMAIL ?? "",
    fromName: process.env.RESEND_FROM_NAME ?? "Mckot",
    replyTo: process.env.RESEND_REPLY_TO ?? "",
    internalRecipient: process.env.INTERNAL_NOTIFICATION_EMAIL ?? "hello@mckot.com",
  };

  return cached;
}

export function formatFromHeader(env: EmailEnv = getEmailEnv()): string {
  return `${env.fromName} <${env.fromEmail}>`;
}
