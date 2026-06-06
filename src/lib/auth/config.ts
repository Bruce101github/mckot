// Shared server-side auth/proxy configuration.
// API_PROXY_TARGET lets us point at staging; defaults to production.
export const API_BASE = (process.env.API_PROXY_TARGET ?? "https://api.mckot.com").replace(/\/$/, "");

// httpOnly session cookie, token never reaches client JS.
export const SESSION_COOKIE = "mckot_site_token";

// Customer site always authenticates as a requester.
export const SITE_USER_TYPE = "requester";

export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}
