import { NextResponse } from "next/server";

/**
 * Server-side proxy to the backend's public system-banner endpoint. Sitting in
 * front lets us:
 *  - keep the API host out of the browser bundle
 *  - apply a short server cache so a flash of vendors hitting the homepage
 *    doesn't hammer the backend
 *  - fail open silently — any backend error returns { success: false }
 */
export async function GET() {
  const base = process.env.VENDOR_SIGNUP_API_URL?.replace(/\/+$/, "") ||
    "https://api.mckot.com";
  const root = base.replace(/\/base\/[^/]*$/, ""); // tolerate a path-trailing url
  const url = `${root.replace(/\/+$/, "")}/base/system-banner/?platform=website`;

  try {
    const res = await fetch(url, {
      method: "GET",
      // Tight server-side cache: a banner toggled in admin propagates within
      // ~60s. Adjust if you need faster.
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return NextResponse.json({ success: false, info: null });
    }
    const body = await res.json();
    return NextResponse.json(body);
  } catch {
    return NextResponse.json({ success: false, info: null });
  }
}
