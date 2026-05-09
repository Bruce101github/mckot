import Image from "next/image";
import { Smartphone } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/site";

export function AppDownloadSection() {
  return (
    <Section id="download" className="relative overflow-hidden bg-brand-dark">
      <Image
        src="/abstract-lines.png"
        alt=""
        aria-hidden
        width={300}
        height={540}
        className="pointer-events-none absolute -right-10 -top-10 w-52 rotate-[135deg] opacity-10 select-none mix-blend-screen"
      />
      <FadeIn>
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-accent/30 bg-brand-accent/15">
            <Smartphone className="h-7 w-7 text-brand-accent" aria-hidden />
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-brand-accent">
            Mobile app
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-brand-dark-foreground md:text-4xl">
            Book deliveries from your phone
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-dark-foreground/70">
            The Mckot app is the fastest way to send parcels across Accra. Track every delivery
            in real time, manage your orders, and grow your business — from your pocket.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <a
            href={siteConfig.app.playStore}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full max-w-xs items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 transition-all hover:border-brand-accent/40 hover:bg-white/10 sm:w-auto"
            aria-label="Download Mckot on Google Play"
          >
            <Image
              src="/badge-playstore.png"
              alt="Google Play"
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-lg object-contain"
            />
            <div className="text-left">
              <p className="text-xs text-brand-dark-foreground/55">Available on</p>
              <p className="text-base font-semibold text-brand-dark-foreground">Google Play</p>
            </div>
          </a>

          <a
            href={siteConfig.app.appStore}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full max-w-xs items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 transition-all hover:border-brand-accent/40 hover:bg-white/10 sm:w-auto"
            aria-label="Download Mckot on the App Store"
          >
            <Image
              src="/badge-appstore.png"
              alt="App Store"
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-lg object-contain"
            />
            <div className="text-left">
              <p className="text-xs text-brand-dark-foreground/55">Available on</p>
              <p className="text-base font-semibold text-brand-dark-foreground">App Store</p>
            </div>
          </a>
        </div>

        <p className="mt-8 text-center text-xs text-brand-dark-foreground/40">
          Free to download. Android and iOS. Works on all devices.
        </p>
      </FadeIn>
    </Section>
  );
}
