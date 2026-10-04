import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { formatParcelNumber, isParcelNumber, normalizeTrackingInput } from "@/lib/tracking";
import { fetchTracking } from "@/lib/trackingServer";
import { TrackForm } from "../TrackForm";
import { TrackDetails, TrackNotFound } from "./TrackDetails";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ token: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const t = normalizeTrackingInput(decodeURIComponent(token));
  return {
    title: t && isParcelNumber(t) ? `Track ${formatParcelNumber(t)}` : "Track your delivery",
    // Tracking pages are personal; keep them out of search results.
    robots: { index: false, follow: false },
  };
}

export default async function TrackTokenPage({ params }: Props) {
  const { token: raw } = await params;
  const token = normalizeTrackingInput(decodeURIComponent(raw));
  if (!token) notFound();
  // One canonical spelling (e.g. mck109315039 → MCK109315039).
  if (token !== raw) redirect(`/track/${token}`);

  const result = await fetchTracking(token);
  if (!result.ok) {
    return (
      <>
        <TrackNotFound token={token} message={result.message} notFound={result.notFound} />
        <div className="mx-auto -mt-6 max-w-xl px-4 pb-16 sm:px-6">
          <TrackForm compact />
        </div>
      </>
    );
  }
  return <TrackDetails token={token} initial={result.info} />;
}
