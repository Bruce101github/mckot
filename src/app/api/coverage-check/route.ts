import { NextResponse } from "next/server";
import { coverageZones } from "@/lib/site";

type Body = {
  address?: string;
  postalCode?: string;
  zoneId?: string;
};

/** Heuristic checker: combines selected zone keywords with optional Ghana digital address prefix GA-. */
export async function POST(req: Request) {
  let body: Body = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ inCoverage: false, detail: "Invalid JSON body." }, { status: 400 });
  }

  const addr = (body.address || "").toLowerCase();
  const postal = (body.postalCode || "").trim().toUpperCase();
  const zoneId = body.zoneId;

  const waitlistIds = new Set(
    coverageZones.filter((z) => !z.inCoverage).map((z) => z.id),
  );

  if (zoneId && waitlistIds.has(zoneId)) {
    return NextResponse.json({
      inCoverage: false,
      detail:
        "That zone is on our expansion roadmap. Join the waitlist on the Coverage page and we will ping you first.",
    });
  }

  if (zoneId) {
    const z = coverageZones.find((x) => x.id === zoneId);
    if (z?.inCoverage) {
      return NextResponse.json({
        inCoverage: true,
        detail:
          "Based on your selected zone, you are inside our active Greater Accra delivery footprint. A rider lead will confirm exact pickup windows.",
      });
    }
  }

  const outsideHints = ["kumasi", "takoradi", "tamale", "sunyani", "cape coast"];
  if (outsideHints.some((h) => addr.includes(h))) {
    return NextResponse.json({
      inCoverage: false,
      detail:
        "We hear you. Those cities are on our roadmap after we nail Accra ops. Leave your details and we will onboard you when we launch.",
    });
  }

  if (postal.startsWith("GA-") || addr.length > 4) {
    return NextResponse.json({
      inCoverage: true,
      detail:
        "Looks like you are in range for Greater Accra last-mile. Final confirmation happens on WhatsApp with a coordinator.",
    });
  }

  return NextResponse.json({
    inCoverage: false,
    detail:
      "Add a landmark or Ghana Post digital address so we can slot you accurately. Still unsure? Tap WhatsApp and send a pin.",
  });
}
