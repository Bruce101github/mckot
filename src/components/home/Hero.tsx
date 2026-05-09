"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/site";

export function Hero() {
  const emailRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Abstract lines — top-right, very subtle */}
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
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-brand-accent text-brand-accent" />
                ))}
              </div>
              <span className="text-xs font-semibold text-brand-foreground/70">
                Trusted by 40+ vendors in Accra
              </span>
            </div>

            <h1 className="mt-5 text-[2.75rem] font-extrabold leading-[1.08] tracking-tight text-brand-foreground md:text-5xl lg:text-[3.5rem]">
              Deliver for your
              <br />
              customers. Today.
            </h1>

            <p className="mt-5 max-w-md text-lg leading-relaxed text-brand-foreground/65">
              Last-mile delivery for social commerce vendors in Accra. Book from
              the app — we handle the rest.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                ref={emailRef}
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xl border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-foreground outline-none placeholder:text-brand-foreground/40 transition focus:border-brand-accent focus:bg-white"
                required
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-accent px-5 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover"
              >
                Start free
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-3 text-xs text-brand-foreground/40">
              Free to start. No subscription. Cancel anytime.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={siteConfig.app.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-75"
                aria-label="Download on Google Play"
              >
                <Image src="/badge-playstore.png" alt="Get it on Google Play" width={135} height={40} className="h-9 w-auto" />
              </a>
              <a
                href={siteConfig.app.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-75"
                aria-label="Download on the App Store"
              >
                <Image src="/badge-appstore.png" alt="Download on the App Store" width={120} height={40} className="h-9 w-auto" />
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="animate-float relative mx-auto max-w-xs overflow-hidden rounded-[2.5rem] border border-brand-border shadow-soft" style={{ aspectRatio: "9/16" }}>
              <Image
                src="/photo-rider.png"
                alt="Mckot rider on motorcycle delivering across Accra"
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
                      Rider 3 mins away · East Legon
                    </p>
                  </div>
                  <span className="ml-auto shrink-0 rounded-full bg-brand-accent px-2.5 py-0.5 text-xs font-bold text-brand-dark">
                    Live
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 top-10 hidden rounded-xl border border-brand-border bg-white px-4 py-3 shadow-soft lg:block">
              <p className="text-xl font-bold text-brand-accent">40+</p>
              <p className="text-xs text-brand-foreground/55">Active vendors</p>
            </div>
            <div className="absolute -right-4 bottom-28 hidden rounded-xl border border-brand-border bg-white px-4 py-3 shadow-soft lg:block">
              <p className="text-xl font-bold text-brand-accent">Same day</p>
              <p className="text-xs text-brand-foreground/55">Delivery</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
