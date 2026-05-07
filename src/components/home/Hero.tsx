import Image from "next/image";
import { ArrowRight, Bike } from "lucide-react";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient pb-16 pt-12 md:pb-24 md:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
            Accra first. Africa next.
          </p>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-brand-foreground md:text-5xl lg:text-6xl">
            Logistics that scales with your business
          </h1>
          <p className="mt-6 max-w-xl text-lg text-brand-foreground/75 md:text-xl">
            Starting with last-mile delivery in Accra. Building the commerce platform for Africa&apos;s
            online sellers.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact#signup" variant="primary" icon={ArrowRight}>
              Get Started
            </Button>
            <Button href="/services#how-pricing" variant="secondary">
              How It Works
            </Button>
          </div>
          <p className="mt-8 text-sm text-brand-foreground/50">
            Selling on Instagram, TikTok, WhatsApp, or Facebook? We built Mckot for you.
          </p>
        </FadeIn>
        <FadeIn delay={0.12} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="animate-float relative aspect-[4/5] overflow-hidden rounded-3xl border border-brand-border shadow-glow md:aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80"
              alt="Motorcycle courier navigating city streets for deliveries"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-brand/80 p-4 backdrop-blur-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent/20">
                <Bike className="h-7 w-7 text-brand-accent" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-foreground">Live routing</p>
                <p className="text-xs text-brand-foreground/60">
                  Dispatch tuned for Accra traffic realities
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
