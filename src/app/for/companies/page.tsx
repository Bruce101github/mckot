import type { Metadata } from "next";
import Link from "next/link";
import { Building2, CalendarClock, Route, FileText, Wallet, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { ThreeChannelCta } from "@/components/ThreeChannelCta";
import { siteConfig, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Company Courier and B2B Delivery in Accra | Mckot",
  description:
    "Account-based courier and B2B delivery for companies in Accra. Scheduled pickups, multi-stop runs, document delivery, and one monthly statement. Book on the site, app, or WhatsApp.",
  alternates: { canonical: `${siteConfig.url}/for/companies` },
};

const WA = waLink("Hi Mckot, my company needs a delivery account. Can you set us up?");

const features = [
  {
    icon: CalendarClock,
    title: "Scheduled pickups",
    body: "Set a recurring window and a rider shows up on time, every time. Daily document runs, weekly stock moves, whatever your operation needs.",
  },
  {
    icon: Route,
    title: "Multi-stop runs",
    body: "One rider, several drops in a planned sequence. We route the run so a single dispatch clears your whole list.",
  },
  {
    icon: FileText,
    title: "One monthly statement",
    body: "Every delivery logged with date, route, and cost. One clean statement at month end for your accounts team. No loose receipts.",
  },
  {
    icon: Wallet,
    title: "Account billing",
    body: "Run on account and settle on agreed terms instead of paying per trip. Your team books, we invoice the company.",
  },
];

const useCases = [
  "Inter-branch document and contract runs",
  "Scheduled supply and stock transfers",
  "Bank and government office drop-offs",
  "Sample and spare-part distribution",
  "Daily mail and parcel collection",
  "Event and conference material runs",
];

export default function CompaniesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Company Courier and B2B Delivery in Accra",
    description:
      "Account-based courier and B2B delivery for companies in Accra, Ghana. Scheduled pickups, multi-stop runs, document delivery, and monthly billing.",
    provider: { "@type": "LocalBusiness", name: siteConfig.name, url: siteConfig.url, telephone: siteConfig.phones.primary },
    areaServed: { "@type": "Place", name: "Accra, Greater Accra, Ghana" },
    serviceType: "Corporate Courier and Last-Mile Delivery",
    offers: { "@type": "Offer", price: "35", priceCurrency: "GHS" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <div className="flex items-center gap-2 text-sm font-medium text-brand-foreground/50">
            <Building2 className="h-4 w-4 text-brand-accent" aria-hidden />
            <span>For companies</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold text-brand-foreground md:text-5xl">
            A delivery account for your company
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Scheduled pickups, multi-stop runs, and document delivery across
            Greater Accra, billed to one account with a single monthly
            statement. Built for companies that move things every day and need
            it handled without a fleet of their own.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={siteConfig.book} className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover">
              Book a delivery
            </Link>
            <Link href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-brand-border px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-surface">
              Set up an account
            </Link>
          </div>
          <p className="mt-3 text-xs text-brand-foreground/40">Book on the site, in the app, or on WhatsApp. No setup fee.</p>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">What an account gives you</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-brand-border bg-brand-surface/80 p-5">
                  <Icon className="h-5 w-5 text-brand-accent" aria-hidden />
                  <p className="mt-3 font-semibold text-brand-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-brand-foreground/65">{item.body}</p>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-brand-foreground">What companies send with Mckot</h2>
              <ul className="mt-6 space-y-3">
                {useCases.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-brand-foreground/75">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand-foreground">How billing works</h2>
              <div className="mt-6 space-y-4 text-sm text-brand-foreground/70">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
                  <p>Your team books deliveries on the site, in the app, or over WhatsApp under your company name.</p>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
                  <p>Every run is logged automatically with route, time, and cost.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
                  <p>We send one consolidated statement at month end and you settle on agreed terms.</p>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/pricing" className="text-sm text-brand-accent hover:underline">See standard delivery rates</Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10 pb-24 md:pb-16">
        <FadeIn>
          <ThreeChannelCta
            heading="Set up your company account"
            subheading="Tell us your routine and we will put a plan together. Start booking the same day on the site, in the app, or on WhatsApp."
            waMessage="Hi Mckot, my company needs a delivery account. Can you set us up?"
            bookLabel="Book a delivery now"
          />
        </FadeIn>
      </Section>
    </>
  );
}
