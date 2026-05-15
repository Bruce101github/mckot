import { NextResponse } from "next/server";
import { coverageZones } from "@/lib/site";
import { sendEmail, type SendEmailResult } from "@/lib/email/send";
import { getEmailEnv } from "@/lib/email/env";

function logSendResult(label: string, settled: PromiseSettledResult<SendEmailResult>) {
  if (settled.status === "rejected") {
    console.error(`[vendor-signup] ${label} email threw`, settled.reason);
    return;
  }
  if (!settled.value.ok) {
    console.error(`[vendor-signup] ${label} email failed`, settled.value.error);
  }
}

export type VendorSignupPayload = {
  contactName?: string;
  businessName?: string;
  phone?: string;
  email?: string;
  socialHandle?: string;
  dailySales?: string;
  deliveryZones?: string[];
};

const zoneLabelById: Record<string, string> = Object.fromEntries(
  coverageZones.map((z) => [z.id, z.label])
);

function resolveZoneLabels(ids: string[]): string[] {
  return ids.map((id) => zoneLabelById[id] ?? id);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatSubmittedAt(d: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Accra",
  }).format(d);
}

export async function POST(req: Request) {
  let payload: VendorSignupPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const required: (keyof VendorSignupPayload)[] = [
    "contactName",
    "businessName",
    "phone",
    "email",
    "dailySales",
    "deliveryZones",
  ];
  for (const key of required) {
    const val = payload[key];
    if (!val || (Array.isArray(val) && val.length === 0)) {
      return NextResponse.json({ ok: false, error: `Missing ${key}` }, { status: 400 });
    }
  }

  if (!isValidEmail(payload.email!)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
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
    } catch (e) {
      console.error(e);
      return NextResponse.json({ ok: false, error: "Upstream unreachable" }, { status: 502 });
    }
  } else {
    console.info("[vendor-signup]", JSON.stringify(payload));
  }

  const env = getEmailEnv();
  const zoneLabels = resolveZoneLabels(payload.deliveryZones!);
  const submittedAt = formatSubmittedAt(new Date());

  const [confirmation, internal] = await Promise.allSettled([
    sendEmail({
      template: "vendor-signup-confirmation",
      to: payload.email!,
      data: {
        firstName: payload.contactName!,
        businessName: payload.businessName!,
      },
      tags: [{ name: "audience", value: "vendor" }],
    }),
    sendEmail({
      template: "vendor-signup-internal",
      to: env.internalRecipient,
      replyTo: payload.email!,
      data: {
        contactName: payload.contactName!,
        businessName: payload.businessName!,
        phone: payload.phone!,
        socialHandle: payload.socialHandle,
        dailySales: payload.dailySales!,
        deliveryZones: zoneLabels,
        submittedAt,
      },
      tags: [{ name: "audience", value: "internal" }],
    }),
  ]);

  logSendResult("confirmation", confirmation);
  logSendResult("internal", internal);

  return NextResponse.json({ ok: true, mode: upstream ? "forwarded" : "logged" });
}
