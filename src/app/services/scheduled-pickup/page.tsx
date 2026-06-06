import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, Repeat, Users, Bell } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { ThreeChannelCta } from "@/components/ThreeChannelCta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Scheduled Pickup and Recurring Delivery in Accra | Mckot",
  description:
    "Set a recurring pickup window and a Mckot rider shows up on time, every time. Daily and weekly scheduled delivery across Greater Accra. Book on the site, app, or WhatsApp.",
  alternates: { canonical: `${siteConfig.url}/services/scheduled-pickup` },
};

const features = [
  { icon: CalendarClock, title: "Fixed pickup windows", body: "Choose the days and times that fit your operation. A rider arrives in that window without you booking each time." },
  { icon: Repeat, title: "Daily or weekly", body: "Run it every weekday, a few times a week, or once a week. Adjust the schedule whenever your needs change." },
  { icon: Users, title: "Consistent riders", body: "Where possible we keep the same riders on your route, so they learn your pickup point and your customers." },
  { icon: Bell, title: "Predictable and cheaper", body: "Scheduled volume is easier to plan, which means better rates than ad hoc bookings for the same runs." },
];

const whoFor = [
  "Shops clearing daily customer orders",
  "Restaurants with regular supply runs",
  "Pharmacies on a daily delivery round",
  "Companies with inter-branch document runs",
  "Distributors restocking the same stops",
  "Any business with a predictable delivery rhythm",
];

const faqs = [
  {
    q: "How do I set up a recurring pickup with Mckot?",
    a: "Message us with your pickup point, the days and times you want, and roughly how many deliveries per run. We confirm a schedule and a rider arrives in your window from then on. You can change it whenever you need.",
  },
  {
    q: "Is scheduled pickup cheaper than booking each time?",
    a: "Usually, yes. Predictable, recurring volume is easier for us to plan around, so scheduled runs and bulk packs are priced better than one-off bookings for the same routes.",
  },
  {
    q: "Can I change or pause my schedule?",
    a: "Yes. Your schedule is flexible. Add days, change windows, or pause for a period by letting us know on WhatsApp. There is no lock-in.",
  },
];

export default function ScheduledPickupPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Scheduled Pickup and Recurring Delivery in Accra",
    description:
      "Recurring scheduled pickup and delivery across Greater Accra, Ghana. Fixed daily or weekly windows with consistent riders and better rates for predictable volume.",
    provider: { "@type": "LocalBusiness", name: siteConfig.name, url: siteConfig.url, telephone: siteConfig.phones.primary },
    areaServed: { "@type": "City", name: "Accra", containedInPlace: { "@type": "Country", name: "Ghana" } },
    serviceType: "Scheduled Pickup and Recurring Delivery",
    offers: { "@type": "Offer", price: "35", priceCurrency: "GHS" },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">Scheduled pickup</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-brand-foreground md:text-5xl">
            Set it once, delivered on schedule
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            If your deliveries follow a rhythm, stop booking them one by one. Set
            a recurring pickup window and a Mckot rider shows up on time, every
            time, across Greater Accra. Daily or weekly, adjusted whenever you
            need.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={siteConfig.book} className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover">
              Book a delivery
            </Link>
            <Link href="/for/companies" className="inline-flex items-center gap-2 rounded-xl border border-brand-border px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-surface">
              Company accounts
            </Link>
          </div>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">How scheduled pickup helps</h2>
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
              <h2 className="text-2xl font-bold text-brand-foreground">Who it suits</h2>
              <ul className="mt-6 space-y-3">
                {whoFor.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-brand-foreground/75">
                    <CalendarClock className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand-foreground">Common questions</h2>
              <div className="mt-6 space-y-5">
                {faqs.map((f) => (
                  <div key={f.q}>
                    <p className="text-sm font-semibold text-brand-foreground">{f.q}</p>
                    <p className="mt-1 text-sm leading-relaxed text-brand-foreground/70">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10 pb-24 md:pb-16">
        <FadeIn>
          <ThreeChannelCta
            heading="Set up your schedule"
            subheading="Tell us your rhythm and we will lock in a window. Start with a single booking on the site, in the app, or on WhatsApp."
            waMessage="Hi Mckot, I'd like to set up a recurring scheduled pickup. Here is my routine:"
            bookLabel="Book a delivery"
          />
        </FadeIn>
      </Section>
    </>
  );
}
