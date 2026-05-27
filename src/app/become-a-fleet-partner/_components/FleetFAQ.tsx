import { Section } from "@/components/Section";

const faqs = [
  {
    q: "How much do I earn?",
    a: "Your share is negotiated when you're approved — typically between 25–35% of the rider pool (the trip net after Mckot's platform commission). The exact percentage is set on your contract so there's no ambiguity.",
  },
  {
    q: "When do I get paid?",
    a: "Your share lands in your fleet wallet on every completed trip. You can withdraw to MoMo or bank any time, and weekly auto-payouts are also available.",
  },
  {
    q: "Do I need to register a company?",
    a: "No. Many of our fleet partners operate as individuals. If you do run a registered business (sole proprietorship, LLC, partnership), we'll just need your RGD number and tax ID for compliance.",
  },
  {
    q: "Do I have to provide the bikes?",
    a: "Yes — Mckot Fleet is for owners who already have, or plan to acquire, the vehicles. We don't lease bikes. If you're a rider looking to earn without buying a bike, sign up as a rider on the main Mckot app instead.",
  },
  {
    q: "What about the riders?",
    a: "You can invite your own riders or work with our pool. Either way, every rider goes through Smile ID verification, license checks, and our rider performance score so you're never operating with someone we haven't vetted.",
  },
  {
    q: "What if a rider damages a vehicle or runs off?",
    a: "Mckot does not insure your vehicles, but we keep a full audit trail of which rider had which bike when, plus their KYC and contact info. Our compliance team works with you on disputes.",
  },
  {
    q: "Can I start with just one motorcycle?",
    a: "Absolutely. Most partners start with 1–3 bikes and scale up as they learn the rhythm of their riders and zones.",
  },
];

export function FleetFAQ() {
  return (
    <Section className="bg-brand-muted/30">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-brand-accent">
          Common questions
        </p>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-brand-foreground md:text-4xl">
          Everything we get asked.
        </h2>
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-3 md:mt-14">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border border-brand-border bg-white p-5 transition open:shadow-soft md:p-6"
          >
            <summary className="flex cursor-pointer items-start justify-between gap-4 text-base font-semibold text-brand-foreground md:text-lg">
              <span>{f.q}</span>
              <span
                className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-muted text-brand-foreground/70 transition group-open:rotate-45"
                aria-hidden
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-brand-foreground/70 md:text-base">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
