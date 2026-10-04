import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PackageSearch } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { normalizeTrackingInput } from "@/lib/tracking";
import { TrackForm } from "./TrackForm";

export const metadata: Metadata = {
  title: "Track a delivery",
  description: "Track your Mckot delivery with the tracking number on your parcel label or SMS.",
  alternates: { canonical: `${siteConfig.url}/track` },
};

export default async function TrackPage({ searchParams }: { searchParams: Promise<{ n?: string }> }) {
  const { n } = await searchParams;
  const token = n ? normalizeTrackingInput(n) : null;
  if (token) redirect(`/track/${token}`);

  return (
    <div className="mx-auto max-w-xl px-4 py-14 sm:px-6 md:py-20">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-muted text-brand-dark">
        <PackageSearch className="h-6 w-6" aria-hidden />
      </div>
      <h1 className="mt-5 text-3xl font-bold text-brand-foreground md:text-4xl">Track a delivery</h1>
      <p className="mt-3 text-brand-foreground/70">
        Enter the tracking number from the parcel label or the SMS you received.
      </p>
      <div className="mt-8">
        <TrackForm initial={n ?? ""} />
      </div>
    </div>
  );
}
