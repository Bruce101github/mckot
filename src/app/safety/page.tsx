import type { Metadata } from "next";
import {
  ShieldCheck,
  BadgeCheck,
  Siren,
  MapPin,
  Star,
  UserCheck,
  Headset,
  Smartphone,
} from "lucide-react";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/Button";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { siteConfig } from "@/lib/site";

const LAST_UPDATED = "2026-06-06";

export const metadata: Metadata = {
  title: "Safety at Mckot | How We Keep Riders & Drivers Safe in Accra",
  description:
    "How Mckot keeps you safe in Accra: verified drivers and riders, an in-app SOS button that alerts our team with your live location, real-time trip tracking, and two-way ratings.",
  keywords: [
    "is Mckot safe",
    "Mckot safety features",
    "ride hailing safety Accra",
    "safe ride Accra",
    "ride hailing safety Ghana",
  ],
  alternates: { canonical: `${siteConfig.url}/safety` },
  openGraph: {
    title: "Safety at Mckot, built into every trip",
    description:
      "Verified drivers and riders, an SOS button that alerts our team with your live location, real-time tracking, and two-way ratings. Here's how Mckot keeps you safe in Accra.",
    url: `${siteConfig.url}/safety`,
  },
};

const beforeRide = [
  {
    icon: BadgeCheck,
    title: "Verified drivers and riders",
    body: "Every driver and dispatch rider is identity-verified with Smile ID and their Ghana Card before they can accept a single trip. We check licences and vehicle details too, nobody operates on Mckot without passing our checks.",
  },
  {
    icon: UserCheck,
    title: "Verified customers",
    body: "Riders aren't the only ones who get checked. Customer accounts are verified by phone before booking, so drivers and riders know who they're picking up.",
  },
];

const duringRide = [
  {
    icon: Siren,
    title: "In-app SOS button",
    body: "Tap the SOS button during a trip and Mckot immediately sends your live location and trip details to our on-call team, who can act and alert the authorities. It's a two-tap confirm so it can't fire by accident, and the alert leaves your phone even if you lose signal right after.",
  },
  {
    icon: MapPin,
    title: "Real-time trip tracking",
    body: "Every trip is tracked live on the map from pickup to drop-off. Deliveries get a tracking link too, so the people waiting on a parcel can follow it the whole way.",
  },
];

const afterRide = [
  {
    icon: Star,
    title: "Two-way ratings",
    body: "After every trip, riders and drivers rate each other. Low ratings are reviewed, and a driver or rider whose score falls below our standard stops getting matched.",
  },
  {
    icon: Headset,
    title: "A real support team",
    body: "When something goes wrong, you reach real people. Our operations team monitors trips and handles SOS alerts, disputes, and incident reports.",
  },
];

const faqs: FaqItem[] = [
  {
    q: "Is Mckot safe to use in Accra?",
    a: "Yes. Every Mckot driver and dispatch rider is identity-verified with Smile ID and their Ghana Card before they can accept trips, every trip is tracked live on the map, and an in-app SOS button lets you alert our on-call team with your live location at any moment. Riders and drivers also rate each other after every trip.",
  },
  {
    q: "Are Mckot drivers and riders background-checked?",
    a: "Yes. Before anyone can drive or ride on Mckot, we verify their identity through Smile ID and their Ghana Card, and we check their driver's or rider's licence and vehicle details. Anyone who doesn't pass our verification cannot operate on the platform.",
  },
  {
    q: "How does the Mckot SOS button work?",
    a: "During a trip you can tap the SOS button. After a quick two-tap confirm (so it can't fire by accident), Mckot captures your live GPS location and trip details and sends an alert to our on-call team, who can respond and contact the authorities. The alert is sent even if your phone loses signal immediately afterward.",
  },
  {
    q: "Can someone follow my trip in real time?",
    a: "Yes. Every Mckot trip is tracked live on the map from pickup to drop-off, and deliveries generate a tracking link so the person waiting on a parcel can follow its progress.",
  },
  {
    q: "What happens if I have a bad experience with a driver or rider?",
    a: "Rate the trip and tell us what happened. Low ratings are reviewed, repeat offenders are removed from the platform, and our support team handles disputes and incident reports directly.",
  },
];

export default function SafetyPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Safety at Mckot: How We Keep Riders and Drivers Safe in Accra",
    description:
      "An overview of Mckot's safety features in Ghana: verified drivers and riders, an in-app SOS button, real-time trip tracking, and two-way ratings.",
    datePublished: LAST_UPDATED,
    dateModified: LAST_UPDATED,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/safety`,
  };

  const groups = [
    { label: "Before the trip", items: beforeRide },
    { label: "During the trip", items: duringRide },
    { label: "After the trip", items: afterRide },
  ];

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
            Safety
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-brand-foreground md:text-5xl">
            Safety is built into every Mckot trip
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Mckot keeps riders and drivers in Accra safe with verified accounts
            on both sides, an in-app SOS button that alerts our team with your
            live location, real-time trip tracking, and two-way ratings. Here is
            what protects you before, during, and after every trip.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={siteConfig.app.playStore} external icon={Smartphone}>
              Get the Mckot app
            </Button>
            <Button href="/ride" variant="secondary">
              Book a ride
            </Button>
          </div>
        </FadeIn>
      </Section>

      {/* Before / During / After */}
      {groups.map((group, gi) => (
        <Section key={group.label} className={gi % 2 === 0 ? "bg-brand-muted/10" : ""}>
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-dark/60">
              {group.label}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-brand-foreground md:text-3xl">
              {gi === 0
                ? "Everyone is verified before they ride"
                : gi === 1
                  ? "Help is one tap away, and we're watching"
                  : "Accountability after every trip"}
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {group.items.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={i * 0.06}>
                  <Card className="h-full">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-accent/30 bg-brand-accent/10">
                      <Icon className="h-5 w-5 text-brand-accent" aria-hidden />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-brand-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-foreground/65">
                      {item.body}
                    </p>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        </Section>
      ))}

      {/* Reassurance CTA */}
      <Section className="pb-24 md:pb-16">
        <FadeIn>
          <div className="flex flex-col items-start gap-6 rounded-3xl bg-brand-dark p-10 md:flex-row md:items-center md:justify-between md:p-14">
            <div className="max-w-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent/15">
                <ShieldCheck className="h-6 w-6 text-brand-accent" aria-hidden />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-brand-dark-foreground md:text-3xl">
                Ride and drive with confidence
              </h2>
              <p className="mt-3 text-brand-dark-foreground/70">
                Whether you&rsquo;re booking a ride, sending a parcel, or earning
                with Mckot, the same safety checks protect you. Download the app
                to get started.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <Button href={siteConfig.app.playStore} external icon={Smartphone}>
                Get the app
              </Button>
              <p className="text-center text-xs text-brand-dark-foreground/40">
                Last updated {LAST_UPDATED}.
              </p>
            </div>
          </div>
        </FadeIn>
      </Section>

      <FaqAccordion
        items={faqs}
        eyebrow="Safety questions"
        heading="Your safety on Mckot, answered."
      />
    </>
  );
}
