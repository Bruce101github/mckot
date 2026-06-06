import type { Metadata } from "next";
import Link from "next/link";
import { Pill, Clock, Thermometer, ShieldCheck, ClipboardList, MapPin, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { ThreeChannelCta } from "@/components/ThreeChannelCta";
import { siteConfig, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pharmacy and Prescription Delivery in Accra | Mckot",
  description:
    "Same-day prescription and medical supply delivery for pharmacies in Accra. Discreet handling, fast dispatch, and live tracking. Book on the site, app, or WhatsApp.",
  alternates: { canonical: `${siteConfig.url}/for/pharmacies` },
};

const WA = waLink("Hi Mckot, my pharmacy needs same-day prescription delivery. Can you help?");

const features = [
  {
    icon: Clock,
    title: "Fast, same-day dispatch",
    body: "A patient calls in a prescription, you book a rider, it reaches their door the same day. Urgent runs go out within the hour.",
  },
  {
    icon: ShieldCheck,
    title: "Discreet handling",
    body: "Medication is handled privately and professionally. Sealed packaging stays sealed from your counter to the patient.",
  },
  {
    icon: Thermometer,
    title: "Care with sensitive items",
    body: "Tell us what is inside and any handling notes. Our riders keep fragile and temperature-sensitive items upright and protected.",
  },
  {
    icon: ClipboardList,
    title: "Proof of delivery",
    body: "Every drop is confirmed so you have a clear record of what reached which patient and when.",
  },
];

const useCases = [
  "Prescription delivery to patients at home",
  "Repeat medication runs for regular patients",
  "Medical supply transfers between branches",
  "Sample drop-offs to clinics and labs",
  "Stock pickups from suppliers and distributors",
  "Urgent after-hours single-item runs",
];

export default function PharmaciesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Pharmacy and Prescription Delivery in Accra",
    description:
      "Same-day prescription and medical supply delivery for pharmacies in Accra, Ghana. Discreet handling, fast dispatch, and proof of delivery.",
    provider: { "@type": "LocalBusiness", name: siteConfig.name, url: siteConfig.url, telephone: siteConfig.phones.primary },
    areaServed: { "@type": "Place", name: "Accra, Greater Accra, Ghana" },
    serviceType: "Pharmacy and Medical Delivery",
    offers: { "@type": "Offer", price: "35", priceCurrency: "GHS" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <div className="flex items-center gap-2 text-sm font-medium text-brand-foreground/50">
            <Pill className="h-4 w-4 text-brand-accent" aria-hidden />
            <span>For pharmacies</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold text-brand-foreground md:text-5xl">
            Prescription delivery your patients can count on
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Get medication to patients the same day without tying up your own
            staff. Mckot handles prescription drops, medical supply runs, and
            sample deliveries across Greater Accra, discreetly and on time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={siteConfig.book} className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover">
              Book a delivery
            </Link>
            <Link href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-brand-border px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-surface">
              Talk to us on WhatsApp
            </Link>
          </div>
          <p className="mt-3 text-xs text-brand-foreground/40">Book on the site, in the app, or on WhatsApp. Same-day across Accra.</p>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">Built for medical delivery</h2>
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
              <h2 className="text-2xl font-bold text-brand-foreground">What pharmacies send with Mckot</h2>
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
              <h2 className="text-2xl font-bold text-brand-foreground">Simple to run</h2>
              <div className="mt-6 space-y-4 text-sm text-brand-foreground/70">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
                  <p>Book a pickup from your counter with the patient address and any handling notes.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
                  <p>A rider collects fast and your patient tracks the delivery on the map.</p>
                </div>
                <div className="flex items-start gap-3">
                  <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
                  <p>You get delivery confirmation for your records. Run it ad hoc or set a daily window.</p>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/pricing" className="text-sm text-brand-accent hover:underline">See delivery rates by zone</Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10 pb-24 md:pb-16">
        <FadeIn>
          <ThreeChannelCta
            heading="Start delivering prescriptions today"
            subheading="Set up takes a single conversation. After that, book each run on the site, in the app, or on WhatsApp."
            waMessage="Hi Mckot, my pharmacy needs same-day prescription delivery. Can you help?"
            bookLabel="Book a delivery"
          />
        </FadeIn>
      </Section>
    </>
  );
}
