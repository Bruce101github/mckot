import "server-only";
import { Resend } from "resend";
import { getEmailEnv } from "./env";

let client: Resend | null = null;

export function getResend(): Resend {
  if (client) return client;
  const env = getEmailEnv();
  client = new Resend(env.apiKey);
  return client;
}
