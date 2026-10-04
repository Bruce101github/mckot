import { normalizeTrackingInput } from "@/lib/tracking";
import { fetchTracking } from "@/lib/trackingServer";

// Same-origin read of the public tracking view, so the tracking page
// can refresh in the browser without a cross-origin call to the API.

export const dynamic = "force-dynamic";

export async function GET(_req: Request, ctx: { params: Promise<{ token: string }> }) {
  const { token: raw } = await ctx.params;
  const token = normalizeTrackingInput(decodeURIComponent(raw));
  if (!token) {
    return Response.json({ ok: false, notFound: true, message: "Invalid tracking number" }, { status: 404 });
  }
  const result = await fetchTracking(token);
  return Response.json(result, {
    status: result.ok ? 200 : result.notFound ? 404 : 502,
    headers: { "Cache-Control": "no-store" },
  });
}
