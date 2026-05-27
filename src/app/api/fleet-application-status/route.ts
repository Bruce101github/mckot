/**
 * POST /api/fleet-application-status
 *
 * Returns the public-facing application status for an
 * ``{ application_code, owner_phone }`` pair. Backend rejects on
 * mismatch with a generic error to avoid leaking whether a code
 * exists with a different phone.
 */

import { NextResponse } from "next/server";

const DEFAULT_URL = "https://api.mckot.com/fleet/application_status/";

export async function POST(req: Request) {
  let payload: { application_code?: string; owner_phone?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, info: "Invalid JSON" },
      { status: 400 },
    );
  }

  if (!payload.application_code || !payload.owner_phone) {
    return NextResponse.json(
      { success: false, info: "Both application code and phone are required." },
      { status: 400 },
    );
  }

  const upstream =
    process.env.FLEET_STATUS_API_URL?.replace(/\/$/, "") ??
    DEFAULT_URL.replace(/\/$/, "");

  try {
    const r = await fetch(upstream, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "application_status", ...payload }),
      cache: "no-store",
    });
    const data = await r.json().catch(() => ({
      success: false,
      info: "Status service is unreachable.",
    }));
    return NextResponse.json(data, { status: r.ok ? 200 : r.status });
  } catch (e) {
    console.error("[fleet-application-status] upstream error", e);
    return NextResponse.json(
      { success: false, info: "Status service is unreachable." },
      { status: 502 },
    );
  }
}
