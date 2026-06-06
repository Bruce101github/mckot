import { Section } from "@/components/Section";

const steps = [
  {
    num: "01",
    title: "Apply online",
    body: "Tell us about you, your business, and how many vehicles you'd like to operate. Upload your Ghana Card and business documents, 10 minutes, all online.",
  },
  {
    num: "02",
    title: "We review",
    body: "Our partnerships team verifies your identity and documents. Within two business days, you'll hear back with an approval, or a quick note on what to fix.",
  },
  {
    num: "03",
    title: "Set up your fleet",
    body: "Once approved, you get a Mckot Fleet account: dashboard on web, app on your phone. Add your vehicles, invite riders, and sign the partner agreement.",
  },
  {
    num: "04",
    title: "Riders go online",
    body: "Riders linked to your fleet start accepting trips. You see every delivery in real time, locations, earnings, ratings, fuel reports.",
  },
  {
    num: "05",
    title: "You get paid",
    body: "Your share of every trip lands in your fleet wallet instantly. Withdraw to mobile money or bank any time. Weekly auto-payouts available.",
  },
];

export function HowItWorks() {
  return (
    <Section className="bg-brand-muted/30">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-brand-accent">
          How it works
        </p>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-brand-foreground md:text-4xl">
          From application to first payout in days.
        </h2>
      </div>

      <ol className="relative mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li
            key={s.num}
            className={
              "relative rounded-2xl border border-brand-border bg-white p-6 transition hover:border-brand-accent/40 hover:shadow-soft md:p-7 " +
              (i === steps.length - 1 ? "lg:col-span-3 lg:max-w-2xl lg:mx-auto" : "")
            }
          >
            <span className="text-sm font-bold tracking-wider text-brand-accent">
              {s.num}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-brand-foreground md:text-xl">
              {s.title}
            </h3>
            <p className="mt-2 text-sm text-brand-foreground/65 md:text-base">
              {s.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
