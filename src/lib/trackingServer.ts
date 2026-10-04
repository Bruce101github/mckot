import "server-only";

import { API_BASE } from "@/lib/auth/config";
import type { TrackInfo, TrackResult } from "@/lib/tracking";

/** Server-side fetch of the public tracking view. Never cached: the
 * status and the rider's location change by the minute. */
export async function fetchTracking(token: string): Promise<TrackResult> {
  try {
    const res = await fetch(`${API_BASE}/transport/track/${encodeURIComponent(token)}/`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    const data = (await res.json()) as { success: boolean; info: unknown };
    if (data.success) return { ok: true, info: data.info as TrackInfo };
    return {
      ok: false,
      notFound: res.status === 404,
      message: typeof data.info === "string" ? data.info : "Something went wrong.",
    };
  } catch {
    return { ok: false, notFound: false, message: "We couldn't reach the tracking service." };
  }
}
