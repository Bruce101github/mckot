import type { Metadata } from "next";
import {
  Wallet,
  Clock3,
  Eye,
  HeartHandshake,
  ShieldCheck,
  Smartphone,
  FileCheck2,
  CarFront,
  Bike,
  CheckCircle2,
} from "lucide-react";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/Button";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { siteConfig } from "@/lib/site";

const LAST_UPDATED = "2026-06-06";

const driveWhatsApp = `https://wa.me/${siteConfig.phones.primary.replace(
  /[^0-9]/g,
  "",
)}?text=${encodeURIComponent(
  "Hi Mckot, I'd like to sign up to drive / ride on Mckot in Accra.",
)}`;

export const metadata: Metadata = {
  title: "Drive with Mckot in Accra | Earn on your own schedule",
  description:
    "Drive a car or ride a motorbike with Mckot in Accra, Ghana. See your pay before you accept, keep 100% of your tips, and cash out to mobile money the same day. Apply in the app.",
  keywords: [
    "drive with Mckot",
    "ride hailing jobs Accra",
    "driver jobs Accra",
    "how to become a driver in Ghana",
    "Mckot driver sign up",
    "online taxi driver Ghana",
  ],
  alternates: { canonical: `${siteConfig.url}/drive` },
  openGraph: {
    title: "Drive with Mckot, earn on your own schedule in Accra",
    description:
      "See your pay before every trip, keep 100% of tips, and cash out the same day. Sign up to drive or ride with Mckot in Accra, Ghana.",
    url: `${siteConfig.url}/drive`,
  },
};

const benefits = [
  {
    icon: Eye,
    title: "See your pay before you accept",
    body: "Every trip request shows the fare, the pickup distance, and the trip distance up front. You decide before you move, no mystery trips.",
  },
  {
    icon: Clock3,
    title: "Same-day payouts",
    body: "Request a payout and the money lands in your mobile money wallet the same day. No waiting a full week to get paid for work you already did.",
  },
  {
    icon: HeartHandshake,
    title: "Keep 100% of your tips",
    body: "When a customer adds a tip, it's yours in full. Tips never count toward Mckot's commission.",
  },
  {
    icon: Wallet,
    title: "Transparent commission",
    body: "Your earnings screen shows the gross fare, Mckot's commission, and your net on every single trip. No hidden deductions.",
  },
  {
    icon: Clock3,
    title: "Work when you want",
    body: "Go online and offline whenever it suits you. Drive full-time, or fit it around school, a day job, or family.",
  },
  {
    icon: ShieldCheck,
    title: "Safety built in",
    body: "Verified customers, an in-app SOS button, and live trip tracking keep you safer on every shift. See our safety page for the full list.",
  },
];

const steps = [
  {
    number: "01",
    icon: Smartphone,
    title: "Download the Mckot app",
    body: "Free on Android and iPhone. Open it and choose to sign up as a driver.",
  },
  {
    number: "02",
    icon: FileCheck2,
    title: "Upload your documents",
    body: "Your driver's licence, vehicle details, and a valid ID. We verify everything before you go live.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Get approved",
    body: "We check your documents and vehicle. Most drivers are reviewed within a couple of days.",
  },
  {
    number: "04",
    icon: Wallet,
    title: "Go online and earn",
    body: "Accept your first trip, get paid into your wallet, and cash out to mobile money the same day.",
  },
];

const requirements = [
  "A valid Ghanaian driver's licence",
  "A car in good condition (or a roadworthy motorbike for rides and deliveries)",
  "Vehicle insurance and a roadworthy certificate",
  "A valid national ID (Ghana Card recommended)",
  "An Android phone or iPhone that can run the Mckot app",
  "You must be at least 21 years old",
];

const faqs: FaqItem[] = [
  {
    q: "How do I become a Mckot driver in Accra?",
    a: "Download the Mckot app, choose to sign up as a driver, and upload your driver's licence, vehicle details, and a valid ID. Once we verify your documents, usually within a couple of days, you can go online and start accepting trips in Accra.",
  },
  {
    q: "What are the requirements to drive for Mckot in Ghana?",
    a: "You need a valid Ghanaian driver's licence, a car in good condition (or a roadworthy motorbike for rides and deliveries), vehicle insurance and a roadworthy certificate, a valid national ID, and a smartphone that can run the Mckot app. You must be at least 21 years old.",
  },
  {
    q: "Do I need my own car to drive with Mckot?",
    a: "You need access to a vehicle, but you don't have to own one outright. Many drivers operate a car on a work-and-pay or rental arrangement, or ride a motorbike. If you own bikes and want to put riders on them, look at the Mckot Fleet Partner programme instead.",
  },
  {
    q: "How much do Mckot drivers earn?",
    a: "Your earnings depend on how many hours you drive, the trips you accept, and your area. Because you see the pay before you accept, keep 100% of your tips, and pay a transparent commission, you keep more of every fare. See the Mckot driver earnings page for a full breakdown of how pay works.",
  },
  {
    q: "When and how do I get paid?",
    a: "Your earnings build up in your Mckot wallet as you complete trips. Request a payout and it's sent to your mobile money account the same day, you don't wait a full week.",
  },
  {
    q: "Can I drive part-time?",
    a: "Yes. You choose when to go online and offline. Drive full-time or fit it around school, another job, or family, there's no minimum number of hours.",
  },
];

export default function DrivePage() {
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Driver / Rider, Mckot (Accra)",
    description:
      "Drive a car or ride a motorbike with Mckot in Accra, Ghana. Flexible hours, see your pay before you accept each trip, keep 100% of tips, and cash out to mobile money the same day.",
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
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Ghana",
    },
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
            Drive with Mckot
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-brand-foreground md:text-5xl">
            Earn on your own schedule, get paid the same day
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Driving with Mckot means earning money on your own terms in Accra,
            Ghana, in a car or on a motorbike. You see your pay before you
            accept every trip, keep 100% of your tips, and cash out to mobile
            money the same day instead of waiting a full week.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={siteConfig.app.playStore} external icon={Smartphone}>
              Apply to drive
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

      {/* Why drive */}
      <Section className="bg-brand-muted/10">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground md:text-3xl">
            Why drivers choose Mckot
          </h2>
          <p className="mt-4 max-w-2xl text-brand-foreground/65">
            We built the driver side around the things that actually decide
            whether a shift was worth it: clear pay, fast money, and keeping
            what you earn.
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
            Four steps from sign-up to your first payout
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
              faster. You can drive a car or ride a motorbike, both work on
              Mckot.
            </p>
            <div className="mt-6 flex gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface/70 px-3 py-1.5 text-sm font-medium text-brand-foreground/70">
                <CarFront className="h-4 w-4 text-brand-accent" aria-hidden /> Car
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface/70 px-3 py-1.5 text-sm font-medium text-brand-foreground/70">
                <Bike className="h-4 w-4 text-brand-accent" aria-hidden /> Motorbike
              </span>
            </div>
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
              Ready to start earning?
            </h2>
            <p className="mt-4 max-w-xl text-brand-dark-foreground/70">
              Download the Mckot app to apply, or message us on WhatsApp if you
              have questions before you sign up. We&rsquo;re onboarding drivers
              and riders across Accra right now.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={siteConfig.app.playStore} external icon={Smartphone}>
                Get the app on Google Play
              </Button>
              <Button
                href={driveWhatsApp}
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
        eyebrow="Driver questions"
        heading="Driving with Mckot, answered."
      />
    </>
  );
}
