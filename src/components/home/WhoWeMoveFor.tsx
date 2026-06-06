import Link from "next/link";
import { User, Store, Building2, UtensilsCrossed, Pill, ShoppingBag, ArrowRight } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";

const segments = [
  {
    icon: User,
    title: "Individuals",
    body: "Send a parcel, drop documents, get a forgotten item to the office, or surprise someone with a gift across town.",
    href: "/for/individuals",
  },
  {
    icon: Store,
    title: "Businesses",
    body: "Shops, boutiques, offices, and repair shops. Package runs, supply pickups, and same-day customer drops.",
    href: "/for/small-business",
  },
  {
    icon: Building2,
    title: "Companies",
    body: "Account-based delivery, scheduled pickups, and multi-stop runs for teams with regular logistics needs.",
    href: "/for/companies",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants",
    body: "Supply runs, catering drops, and the extra deliveries your own riders cannot cover.",
    href: "/for/restaurants",
  },
  {
    icon: Pill,
    title: "Pharmacies",
    body: "Prescription delivery, medical supply runs, and sample drop-offs handled with care.",
    href: "/for/pharmacies",
  },
  {
    icon: ShoppingBag,
    title: "Online vendors",
    body: "Instagram, TikTok, and WhatsApp sellers. Pickup, cash-on-delivery, and Mobile Money settlement.",
    href: "/vendors",
  },
];

export function WhoWeMoveFor() {
  return (
    <Section>
      <FadeIn>
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
          Who we move for
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold text-brand-foreground md:text-4xl">
          If it needs to move in Accra, Mckot moves it
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-brand-foreground/65">
          One delivery layer for the whole city. Whoever you are and whatever
          you are sending, the booking is the same: book on the site, in the
          app, or on WhatsApp.
        </p>
      </FadeIn>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {segments.map((s, i) => {
          const Icon = s.icon;
          return (
            <FadeIn key={s.title} delay={i * 0.05}>
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-2xl border border-brand-border bg-brand-surface/80 p-6 transition-all hover:border-brand-accent/40 hover:shadow-soft"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-accent/15">
                  <Icon className="h-5 w-5 text-brand-accent" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-bold text-brand-foreground group-hover:text-brand-accent transition-colors">
                  {s.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-foreground/65">
                  {s.body}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent">
                  See how it works
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
