import type { Metadata } from "next";
import {
  Wallet,
  Clock3,
  Package,
  ShieldCheck,
  Smartphone,
  FileCheck2,
  MapPin,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/Button";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { siteConfig } from "@/lib/site";

const LAST_UPDATED = "2026-06-06";

const riderWhatsApp = `https://wa.me/${siteConfig.phones.primary.replace(
  /[^0-9]/g,
  "",
)}?text=${encodeURIComponent(
  "Hi Mckot, I'd like to sign up as a dispatch rider / delivery rider in Accra.",
)}`;

export const metadata: Metadata = {
  title: "Dispatch Rider Jobs in Accra | Deliver with Mckot",
  description:
    "Become a dispatch rider with Mckot in Accra, Ghana. Get delivery orders sent to your phone, see your pay before you accept, keep 100% of tips, and cash out to mobile money the same day.",
  keywords: [
    "dispatch rider jobs Accra",
    "delivery rider jobs Ghana",
    "become a dispatch rider Ghana",
    "okada delivery Accra",
    "courier jobs Accra",
    "motorbike rider jobs Ghana",
  ],
  alternates: { canonical: `${siteConfig.url}/deliver` },
  openGraph: {
    title: "Deliver with Mckot, dispatch rider jobs in Accra",
    description:
      "Get delivery orders on your phone, see your pay before you accept, keep 100% of tips, and cash out the same day. Sign up as a Mckot dispatch rider in Accra.",
    url: `${siteConfig.url}/deliver`,
  },
};

const benefits = [
  {
    icon: Package,
    title: "Steady delivery orders",
    body: "Mckot works with online vendors across Accra, so there's a constant flow of parcels that need a rider. Orders come straight to your phone.",
  },
  {
    icon: Clock3,
    title: "Same-day payouts",
    body: "Cash out your wallet to mobile money the same day. You don't wait a week to get paid for runs you've already done.",
  },
  {
    icon: HeartHandshake,
    title: "Keep 100% of your tips",
    body: "Tips from customers are yours in full, Mckot never takes a cut of a tip.",
  },
  {
    icon: Wallet,
    title: "Transparent commission",
    body: "Your earnings screen shows the gross fee, Mckot's commission, and your net on every delivery. No hidden deductions.",
  },
  {
    icon: MapPin,
    title: "See pay before you accept",
    body: "Every order shows the pickup, the drop-off distance, and what it pays before you take it. You stay in control of your runs.",
  },
  {
    icon: ShieldCheck,
    title: "Backed by a real team",
    body: "Cash-on-delivery is reconciled for you, customers are verified, and our support team has your back if a delivery goes sideways.",
  },
];

const steps = [
  {
    number: "01",
    icon: Smartphone,
    title: "Download the Mckot app",
    body: "Free on Android and iPhone. Open it and sign up as a rider.",
  },
  {
    number: "02",
    icon: FileCheck2,
    title: "Upload your documents",
    body: "Your rider's licence, motorbike details, and a valid ID. We verify before you go live.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Get approved",
    body: "We check your documents and bike. Most riders are reviewed within a couple of days.",
  },
  {
    number: "04",
    icon: Package,
    title: "Start accepting deliveries",
    body: "Go online, pick up your first parcel, deliver it, and watch your wallet grow.",
  },
];

const requirements = [
  "A roadworthy motorbike in good condition",
  "A valid Ghanaian rider's licence",
  "A valid national ID (Ghana Card recommended)",
  "A helmet and basic safety gear",
  "An Android phone or iPhone that can run the Mckot app",
  "Good knowledge of Accra roads and routes",
];

const faqs: FaqItem[] = [
  {
    q: "How do I become a dispatch rider in Accra?",
    a: "Download the Mckot app, sign up as a rider, and upload your rider's licence, motorbike details, and a valid ID. Once we verify your documents, usually within a couple of days, you can go online and start accepting delivery orders across Accra.",
  },
  {
    q: "What do I need to become a Mckot delivery rider in Ghana?",
    a: "You need a roadworthy motorbike, a valid Ghanaian rider's licence, a valid national ID, a helmet and basic safety gear, and a smartphone that can run the Mckot app. Good knowledge of Accra roads helps you complete more runs.",
  },
  {
    q: "How much do dispatch riders earn with Mckot?",
    a: "Your earnings depend on how many deliveries you complete and the distances involved. You see what each order pays before you accept it, you keep 100% of your tips, and you pay a transparent commission, so you keep more of every cedi. Your dashboard tracks totals by day, week, and month.",
  },
  {
    q: "When and how do I get paid?",
    a: "Your earnings build up in your Mckot wallet as you complete deliveries. Request a payout and it's sent to your mobile money account the same day, no weekly wait.",
  },
  {
    q: "Do I handle cash-on-delivery?",
    a: "Yes, many Accra orders are cash-on-delivery. You collect the cash for the vendor, and Mckot reconciles it for you in the app so your records are always clear.",
  },
  {
    q: "Can I deliver part-time?",
    a: "Yes. You decide when to go online and offline. Ride full-time or fit deliveries around other work, there's no minimum number of hours.",
  },
];

export default function DeliverPage() {
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Dispatch Rider / Delivery Rider, Mckot (Accra)",
    description:
      "Become a dispatch rider with Mckot in Accra, Ghana. Receive delivery orders on your phone, see your pay before you accept, keep 100% of tips, and cash out to mobile money the same day.",
    datePosted: LAST_UPDATED,
    employmentType: ["FULL_TIME", "PART_TIME", "CONTRACTOR"],
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.address.locality,
        addressRegion: siteConfig.address.region,
        addressCountry: siteConfig.address.country,
      },
    },
    applicantLocationRequirements: { "@type": "Country", name: "Ghana" },
    directApply: true,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />

      {/* Hero */}
      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
            Deliver with Mckot
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-brand-foreground md:text-5xl">
            Dispatch rider jobs in Accra, on your schedule
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Becoming a dispatch rider with Mckot means earning from deliveries
            across Accra on your own time. Orders come straight to your phone,
            you see what each one pays before you accept, you keep 100% of your
            tips, and you cash out to mobile money the same day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={siteConfig.app.playStore} external icon={Smartphone}>
              Sign up to ride
            </Button>
            <Button href="/drive/earnings" variant="secondary">
              See how earnings work
            </Button>
          </div>
          <p className="mt-3 text-xs text-brand-foreground/40">
            Sign up free in the Mckot app. No joining fee.
          </p>
        </FadeIn>
      </Section>

      {/* Why ride */}
      <Section className="bg-brand-muted/10">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground md:text-3xl">
            Why riders deliver with Mckot
          </h2>
          <p className="mt-4 max-w-2xl text-brand-foreground/65">
            Real order volume from Accra vendors, clear pay, and money you can
            actually reach the same day.
          </p>
        </FadeIn>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <FadeIn key={b.title} delay={i * 0.05}>
                <Card className="h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-accent/30 bg-brand-accent/10">
                    <Icon className="h-5 w-5 text-brand-accent" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-brand-foreground">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-foreground/65">
                    {b.body}
                  </p>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* How to start */}
      <Section>
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-dark/60">
            Getting started
          </p>
          <h2 className="mt-3 text-3xl font-bold text-brand-foreground md:text-4xl">
            Four steps to your first delivery
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={s.number} delay={i * 0.07}>
                <Card className="h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-accent/30 bg-brand-accent/10">
                    <Icon className="h-5 w-5 text-brand-accent" aria-hidden />
                  </div>
                  <p className="mt-4 text-4xl font-black text-brand-accent/20">
                    {s.number}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-brand-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-foreground/65">
                    {s.body}
                  </p>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Requirements */}
      <Section className="bg-brand-muted/10">
        <div className="grid gap-10 md:grid-cols-2">
          <FadeIn>
            <h2 className="text-2xl font-bold text-brand-foreground md:text-3xl">
              What you need to get started
            </h2>
            <p className="mt-4 text-brand-foreground/65">
              Have these ready before you apply and your approval will move
              faster.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ul className="space-y-3">
              {requirements.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-3 rounded-xl border border-brand-border bg-brand-surface/70 p-4 text-sm text-brand-foreground/75"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent"
                    aria-hidden
                  />
                  {r}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Section>

      {/* CTA */}
      <Section className="pb-24 md:pb-16">
        <FadeIn>
          <div className="rounded-3xl bg-brand-dark p-10 md:p-14">
            <h2 className="max-w-2xl text-3xl font-bold text-brand-dark-foreground md:text-4xl">
              Start earning as a Mckot rider
            </h2>
            <p className="mt-4 max-w-xl text-brand-dark-foreground/70">
              Download the Mckot app to apply, or message us on WhatsApp if you
              have questions first. We&rsquo;re onboarding dispatch riders across
              Accra right now.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={siteConfig.app.playStore} external icon={Smartphone}>
                Get the app on Google Play
              </Button>
              <Button
                href={riderWhatsApp}
                external
                variant="secondary"
                className="border-white/20 bg-white/10 text-brand-dark-foreground hover:bg-white/15"
              >
                Ask on WhatsApp
              </Button>
            </div>
            <p className="mt-6 text-xs text-brand-dark-foreground/40">
              Last updated {LAST_UPDATED}.
            </p>
          </div>
        </FadeIn>
      </Section>

      <FaqAccordion
        items={faqs}
        eyebrow="Rider questions"
        heading="Dispatch riding with Mckot, answered."
      />
    </>
  );
}
