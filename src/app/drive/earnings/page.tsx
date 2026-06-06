import type { Metadata } from "next";
import { Eye, Clock3, HeartHandshake, Receipt, Info, Smartphone } from "lucide-react";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/Button";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { siteConfig } from "@/lib/site";

const LAST_UPDATED = "2026-06-06";

// Illustrative only, used to explain HOW pay is calculated, not a promise of
// income. Mirrors the commission rate shown on the fleet partner page.
const EXAMPLE_FARE = 30;
const EXAMPLE_COMMISSION_PCT = 20;
const EXAMPLE_TIP = 5;

export const metadata: Metadata = {
  title: "How Mckot Driver Earnings & Payouts Work in Ghana",
  description:
    "How much do Mckot drivers make? See how driver pay works in Ghana: upfront pay before you accept, transparent commission, 100% of tips, and same-day payouts to mobile money.",
  keywords: [
    "Mckot driver earnings",
    "how much do drivers make in Ghana",
    "driver salary Accra",
    "ride hailing driver income Ghana",
    "driver commission Ghana",
    "same day driver payout Ghana",
  ],
  alternates: { canonical: `${siteConfig.url}/drive/earnings` },
  openGraph: {
    title: "How Mckot driver earnings and payouts work",
    description:
      "Upfront pay, transparent commission, 100% of tips, and same-day payouts to mobile money. Here's exactly how Mckot driver pay works in Ghana.",
    url: `${siteConfig.url}/drive/earnings`,
  },
};

const pillars = [
  {
    icon: Eye,
    title: "Upfront pay on every trip",
    body: "Before you accept a request, Mckot shows you the fare, the distance to pickup, and the trip distance. You always know what a trip pays before you commit to it.",
  },
  {
    icon: Receipt,
    title: "Transparent commission",
    body: "On every completed trip your earnings screen breaks down the gross fare, Mckot's commission, and your net. Nothing is hidden, and you can review it any time.",
  },
  {
    icon: HeartHandshake,
    title: "Keep 100% of tips",
    body: "Customers can tip you in the app. The full tip goes to you, Mckot never takes a cut of your tips.",
  },
  {
    icon: Clock3,
    title: "Same-day payouts",
    body: "Cash out your wallet balance to mobile money and we process it the same day. You're not locked into a weekly pay cycle to access money you've already earned.",
  },
];

const exampleCommission = (EXAMPLE_FARE * EXAMPLE_COMMISSION_PCT) / 100;
const exampleNet = EXAMPLE_FARE - exampleCommission + EXAMPLE_TIP;

const faqs: FaqItem[] = [
  {
    q: "How much do Mckot drivers make in Accra?",
    a: "There's no fixed salary, what you earn depends on how many hours you drive, the trips you accept, and demand in your area. Because you see the fare before you accept, keep 100% of your tips, and pay a clear, visible commission, you keep more of every cedi you earn. Your in-app earnings dashboard tracks your totals by day, week, and month.",
  },
  {
    q: "How much commission does Mckot take?",
    a: "Mckot takes a percentage commission on each trip, and that amount is shown to you on the earnings breakdown for every single trip, gross fare, commission, and your net. You're never guessing what was deducted or why.",
  },
  {
    q: "When do Mckot drivers get paid?",
    a: "Your earnings collect in your Mckot wallet as you complete trips. When you request a payout, it's sent to your mobile money account the same day, you don't have to wait for a weekly pay run.",
  },
  {
    q: "How do I cash out my earnings?",
    a: "Open the earnings section in the driver app, tap withdraw, choose your saved mobile money account, enter the amount, and confirm with your PIN. The payout is processed the same day.",
  },
  {
    q: "Do I keep my tips?",
    a: "Yes, 100%. When a customer adds a tip it appears in your earnings as a separate line and the full amount is yours. Commission is never charged on tips.",
  },
  {
    q: "Are cash trips and mobile money trips both tracked?",
    a: "Yes. Whether a customer pays cash or pays digitally, the trip and your earnings are recorded in your dashboard, and your fare breakdown shows the split between cash and digital so your books always reconcile.",
  },
];

