/**
 * POST /api/fleet-application
 *
 * Thin proxy to Django ``/fleet/apply/``. The backend handles
 * validation, dedupe, and the application-code mint — we just
 * forward the JSON payload and surface the canonical response.
 *
 * Config:
 *   FLEET_API_URL  Full URL to the backend. Defaults to
 *                  https://api.mckot.com/fleet/apply/. Set to your
 *                  local Django host when running dev (e.g.
 *                  http://localhost:8000/fleet/apply/).
 */

import { NextResponse } from "next/server";

const DEFAULT_URL = "https://api.mckot.com/fleet/apply/";

export async function POST(req: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, info: "Invalid JSON" },
      { status: 400 },
    );
  }

  const upstream =
    process.env.FLEET_API_URL?.replace(/\/$/, "") ?? DEFAULT_URL.replace(/\/$/, "");

  try {
    const r = await fetch(upstream, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "apply", ...payload }),
      cache: "no-store",
    });
    const text = await r.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("[fleet-application] non-JSON upstream", r.status, text.slice(0, 400));
      return NextResponse.json(
        { success: false, info: "Application service is unreachable. Try again shortly." },
        { status: 502 },
      );
    }
    return NextResponse.json(data, { status: r.ok ? 200 : r.status });
  } catch (e) {
    console.error("[fleet-application] upstream error", e);
    return NextResponse.json(
      { success: false, info: "Application service is unreachable. Try again shortly." },
      { status: 502 },
    );
  }
}
