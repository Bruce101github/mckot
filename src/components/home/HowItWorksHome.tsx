import { MessageCircle, Package, Bike } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";

const steps = [
  {
    step: "01",
    icon: MessageCircle,
    title: "Message Us on WhatsApp",
    body: "Send your order details: pickup address, customer address, and parcel description. No apps to download. No accounts to create.",
    detail: "Usually responds within 15 minutes",
  },
  {
    step: "02",
    icon: Bike,
    title: "We Pick Up From You",
    body: "A rider comes to your location within hours. We handle the handoff carefully so your packaging and branding stays intact.",
    detail: "Same-day pickup, every day",
  },
  {
    step: "03",
    icon: Package,
    title: "Customer Gets It Today",
    body: "Your customer receives a tracking link and their order the same day. You get delivery confirmation. No more chasing updates.",
    detail: "Tracking link sent to your customer",
  },
];

export function HowItWorksHome() {
  return (
    <Section id="how-it-works">
      <FadeIn>
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
          How it works
        </p>
        <h2 className="mt-3 text-balance text-3xl font-bold text-brand-foreground md:text-4xl">
          Three steps. Delivered today.
        </h2>
        <p className="mt-4 max-w-2xl text-brand-foreground/70">
          No complicated onboarding. No enterprise software. Just WhatsApp, your orders, and
          riders who know Accra.
        </p>
      </FadeIn>

      <div className="relative mt-14">
        <div
          className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-brand-accent/40 via-brand-accent/20 to-transparent md:left-1/2 md:block"
          aria-hidden
        />

        <div className="space-y-8 md:space-y-0">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isRight = i % 2 === 0;
            return (
              <FadeIn key={s.step} delay={i * 0.1}>
                <div
                  className={`relative flex items-start gap-6 md:grid md:grid-cols-2 md:gap-12 ${
                    isRight ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  <div
                    className={`relative rounded-2xl border border-brand-border bg-brand-surface/80 p-6 ${
                      isRight ? "md:text-right" : ""
                    }`}
                  >
                    <span className="text-5xl font-black text-brand-accent/15">{s.step}</span>
                    <h3 className="mt-2 text-xl font-semibold text-brand-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-brand-foreground/65">
                      {s.body}
                    </p>
                    <p className="mt-4 text-xs font-semibold text-brand-accent">{s.detail}</p>
                  </div>

                  <div className="flex items-center justify-center md:justify-start">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-brand-accent/30 bg-brand-accent/10">
                      <Icon className="h-8 w-8 text-brand-accent" aria-hidden />
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
