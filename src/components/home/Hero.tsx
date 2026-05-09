import Image from "next/image";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/site";

const trustPoints = [
  "Book pickups in seconds from our free mobile app",
  "Same-day delivery across Greater Accra",
  "Real-time tracking link sent to every customer",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-brand-dark pb-16 pt-10 md:pb-24 md:pt-16"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <FadeIn>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-accent/40 bg-brand-accent/15 px-4 py-1.5">
            <Zap className="h-3.5 w-3.5 text-brand-accent" aria-hidden />
            <span className="text-sm font-semibold text-brand-accent">
              Pre-launch special pricing
            </span>
          </div>

          <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-brand-dark-foreground md:text-5xl lg:text-[3.35rem] lg:leading-[1.1]">
            Stop Losing Sales Because of Delivery Problems
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-dark-foreground/75">
            Mckot handles last-mile delivery for Instagram, TikTok, Facebook, and WhatsApp
            sellers in Accra. Book pickups from our app. Your customers get their orders today.
          </p>

          <ul className="mt-7 space-y-3" aria-label="Key benefits">
            {trustPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-sm text-brand-dark-foreground/80"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent"
                  aria-hidden
                />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#signup" variant="primary" icon={ArrowRight}>
              Start Delivering in 24 Hours
            </Button>
            <Button
              href="#how-it-works"
              variant="secondary"
              className="border-white/20 bg-white/10 text-brand-dark-foreground hover:bg-white/15 hover:border-white/30"
            >
              See How It Works
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={siteConfig.app.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              aria-label="Download on Google Play"
            >
              <Image
                src="/badge-playstore.png"
                alt="Get it on Google Play"
                width={135}
                height={40}
                className="h-10 w-auto"
              />
            </a>
            <a
              href={siteConfig.app.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              aria-label="Download on the App Store"
            >
              <Image
                src="/badge-appstore.png"
                alt="Download on the App Store"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </a>
          </div>

          <p className="mt-5 text-xs text-brand-dark-foreground/45">
            Already serving: skincare vendors, streetwear sellers, home bakers, phone accessory
            shops, and more across Accra.
          </p>
        </FadeIn>

        <FadeIn delay={0.12} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="animate-float relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 shadow-glow md:aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80"
              alt="Mckot rider on motorcycle ready for delivery in Accra"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />

            <div className="absolute bottom-5 left-4 right-4 rounded-2xl border border-white/10 bg-brand-dark/85 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-accent/20 text-lg">
                  📦
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-brand-dark-foreground">
                    Order delivered
                  </p>
                  <p className="text-xs text-brand-dark-foreground/60">East Legon, 2h 14m ago</p>
                </div>
                <span className="ml-auto shrink-0 rounded-full bg-brand-accent/20 px-2.5 py-0.5 text-xs font-semibold text-brand-accent">
                  Done
                </span>
              </div>
            </div>
          </div>

          <div className="absolute -right-3 top-10 hidden rounded-2xl border border-white/10 bg-brand-dark-surface/95 px-4 py-3 shadow-glow/40 lg:block">
            <p className="text-2xl font-bold text-brand-accent">40+</p>
            <p className="text-xs text-brand-dark-foreground/65">Vendors active</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
