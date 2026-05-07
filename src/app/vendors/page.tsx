import type { Metadata } from "next";
import { MessageCircle, ShoppingBag, Sparkles } from "lucide-react";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "For Vendors",
  description:
    "Delivery built for Instagram, TikTok, WhatsApp, and Facebook sellers in Accra. Plug into workflows buyers already use.",
};

export default function VendorsPage() {
  return (
    <>
      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">For vendors</p>
          <h1 className="mt-4 text-4xl font-bold text-brand-foreground md:text-5xl">
            Ship where your customers already chat
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Your storefront lives in Stories and DMs. Mckot plugs into that rhythm with pickups, tracking
            snippets, and rider vibes that match your brand tone.
          </p>
        </FadeIn>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: ShoppingBag,
              title: "Drop-day friendly",
              body: "Batch pickups around launches so you are not negotiating random courier timing mid-live.",
            },
            {
              icon: MessageCircle,
              title: "WhatsApp-native updates",
              body: "Buyers get crisp messages they trust. You stay out of endless ping pong.",
            },
            {
              icon: Sparkles,
              title: "Space for storytelling",
              body: "Custom tags and light branding options so parcels feel like part of your drop, not generic mail.",
            },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.07}>
              <Card className="h-full">
                <item.icon className="h-10 w-10 text-brand-accent" aria-hidden />
                <h2 className="mt-6 text-xl font-semibold text-brand-foreground">{item.title}</h2>
                <p className="mt-3 text-sm text-brand-foreground/65">{item.body}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-brand-muted/10 pb-24 md:pb-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-brand-foreground">Vendor spotlight</h2>
            <p className="mt-4 text-brand-foreground/70">
              Replace this block with your first case study. Drop in metrics like reduced refund requests,
              faster repeat purchases, or happier creators tagging your packaging on TikTok.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-brand-foreground/80">
              <li>Placeholder metric: 32% fewer where-is-my-order messages.</li>
              <li>Placeholder metric: pickups aligned within 25 minutes of request.</li>
            </ul>
            <Button href="/contact#signup" variant="primary" className="mt-8">
              Become the next story
            </Button>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Card className="min-h-[280px] border-brand-accent/25 bg-brand-surface/50">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
                Coming soon
              </p>
              <p className="mt-4 text-lg font-medium text-brand-foreground">Photo or reel embed area</p>
              <p className="mt-2 text-sm text-brand-foreground/60">
                Swap this card with a Ghana-shot portrait of a vendor handing a branded parcel to a rider.
              </p>
            </Card>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
