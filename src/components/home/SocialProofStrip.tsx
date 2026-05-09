import { FadeIn } from "@/components/FadeIn";

const stats = [
  { value: "40+", label: "Active vendors" },
  { value: "Same-day", label: "Delivery promise" },
  { value: "7", label: "Coverage zones" },
  { value: "GHS 0", label: "Subscription fee" },
];

const platforms = [
  "Instagram",
  "TikTok",
  "Facebook",
  "WhatsApp",
  "Snapchat",
  "X",
  "YouTube",
  "Pinterest",
];

export function SocialProofStrip() {
  const doubled = [...platforms, ...platforms];

  return (
    <div className="border-y border-brand-border">
      <FadeIn>
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:grid-cols-4 sm:px-6">
          {stats.map((s) => (
            <div key={s.label} className="border-r border-brand-border px-6 py-12 text-center last:border-r-0 [&:nth-child(2)]:border-r-0 sm:[&:nth-child(2)]:border-r">
              <p className="text-4xl font-black text-brand-foreground md:text-5xl">{s.value}</p>
              <p className="mt-2 text-sm text-brand-foreground/50">{s.label}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <div className="border-t border-brand-border py-5 overflow-hidden">
        <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-foreground/35">
          Built for sellers on
        </p>
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee gap-16 whitespace-nowrap">
            {doubled.map((p, i) => (
              <span key={i} className="shrink-0 text-sm font-semibold text-brand-foreground/35">
                {p}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </div>
  );
}
