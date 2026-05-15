import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { GooglePlayIcon } from "@/components/GooglePlayIcon";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <Image
        src="/abstract-lines.png"
        alt=""
        aria-hidden
        width={340}
        height={600}
        className="pointer-events-none absolute -right-16 -top-20 w-64 rotate-12 opacity-[0.06] select-none mix-blend-multiply lg:w-80"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-accent/15 px-3.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" aria-hidden />
              <span className="text-xs font-semibold text-brand-foreground/70">
                Now onboarding founding vendors in Accra
              </span>
            </div>

            <h1 className="mt-5 text-[2.75rem] font-extrabold leading-[1.08] tracking-tight text-brand-foreground md:text-5xl lg:text-[3.5rem]">
              Same-day delivery
              <br />
              for Accra vendors.
            </h1>

            <p className="mt-5 max-w-md text-lg leading-relaxed text-brand-foreground/65">
              Book a pickup from the app. We collect, deliver, and handle cash-on-delivery.
              Your customer gets a live tracking link. You get paid.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover"
              >
                Get 3 free deliveries
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-brand-border bg-brand-surface px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:border-brand-accent/40"
              >
                Chat on WhatsApp
              </Link>
            </div>

            <p className="mt-4 text-xs text-brand-foreground/40">
              First 3 deliveries free in your first 30 days. No subscription. No commitment.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={siteConfig.app.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-md bg-brand-dark px-3 text-white transition-opacity hover:opacity-85"
                aria-label="Download Mckot on Google Play"
              >
                <GooglePlayIcon size={18} />
                <span className="flex flex-col leading-none">
                  <span className="text-[8px] uppercase tracking-wider text-white/75">Get it on</span>
                  <span className="-mt-0.5 text-[13px] font-semibold tracking-tight">Google Play</span>
                </span>
              </a>
              <a
                href={siteConfig.app.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-75"
                aria-label="Download Mckot on the App Store"
              >
                <Image src="/badge-appstore.png" alt="Download on the App Store" width={120} height={40} className="h-9 w-auto" />
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="animate-float relative mx-auto max-w-xs overflow-hidden rounded-[2.5rem] border border-brand-border shadow-soft" style={{ aspectRatio: "9/16" }}>
              <Image
                src="/photo-rider.png"
                alt="Mckot rider on motorcycle delivering across Accra, Ghana"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/10 to-transparent" />

              <div className="absolute bottom-6 left-4 right-4 rounded-2xl border border-white/10 bg-brand-dark/85 p-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-accent/20 text-base">
                    📦
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-brand-dark-foreground">
                      Order on the way
                    </p>
                    <p className="text-xs text-brand-dark-foreground/55">
                      Rider 3 mins away &middot; East Legon
                    </p>
                  </div>
                  <span className="ml-auto shrink-0 rounded-full bg-brand-accent px-2.5 py-0.5 text-xs font-bold text-brand-dark">
                    Live
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 top-10 hidden rounded-xl border border-brand-border bg-white px-4 py-3 shadow-soft lg:block">
              <p className="text-xl font-bold text-brand-accent">Same day</p>
              <p className="text-xs text-brand-foreground/55">Pickup and delivery</p>
            </div>
            <div className="absolute -right-4 bottom-28 hidden rounded-xl border border-brand-border bg-white px-4 py-3 shadow-soft lg:block">
              <p className="text-xl font-bold text-brand-accent">COD</p>
              <p className="text-xs text-brand-foreground/55">We collect for you</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
