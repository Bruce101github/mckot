import { Section } from "@/components/Section";
import { Banknote, Eye, LineChart, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Banknote,
    title: "Real share, every trip",
    body: "Every completed delivery splits into the rider's share and your fleet share, both deposited automatically. No silent skim, no surprise fees.",
  },
  {
    icon: Eye,
    title: "Full transparency",
    body: "See every trip your bikes complete, who drove, how much it earned, and what was settled. Live ledger you can audit any minute.",
  },
  {
    icon: ShieldCheck,
    title: "Riders we vetted",
    body: "Smile ID verification, license checks, ride history, and rider performance scores. You bring the bike; we bring the trust.",
  },
  {
    icon: LineChart,
    title: "Scale on your terms",
    body: "Start with one motorcycle. Grow to a fleet. Pause vehicles, swap riders, or run multiple routes, your dashboard moves at your pace.",
  },
];

export function WhyBecomePartner() {
  return (
    <Section className="bg-white">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-brand-accent">
          Why Mckot Fleet
        </p>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-brand-foreground md:text-4xl">
          A real business, not a side hustle.
        </h2>
        <p className="mt-4 text-balance text-brand-foreground/65 md:text-lg">
          Mckot Fleet is for owners who want to put motorcycles to work
          without managing dispatch, billing, or daily rider drama.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
        {pillars.map(({ icon: Icon, title, body }) => (
          <article
            key={title}
            className="group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-surface/70 p-6 transition hover:border-brand-accent/40 hover:shadow-soft md:p-8"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-accent/15 text-brand-foreground">
              <Icon className="h-6 w-6" aria-hidden />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-brand-foreground md:text-xl">
              {title}
            </h3>
            <p className="mt-2 text-sm text-brand-foreground/70 md:text-base">
              {body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