export default function DriverEarningsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Mckot Driver Earnings and Payouts Work in Ghana",
    description:
      "An explanation of how Mckot driver pay works: upfront pay, transparent commission, 100% of tips, and same-day payouts to mobile money.",
    datePublished: LAST_UPDATED,
    dateModified: LAST_UPDATED,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/drive/earnings`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
            Driver earnings
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-brand-foreground md:text-5xl">
            How your pay works on Mckot
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Mckot driver pay is built to be clear and fast: you see the fare
            before you accept a trip, you pay a commission that&rsquo;s shown on
            every trip, you keep 100% of your tips, and you can cash out to
            mobile money the same day. Here&rsquo;s exactly how it adds up.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={siteConfig.app.playStore} external icon={Smartphone}>
              Start driving
            </Button>
            <Button href="/drive" variant="secondary">
              Back to Drive with Mckot
            </Button>
          </div>
        </FadeIn>
      </Section>

      {/* Pillars */}
      <Section className="bg-brand-muted/10">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground md:text-3xl">
            Four reasons you keep more with Mckot
          </h2>
        </FadeIn>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <FadeIn key={p.title} delay={i * 0.05}>
                <Card className="h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-accent/30 bg-brand-accent/10">
                    <Icon className="h-5 w-5 text-brand-accent" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-brand-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-foreground/65">
                    {p.body}
                  </p>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Worked example */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-brand-foreground md:text-4xl">
              What a single trip looks like
            </h2>
            <p className="mt-4 text-brand-foreground/65 md:text-lg">
              Here&rsquo;s how the breakdown works on one example trip. The
              numbers are illustrative, your real fares depend on distance,
              time, and demand.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-brand-border bg-white p-6 md:p-8">
            <dl className="space-y-2 text-sm md:text-base">
              <Row label="Trip fare (shown before you accept)" value={`GHS ${EXAMPLE_FARE.toFixed(2)}`} />
              <Row
                label={`Mckot commission (~${EXAMPLE_COMMISSION_PCT}%)`}
                value={`− GHS ${exampleCommission.toFixed(2)}`}
                muted
              />
              <Row label="Customer tip (100% yours)" value={`+ GHS ${EXAMPLE_TIP.toFixed(2)}`} muted />
              <hr className="border-brand-border/60" />
              <Row
                label="You keep"
                value={`GHS ${exampleNet.toFixed(2)}`}
                emphasis
              />
            </dl>
            <div className="mt-6 flex items-start gap-2 rounded-xl bg-brand-muted/50 p-3 text-xs text-brand-foreground/65">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
              <p>
                Illustrative only. Actual earnings vary by ride type, distance,
                hours online, and demand. Mckot does not guarantee a minimum
                income. The exact commission and the full breakdown are always
                visible in your driver app.
              </p>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Payout explainer */}
      <Section className="bg-brand-muted/10">
        <div className="grid gap-10 md:grid-cols-2">
          <FadeIn>
            <h2 className="text-2xl font-bold text-brand-foreground md:text-3xl">
              Getting paid is same-day
            </h2>
            <p className="mt-4 text-brand-foreground/70">
              Most platforms make you wait for a weekly pay run. Mckot
              doesn&rsquo;t. Your earnings build up in your wallet as you
              complete trips, and when you want your money you request a payout
              to mobile money, we process it the same day.
            </p>
            <p className="mt-4 text-brand-foreground/70">
              You can see your balance, your recent payouts, and your earnings
              by day, week, and month right in the driver app.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ol className="space-y-3">
              {[
                "Complete trips, earnings land in your Mckot wallet",
                "Open the earnings section and tap withdraw",
                "Pick your mobile money account and enter the amount",
                "Confirm with your PIN, paid out the same day",
              ].map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-3 rounded-xl border border-brand-border bg-brand-surface/70 p-4 text-sm text-brand-foreground/75"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-accent/15 text-xs font-bold text-brand-accent">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>
      </Section>

      <FaqAccordion
        items={faqs}
        eyebrow="Earnings questions"
        heading="Mckot driver pay, answered."
      />
    </>
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
          ? "rounded-lg bg-brand-accent/15 px-3 py-2 text-lg font-semibold text-brand-foreground"
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
