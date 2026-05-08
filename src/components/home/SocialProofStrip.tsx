import { FadeIn } from "@/components/FadeIn";

const platforms = ["Instagram", "TikTok", "Facebook", "WhatsApp", "Snapchat"];

const stats = [
  { value: "40+", label: "Active vendors" },
  { value: "Same-day", label: "Delivery promise" },
  { value: "7 zones", label: "Across Greater Accra" },
  { value: "GHS 0", label: "Subscription fee" },
];

export function SocialProofStrip() {
  return (
    <div className="border-y border-brand-border bg-brand-muted/15 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-foreground/45">
            Built for sellers on
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {platforms.map((p) => (
              <span
                key={p}
                className="text-sm font-semibold text-brand-foreground/55"
              >
                {p}
              </span>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-brand-accent md:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs text-brand-foreground/55">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
