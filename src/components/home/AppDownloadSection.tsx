import Image from "next/image";
import { Smartphone } from "lucide-react";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { StoreButtons } from "@/components/StoreButtons";

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
            in real time, manage your orders, and grow your business, all from your pocket.
          </p>
        </div>

        <StoreButtons variant="onDark" className="mt-12 justify-center" />

        <p className="mt-8 text-center text-xs text-brand-dark-foreground/40">
          Free to download. Android and iOS. Works on all devices.
        </p>
      </FadeIn>
    </Section>
  );
}
