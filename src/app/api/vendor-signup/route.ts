import { NextResponse } from "next/server";

export type VendorSignupPayload = {
  contactName?: string;
  businessName?: string;
  phone?: string;
  socialHandle?: string;
  monthlyDeliveries?: string;
  serviceZone?: string;
};

export async function POST(req: Request) {
  let payload: VendorSignupPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const required = ["contactName", "businessName", "phone", "monthlyDeliveries", "serviceZone"];
  for (const key of required) {
    if (!payload[key as keyof VendorSignupPayload]) {
      return NextResponse.json({ ok: false, error: `Missing ${key}` }, { status: 400 });
    }
  }

  const upstream = process.env.VENDOR_SIGNUP_API_URL;
  if (upstream) {
    try {
      const r = await fetch(upstream, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.VENDOR_SIGNUP_API_KEY
            ? { Authorization: `Bearer ${process.env.VENDOR_SIGNUP_API_KEY}` }
            : {}),
        },
        body: JSON.stringify(payload),
      });
      if (!r.ok) {
        const t = await r.text();
        console.error("Vendor signup upstream error", r.status, t);
        return NextResponse.json({ ok: false, error: "Upstream rejected signup" }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ ok: false, error: "Upstream unreachable" }, { status: 502 });
    }
  }

  console.info("[vendor-signup]", JSON.stringify(payload));
  return NextResponse.json({ ok: true, mode: "logged" });
}
