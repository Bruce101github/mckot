import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Smartphone, Package, Bike, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delivery for Online Vendors in Ghana | Mckot",
  description:
    "Mckot is built for Instagram, TikTok, WhatsApp, and Facebook sellers in Accra. Same-day pickup, cash-on-delivery, real-time tracking. Get 3 free deliveries.",
  alternates: { canonical: `${siteConfig.url}/vendors` },
};

const painPoints = [
  {
    problem: "Customers refuse to prepay",
    solution: "We collect cash on delivery. Your customer pays when the order arrives. You get reconciled totals same day.",
  },
  {
    problem: "Riders show up late or ghost you",
    solution: "Pickup confirmed in the app before you pack. You see rider location in real time. No more chasing calls.",
  },
  {
    problem: "Customers keep asking 'where is my order?'",
    solution: "Every delivery gets a tracking link sent straight to your customer. You stop being the middleman.",
  },
  {
    problem: "Your drop days are chaos",
    solution: "Batch your pickups. Schedule the time window. One message to us, and we align the rider to your launch.",
  },
];

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Sign up on WhatsApp",
    body: "Message us your name, business name, and the Accra zones you deliver to. Setup takes under 10 minutes. No paperwork.",
    note: "Or fill the form below and we reach out to you.",
  },
  {
    number: "02",
    icon: Smartphone,
    title: "Download the Mckot app",
    body: "Free on Android and iOS. This is where you book every pickup, track riders, and see your order history.",
    note: "Works on any Android or iPhone.",
  },
  {
    number: "03",
    icon: Package,
    title: "Book your first pickup",
    body: "Enter your pickup address, your customer's address, and any parcel notes. Rider confirmation comes back instantly.",
    note: "Same-day or schedule for later.",
  },
  {
    number: "04",
    icon: Bike,
    title: "We deliver. You get paid.",
    body: "Your rider collects from you, delivers to your customer, and handles cash-on-delivery. You get delivery confirmation with proof.",
    note: "COD settled same day.",
  },
];

const segments = [
  { emoji: "💄", label: "Skincare and beauty" },
  { emoji: "👗", label: "Fashion and clothing" },
  { emoji: "👟", label: "Footwear and streetwear" },
  { emoji: "🥧", label: "Food and snacks" },
  { emoji: "📱", label: "Tech accessories" },
  { emoji: "🌸", label: "Home decor and gifts" },
  { emoji: "💊", label: "Health and wellness" },
  { emoji: "🎨", label: "Art and crafts" },
];

export default function VendorsPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Delivery for Online Vendors in Ghana",
    description:
      "Same-day last-mile delivery for Instagram, TikTok, WhatsApp, and Facebook sellers in Accra, Ghana. Cash-on-delivery handled, real-time tracking included.",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.phones.primary,
    },
    areaServed: { "@type": "City", name: "Accra", containedInPlace: { "@type": "Country", name: "Ghana" } },
    serviceType: "Last-Mile Delivery",
    offers: {
      "@type": "Offer",
      price: "35",
      priceCurrency: "GHS",
      description: "Per delivery from GHS 35",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">For vendors</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-brand-foreground md:text-5xl">
            Delivery built for how Accra social sellers actually work
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Your storefront lives in DMs and Stories. Your customers pay cash. Your drops
            happen on days you choose. Mckot fits into that workflow instead of fighting it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Get 3 free deliveries on WhatsApp
            </Link>
            <Button href="#how-we-work" variant="secondary">
              See how it works
            </Button>
          </div>
          <p className="mt-3 text-xs text-brand-foreground/40">
            First 3 deliveries free in your first 30 days. No subscription.
          </p>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">
            The problems Mckot solves
          </h2>
          <p className="mt-4 max-w-2xl text-brand-foreground/65">
            Every one of these costs Accra vendors sales. We built specifically around them.
          </p>
        </FadeIn>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {painPoints.map((item, i) => (
            <FadeIn key={item.problem} delay={i * 0.06}>
              <div className="rounded-2xl border border-brand-border bg-brand-surface/80 p-6">
                <p className="text-sm font-semibold text-red-500/80">Problem: {item.problem}</p>
                <p className="mt-3 text-sm leading-relaxed text-brand-foreground/75">
                  <span className="font-semibold text-brand-accent">Mckot:</span>{" "}
                  {item.solution}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section id="how-we-work">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-dark/60">
            How we work
          </p>
          <h2 className="mt-3 text-3xl font-bold text-brand-foreground md:text-4xl">
            Four steps from sign-up to delivered
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
                  <p className="mt-4 text-4xl font-black text-brand-accent/20">{s.number}</p>
                  <h3 className="mt-1 text-base font-bold text-brand-foreground">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-foreground/65">{s.body}</p>
                  <p className="mt-4 text-xs text-brand-accent font-medium">{s.note}</p>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      <Section className="bg-brand-muted/10">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">Who we work with</h2>
          <p className="mt-4 max-w-xl text-brand-foreground/65">
            Any vendor who sells online and delivers in Accra. Here are the most common
            types we serve.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {segments.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-brand-surface/70 px-3 py-1.5 text-sm font-medium text-brand-foreground/70"
              >
                {s.emoji} {s.label}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-brand-foreground/50">
            If you sell it online and deliver in Accra, we can handle your logistics.
            Not on the list?{" "}
            <Link
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-accent hover:underline"
            >
              Ask us on WhatsApp.
            </Link>
          </p>
        </FadeIn>
      </Section>

      <Section className="pb-24 md:pb-16">
        <FadeIn>
          <div className="rounded-3xl bg-brand-dark p-10 md:p-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
              Founding vendor offer
            </p>
            <h2 className="mt-4 text-3xl font-bold text-brand-dark-foreground">
              3 free deliveries in your first 30 days
            </h2>
            <p className="mt-4 max-w-xl text-brand-dark-foreground/70">
              We are onboarding our first 50 vendors right now. Join and get your first 3
              deliveries on us. No catch, no code. Message us on WhatsApp to claim.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "No subscription or monthly fee",
                "Setup over WhatsApp in under 10 minutes",
                "Cancel anytime after your free deliveries",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-brand-dark-foreground/75">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Claim on WhatsApp
              </Link>
              <Button href="/contact#signup" variant="secondary" className="border-white/20 bg-white/10 text-brand-dark-foreground hover:bg-white/15">
                Fill the signup form
              </Button>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
