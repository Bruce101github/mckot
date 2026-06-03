"use server";

import { cookies } from "next/headers";
import { API_BASE, SESSION_COOKIE, SITE_USER_TYPE, sessionCookieOptions } from "./config";
import type { AuthResult, Country, MckotUser, OtpRequestResult } from "./types";

type Envelope<T = unknown> = { success: boolean; info: T };

async function backendPost<T = unknown>(
  path: string,
  body: unknown,
  token?: string,
): Promise<Envelope<T>> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}/${path.replace(/^\/+/, "")}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body ?? {}),
    cache: "no-store",
  });

  try {
    return (await res.json()) as Envelope<T>;
  } catch {
    return { success: false, info: "Network error" as T };
  }
}

export async function getCountries(): Promise<Country[]> {
  const res = await backendPost<Country[]>("base/countries/", {});
  return Array.isArray(res.info) ? res.info : [];
}

export async function requestOtp(phone: string): Promise<OtpRequestResult> {
  const res = await backendPost<string>("security/verify_phone/", { type: "request", phone });
  return res.success
    ? { success: true }
    : { success: false, error: typeof res.info === "string" ? res.info : "Could not send code" };
}

export async function verifyOtp(params: {
  phone: string;
  otp: string;
  countryId: number;
  device: string;
  oauthSessionToken?: string;
}): Promise<AuthResult> {
  const res = await backendPost<{ token: string; user: MckotUser }>("security/verify_phone/", {
    type: "verify",
    phone: params.phone,
    otp: params.otp,
    country_id: params.countryId,
    user_type: SITE_USER_TYPE,
    device: params.device,
    ...(params.oauthSessionToken ? { oauth_session_token: params.oauthSessionToken } : {}),
  });

  if (!res.success || !res.info?.token) {
    return { success: false, error: typeof res.info === "string" ? res.info : "Invalid code" };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, res.info.token, sessionCookieOptions());
  return { success: true, user: res.info.user };
}

export type OauthOutcome =
  | { success: true; user: MckotUser }
  | { success: true; needsPhone: true; oauthSessionToken: string; firstName?: string; lastName?: string }
  | { success: false; error: string };

export async function oauthLogin(params: {
  provider: "google" | "apple";
  idToken: string;
  device: string;
  firstName?: string;
  lastName?: string;
}): Promise<OauthOutcome> {
  const res = await backendPost<
    | { token: string; user: MckotUser }
    | { needs_phone: true; oauth_session_token: string; first_name?: string; last_name?: string }
  >("security/oauth_login/", {
    provider: params.provider,
    id_token: params.idToken,
    user_type: SITE_USER_TYPE,
    device: params.device,
    ...(params.firstName ? { first_name: params.firstName } : {}),
    ...(params.lastName ? { last_name: params.lastName } : {}),
  });

  if (!res.success) {
    return { success: false, error: typeof res.info === "string" ? res.info : "Sign-in failed" };
  }

  const info = res.info as Record<string, unknown>;
  if (info?.needs_phone) {
    return {
      success: true,
      needsPhone: true,
      oauthSessionToken: String(info.oauth_session_token),
      firstName: info.first_name as string | undefined,
      lastName: info.last_name as string | undefined,
    };
  }

  const token = info?.token as string | undefined;
  if (!token) return { success: false, error: "Sign-in failed" };

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, sessionCookieOptions());
  return { success: true, user: info.user as MckotUser };
}

export async function getSession(): Promise<MckotUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const res = await backendPost<MckotUser>("user/first_paint/", {}, token);
  return res.success && res.info ? res.info : null;
}

export async function logout(device: string): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await backendPost("security/logout/", { device }, token).catch(() => undefined);
  }
  cookieStore.delete(SESSION_COOKIE);
}
