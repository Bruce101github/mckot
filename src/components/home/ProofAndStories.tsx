import Link from "next/link";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/site";
import { MessageCircle, CheckCircle2 } from "lucide-react";

const vendorTypes = [
  { emoji: "💄", label: "Skincare" },
  { emoji: "👗", label: "Fashion" },
  { emoji: "🥧", label: "Food vendors" },
  { emoji: "📱", label: "Tech accessories" },
  { emoji: "👟", label: "Streetwear" },
  { emoji: "🌸", label: "Home decor" },
];

const built = [
  "Registered Ghanaian business (Mckot Meridian Ltd)",
  "Active riders covering Greater Accra today",
  "Cash-on-delivery handled every run",
  "A founder who answers WhatsApp himself",
];

export function ProofAndStories() {
  return (
    <Section id="testimonials" className="bg-brand-muted/10">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-dark/60">
            Founding vendors
          </p>
          <h2 className="mt-3 text-3xl font-bold text-brand-foreground md:text-4xl">
            Be one of our first 50 vendors
          </h2>
          <p className="mt-4 text-brand-foreground/70">
            We are onboarding founding vendors right now across Accra. Get 3 free deliveries
            in your first 30 days and help shape the service.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {vendorTypes.map((v) => (
              <span
                key={v.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-brand-surface/70 px-3 py-1.5 text-xs font-medium text-brand-foreground/70"
              >
                <span>{v.emoji}</span>
                {v.label}
              </span>
            ))}
          </div>

          <Link
            href={siteConfig.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Claim your spot on WhatsApp
          </Link>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="rounded-2xl border border-brand-border bg-brand-surface/60 p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-accent">
              What we have built
            </p>
            <p className="mt-3 text-lg font-semibold text-brand-foreground">
              We do not have customer testimonials yet. Here is what we can tell you instead.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brand-foreground/65">
              Mckot is a registered Ghanaian business, built by a founder who has been the
              frustrated buyer waiting at the door. This service was designed around the
              specific problems that kill Accra social commerce sales: prepayment distrust,
              unreliable riders, and customers left in the dark.
            </p>
            <ul className="mt-6 space-y-3">
              {built.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-foreground/80">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-brand-foreground/50">
              Be one of our first 50 vendors and see for yourself. We will feature your
              story on this page two weeks after your first delivery.
            </p>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
