import Image from "next/image";
import { Smartphone, Package, Bike } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";

const steps = [
  {
    step: "01",
    icon: Smartphone,
    title: "Download the App",
    body: "Get the Mckot app free on the App Store or Google Play. Create your vendor account in 2 minutes. No paperwork, no waiting.",
    detail: "Free to download",
  },
  {
    step: "02",
    icon: Package,
    title: "Book Your Pickup",
    body: "Open the app and enter your pickup address, customer address, and parcel details. We confirm your pickup instantly.",
    detail: "Pickup confirmed in minutes",
  },
  {
    step: "03",
    icon: Bike,
    title: "We Deliver It Today",
    body: "Our rider collects from you and delivers to your customer the same day. They get a live tracking link. You get delivery confirmation.",
    detail: "Same-day to your customer",
  },
];

export function HowItWorksHome() {
  return (
    <Section id="how-it-works" className="relative overflow-hidden bg-brand-dark">
      {/* Abstract lines, on dark use screen blend */}
      <Image
        src="/abstract-lines.png"
        alt=""
        aria-hidden
        width={300}
        height={540}
        className="pointer-events-none absolute -bottom-16 -left-12 w-56 -rotate-45 opacity-10 select-none mix-blend-screen"
      />
      <FadeIn>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
            How it works
          </p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-brand-dark-foreground md:text-4xl lg:text-[2.6rem]">
            Three steps. Delivered today.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-brand-dark-foreground/60">
            Download the app, book your pickup, and we take care of the rest.
          </p>
        </div>
      </FadeIn>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <FadeIn key={s.step} delay={i * 0.08}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-accent/30 bg-brand-accent/10">
                  <Icon className="h-6 w-6 text-brand-accent" aria-hidden />
                </div>
                <p className="mt-6 text-5xl font-black text-brand-accent/20">{s.step}</p>
                <h3 className="mt-2 text-xl font-bold text-brand-dark-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-dark-foreground/60">
                  {s.body}
                </p>
                <p className="mt-5 text-xs font-semibold text-brand-accent">{s.detail}</p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
