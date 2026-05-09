import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";

const screens = [
  {
    src: "/app-screens/home.png",
    caption: "Book any delivery",
    sub: "Send items, pickup, intercity and more — all from one screen.",
  },
  {
    src: "/app-screens/map.png",
    caption: "Set your route",
    sub: "Drop a pin or search any address across Greater Accra.",
  },
  {
    src: "/app-screens/speed.png",
    caption: "Pick your speed",
    sub: "Clear pricing upfront. No surprises when you confirm.",
  },
  {
    src: "/app-screens/tracking.png",
    caption: "Track in real time",
    sub: "Live map updates and courier details until it's delivered.",
  },
];

function PhoneMockup({
  src,
  alt,
  offset,
}: {
  src: string;
  alt: string;
  offset?: boolean;
}) {
  return (
    <div className={`relative w-[185px] shrink-0 sm:w-[210px] ${offset ? "mt-10" : ""}`}>
      {/* Outer frame */}
      <div className="relative overflow-hidden rounded-[3rem] border-[7px] border-neutral-800 bg-neutral-900 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)]">
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-3 z-10 h-[13px] w-[76px] -translate-x-1/2 rounded-full bg-neutral-900" />

        {/* Screen */}
        <div className="overflow-hidden rounded-[2.45rem]">
          <Image
            src={src}
            alt={alt}
            width={390}
            height={844}
            className="block w-full"
            sizes="210px"
          />
        </div>

        {/* Home indicator */}
        <div className="flex h-7 items-center justify-center bg-neutral-900">
          <div className="h-[5px] w-20 rounded-full bg-white/20" />
        </div>
      </div>

      {/* Reflection / glow under phone */}
      <div className="absolute -bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-brand-accent/10 blur-xl" />
    </div>
  );
}

export function AppScreensSection() {
  return (
    <section className="relative overflow-hidden bg-brand-dark py-20 md:py-28">
      {/* Abstract line decoration */}
      <Image
        src="/abstract-lines.png"
        alt=""
        aria-hidden
        width={280}
        height={500}
        className="pointer-events-none absolute -right-8 bottom-0 w-52 rotate-[210deg] opacity-10 select-none mix-blend-screen"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
              The app
            </p>
            <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-brand-dark-foreground md:text-4xl lg:text-[2.6rem]">
              See it in action
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-brand-dark-foreground/60">
              From booking to doorstep — the entire delivery flow in your pocket.
            </p>
          </div>
        </FadeIn>

        {/* Phone row */}
        <div className="mt-16 flex items-start justify-start gap-5 overflow-x-auto pb-8 sm:gap-6 md:justify-center md:overflow-visible md:pb-0">
          {screens.map((s, i) => (
            <FadeIn key={s.caption} delay={i * 0.09} className="flex shrink-0 flex-col items-center gap-6">
              <PhoneMockup src={s.src} alt={s.caption} offset={i % 2 === 1} />
              <div className="text-center">
                <p className="text-sm font-semibold text-brand-dark-foreground">
                  {s.caption}
                </p>
                <p className="mt-1 max-w-[160px] text-xs leading-relaxed text-brand-dark-foreground/45">
                  {s.sub}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
