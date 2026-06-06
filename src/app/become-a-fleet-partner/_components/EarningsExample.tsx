"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/Section";
import { Calculator, Info } from "lucide-react";

const PLATFORM_COMMISSION_PCT = 20; // illustrative; real value per ride type
const DEFAULT_TRIPS_PER_DAY_PER_BIKE = 12;
const DEFAULT_AVG_FARE = 18;

/**
 * Light interactive earnings example. Numbers are illustrative,
 * the real per-trip math depends on ride type, surge, distance,
 * and the negotiated split with the partner. We label the panel
 * clearly so applicants don't take it as a contract.
 */
export function EarningsExample() {
  const [bikes, setBikes] = useState(3);
  const [tripsPerDay, setTripsPerDay] = useState(DEFAULT_TRIPS_PER_DAY_PER_BIKE);
  const [avgFare, setAvgFare] = useState(DEFAULT_AVG_FARE);
  const [fleetShare, setFleetShare] = useState(30);

  const summary = useMemo(() => {
    const grossPerWeek = bikes * tripsPerDay * avgFare * 6;
    const platformCut = grossPerWeek * (PLATFORM_COMMISSION_PCT / 100);
    const riderPool = grossPerWeek - platformCut;
    const fleetShareGhs = riderPool * (fleetShare / 100);
    const riderShareGhs = riderPool - fleetShareGhs;
    return {
      gross: grossPerWeek,
      fleet: fleetShareGhs,
      rider: riderShareGhs,
      platform: platformCut,
      perBike: fleetShareGhs / Math.max(1, bikes),
    };
  }, [bikes, tripsPerDay, avgFare, fleetShare]);

  return (
    <Section className="bg-white">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-brand-accent">
          Run the numbers
        </p>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-brand-foreground md:text-4xl">
          See what your fleet could earn.
        </h2>
        <p className="mt-4 text-balance text-brand-foreground/65 md:text-lg">
          Drag the sliders to model a typical week. Final split is
          negotiated with our partnerships team when you&rsquo;re approved.
        </p>
      </div>

      <div className="mt-12 grid gap-8 rounded-3xl border border-brand-border bg-brand-surface/70 p-6 md:mt-16 md:grid-cols-[1.1fr_1fr] md:p-10">
        <div className="space-y-6">
          <Slider
            label="Motorcycles in your fleet"
            value={bikes}
            min={1}
            max={20}
            onChange={setBikes}
            suffix={bikes === 1 ? "bike" : "bikes"}
          />
          <Slider
            label="Trips per bike per day"
            value={tripsPerDay}
            min={4}
            max={30}
            onChange={setTripsPerDay}
            suffix="trips"
          />
          <Slider
            label="Average fare per trip"
            value={avgFare}
            min={8}
            max={60}
            onChange={setAvgFare}
            prefix="GHS"
          />
          <Slider
            label="Your fleet's share of the rider pool"
            value={fleetShare}
            min={10}
            max={60}
            onChange={setFleetShare}
            suffix="%"
            help="Negotiated at approval. 30% is typical when the fleet provides the bike."
          />
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-white p-6 md:p-8">
          <div className="flex items-center gap-2 text-sm font-medium text-brand-accent">
            <Calculator className="h-4 w-4" aria-hidden />
            Weekly snapshot
          </div>
          <p className="mt-3 text-4xl font-bold tracking-tight text-brand-foreground md:text-5xl">
            GHS {format(summary.fleet)}
          </p>
          <p className="mt-1 text-sm text-brand-foreground/65">
            Estimated weekly fleet earnings
          </p>

          <dl className="mt-6 space-y-2 text-sm">
            <Row label="Gross fares" value={`GHS ${format(summary.gross)}`} />
            <Row
              label={`Mckot commission (~${PLATFORM_COMMISSION_PCT}%)`}
              value={`-GHS ${format(summary.platform)}`}
              muted
            />
            <Row label="Rider pool" value={`GHS ${format(summary.gross - summary.platform)}`} muted />
            <hr className="border-brand-border/60" />
            <Row
              label={`Riders' share (${100 - fleetShare}%)`}
              value={`GHS ${format(summary.rider)}`}
              muted
            />
            <Row
              label={`Your share (${fleetShare}%)`}
              value={`GHS ${format(summary.fleet)}`}
              emphasis
            />
            <Row
              label="Per bike"
              value={`GHS ${format(summary.perBike)} / week`}
              muted
            />
          </dl>

          <div className="mt-6 flex items-start gap-2 rounded-xl bg-brand-muted/50 p-3 text-xs text-brand-foreground/65">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
            <p>
              Illustrative only. Actual earnings vary by ride type, hours
              online, surge, and the negotiated split. Mckot does not
              guarantee minimum income.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  onChange,
  prefix,
  suffix,
  help,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
  help?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-brand-foreground">
          {label}
        </label>
        <span className="text-base font-semibold text-brand-foreground">
          {prefix ? `${prefix} ` : ""}
          {value}
          {suffix ? ` ${suffix}` : ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-brand-accent"
        aria-label={label}
      />
      {help && (
        <p className="mt-1 text-xs text-brand-foreground/55">{help}</p>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  muted,
  emphasis,
}: {
  label: string;
  value: string;
  muted?: boolean;
  emphasis?: boolean;
}) {
  return (
    <div
      className={
        "flex items-center justify-between " +
        (emphasis
          ? "rounded-lg bg-brand-accent/15 px-3 py-2 text-base font-semibold text-brand-foreground"
          : muted
            ? "text-brand-foreground/65"
            : "text-brand-foreground")
      }
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function format(n: number) {
  return n.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
