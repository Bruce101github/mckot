import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

const features = [
  {
    eyebrow: "Mobile first",
    headline: "Book a pickup in seconds",
    body: "Open the Mckot app, enter your pickup and drop-off addresses, add parcel details. Your rider is confirmed instantly — no calls, no waiting on hold.",
    bullets: [
      "Instant pickup confirmation",
      "Live rider tracking",
      "Full order history",
    ],
    image: "/photo-loading.png",
    imageAlt: "Mckot courier loading parcels for delivery",
    imageRight: true,
    bg: "",
    linesRotate: "-rotate-12",
    linesPos: "bottom-0 left-0",
  },
  {
    eyebrow: "Rider network",
    headline: "Riders who know every corner of Accra",
    body: "Our trained rider network covers all of Greater Accra. They arrive on time, handle your parcels carefully, and make sure your brand reputation stays intact.",
    bullets: [
      "Same-day pickup, every day",
      "Careful parcel handling",
      "Proof of delivery on every run",
    ],
    image: "/photo-rider.png",
    imageAlt: "Mckot rider on motorcycle speeding through Accra",
    imageRight: false,
    bg: "bg-brand-surface/50",
    linesRotate: "rotate-90",
    linesPos: "top-0 right-0",
  },
  {
    eyebrow: "Transparency",
    headline: "Your customers always know where their order is",
    body: "Every delivery comes with a real-time tracking link sent directly to your customer. No more 'where is my order?' messages eating into your selling time.",
    bullets: [
      "Shareable tracking link per delivery",
      "SMS and WhatsApp status updates",
      "Delivery confirmation with timestamp",
    ],
    image: "/photo-signing.png",
    imageAlt: "Mckot courier confirming delivery at the van",
    imageRight: true,
    bg: "",
    linesRotate: "rotate-180",
    linesPos: "bottom-0 right-0",
  },
];

export function WhyMckot() {
  return (
    <>
      {features.map((f) => (
        <section key={f.eyebrow} className={`relative overflow-hidden py-20 md:py-28 ${f.bg}`}>
          {/* Abstract line decoration — rotated differently per section */}
          <Image
            src="/abstract-lines.png"
            alt=""
            aria-hidden
            width={280}
            height={500}
            className={`pointer-events-none absolute ${f.linesPos} w-48 ${f.linesRotate} opacity-[0.05] select-none mix-blend-multiply lg:w-64`}
          />

          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div
              className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                !f.imageRight ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <FadeIn>
                <p className="text-sm font-semibold uppercase tracking-widest text-brand-dark/60">
                  {f.eyebrow}
                </p>
                <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-brand-foreground md:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
                  {f.headline}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-brand-foreground/65">
                  {f.body}
                </p>
                <ul className="mt-8 space-y-4">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
                      <span className="text-brand-foreground/80">{b}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="overflow-hidden rounded-3xl shadow-soft">
                  <Image
                    src={f.image}
                    alt={f.imageAlt}
                    width={640}
                    height={480}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
