"use client";

// Client-side helper for authenticated calls through the /edge-api proxy.
// The proxy injects the bearer token server-side, so nothing here touches it.

export type ApiResult<T = unknown> = {
  success: boolean;
  info: T;
};

export class SessionExpiredError extends Error {
  constructor() {
    super("Session expired");
    this.name = "SessionExpiredError";
  }
}

function isSessionExpired(info: unknown): boolean {
  return typeof info === "string" && (info.includes("L101") || info.includes("L102"));
}

export async function apiPost<T = unknown>(path: string, body?: unknown): Promise<ApiResult<T>> {
  const res = await fetch(`/edge-api/${path.replace(/^\/+/, "")}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });

  let data: ApiResult<T>;
  try {
    data = (await res.json()) as ApiResult<T>;
  } catch {
    return { success: false, info: "Network error" as T };
  }

  if (res.status === 401 || isSessionExpired(data.info)) {
    throw new SessionExpiredError();
  }
  return data;
}
