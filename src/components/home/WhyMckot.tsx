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
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Person booking a delivery on mobile phone",
    imageRight: true,
    bg: "",
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
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Courier rider on motorcycle in city",
    imageRight: false,
    bg: "bg-brand-surface/50",
  },
  {
    eyebrow: "Transparency",
    headline: "Your customers always know where their order is",
    body: "Every delivery comes with a real-time tracking link we send directly to your customer. No more 'where is my order?' messages eating into your selling time.",
    bullets: [
      "Shareable tracking link per delivery",
      "SMS and WhatsApp status updates",
      "Delivery confirmation with timestamp",
    ],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Real-time delivery tracking interface",
    imageRight: true,
    bg: "",
  },
];

export function WhyMckot() {
  return (
    <>
      {features.map((f) => (
        <section key={f.eyebrow} className={`py-20 md:py-28 ${f.bg}`}>
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
