"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

/**
 * Dark hero, sets the tone for the entire fleet page. Uses the
 * brand-dark family (matches main site Hero) but with an emphasis
 * on the *investor* framing: not "earn extra cash" but "build a
 * fleet". Numbers in the trust strip are illustrative defaults;
 * tighten them with operations data before launch.
 */
export function FleetHero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-dark text-brand-dark-foreground">
      <div className="absolute inset-0 bg-hero-gradient opacity-90" aria-hidden />
      <div
        className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-brand-accent/15 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -left-20 h-[380px] w-[380px] rounded-full bg-brand-accent/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6 md:pb-32 md:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-accent/40 bg-brand-accent/10 px-3 py-1 text-xs font-medium text-brand-accent">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              Mckot Fleet · Partner programme
            </div>

            <h1 className="mt-6 text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Own the wheels.{" "}
              <span className="text-brand-accent">We run the business.</span>
            </h1>

            <p className="mt-6 max-w-xl text-balance text-lg text-brand-dark-foreground/75 md:text-xl">
              Put your motorcycles on Mckot. We dispatch the trips, vet the riders,
              and pay you a share of every delivery, automatically, every week.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="#apply"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-accent px-6 py-4 text-base font-semibold text-brand-dark shadow-glow transition hover:bg-brand-accent-hover"
              >
                Apply to become a partner
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link
                href="/become-a-fleet-partner/status"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-dark-border bg-brand-dark-surface/50 px-6 py-4 text-base font-medium text-brand-dark-foreground transition hover:border-brand-accent/40"
              >
                Check application status
              </Link>
            </div>

            <p className="mt-4 text-sm text-brand-dark-foreground/55">
              Free to apply. Decisions in two business days.
            </p>
          </div>

          <FleetHeroSnapshot />
        </div>

        <TrustStrip />
      </div>
    </section>
  );
}

function FleetHeroSnapshot() {
  return (
    <div className="relative">
      <div className="rounded-3xl border border-brand-dark-border bg-brand-dark-surface/80 p-6 shadow-glow backdrop-blur md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-brand-dark-foreground/55">
              Your fleet · This week
            </p>
            <p className="mt-1 text-2xl font-semibold text-brand-dark-foreground">
              GHS 4,820.00
            </p>
            <p className="text-xs text-brand-accent">+12% vs. last week</p>
          </div>
          <span className="rounded-full bg-brand-accent/15 px-3 py-1 text-xs font-medium text-brand-accent">
            Settled Friday
          </span>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <SnapshotStat label="Trips" value="312" />
          <SnapshotStat label="Riders" value="4" />
          <SnapshotStat label="Vehicles" value="5" />
        </div>

        <div className="mt-6 space-y-3">
          {[
            { rider: "Kofi A.", net: "1,245.00", trips: 84 },
            { rider: "Esi K.", net: "1,108.50", trips: 71 },
            { rider: "Yaw M.", net: "972.25", trips: 63 },
          ].map((r) => (
            <div
              key={r.rider}
              className="flex items-center justify-between rounded-xl bg-brand-dark/60 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-accent/15 text-sm font-semibold text-brand-accent">
                  {r.rider[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-dark-foreground">
                    {r.rider}
                  </p>
                  <p className="text-xs text-brand-dark-foreground/55">
                    {r.trips} trips · 4.9 ★
                  </p>
                </div>
              </div>
              <p className="text-sm font-semibold text-brand-dark-foreground">
                GHS {r.net}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-brand-dark-foreground/45">
          Sample partner dashboard. Real numbers depend on rider activity.
        </p>
      </div>
    </div>
  );
}

function SnapshotStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-brand-dark-border bg-brand-dark/40 px-2 py-3">
      <p className="text-xl font-semibold text-brand-dark-foreground">{value}</p>
      <p className="text-xs text-brand-dark-foreground/55">{label}</p>
    </div>
  );
}

function TrustStrip() {
  const items = [
    { value: "2 days", label: "Average review turnaround" },
    { value: "Weekly", label: "Automatic payouts" },
    { value: "GH-only", label: "Locally operated" },
    { value: "0 GHS", label: "Setup cost" },
  ];
  return (
    <div className="mt-16 grid grid-cols-2 gap-3 border-t border-brand-dark-border/60 pt-10 md:grid-cols-4">
      {items.map((i) => (
        <div key={i.label}>
          <p className="text-2xl font-semibold text-brand-dark-foreground">
            {i.value}
          </p>
          <p className="mt-1 text-xs text-brand-dark-foreground/55 md:text-sm">
            {i.label}
          </p>
        </div>
      ))}
    </div>
  );
}
