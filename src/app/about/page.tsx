import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Mckot | Last-Mile Delivery Built in Accra",
  description:
    "Mckot is a registered Ghanaian logistics company built for social commerce vendors in Accra. Founded by someone who lived the delivery problem from both sides.",
  alternates: { canonical: `${siteConfig.url}/about` },
};

const beliefs = [
  {
    title: "Cash-on-delivery is not optional in Ghana",
    body: "Prepayment friction kills sales. We handle COD so vendors do not have to argue about it and buyers do not have to risk it.",
  },
  {
    title: "Riders are brand representatives",
    body: "When a rider shows up late or treats your customer like a nuisance, it reflects on your brand. Our riders are trained to show up on time and handle every parcel like it matters.",
  },
  {
    title: "WhatsApp is where Accra does business",
    body: "Not an app, not an email, not a web portal. WhatsApp. Our workflow starts and runs there.",
  },
  {
    title: "Transparency builds trust faster than marketing",
    body: "Tracking links, proof of delivery, and honest communication. We give your customer enough information that they never need to chase you.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-12 md:pt-16">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">About</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-brand-foreground md:text-5xl">
            Built beside vendors, not above them
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-foreground/70">
            Mckot is a registered Ghanaian logistics company. We do last-mile delivery for
            online vendors in Accra who sell through Instagram, TikTok, WhatsApp, and
            Facebook. We built this because the existing options were not working for them.
          </p>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">Founder note</h2>
          <div className="mt-6 max-w-2xl space-y-5 text-brand-foreground/75 leading-relaxed">
            <p>
              I started Mckot because I have lived the problem from both sides. As a shopper,
              I have stared at an Instagram boutique I wanted to buy from and walked away
              because I did not trust the vendor enough to prepay, and they did not have a
              delivery partner who would let me pay on arrival. The sale never happened.
            </p>
            <p>
              I have been on the other end too, where the delivery rider showed up late,
              argued with the customer, or just made the experience stressful enough that I
              wished I had not bothered.
            </p>
            <p>
              Online vendors in Accra are losing real money to a delivery problem that is not
              their fault. The product is good, the customer wants it, the seller is ready to
              ship, and then the logistics layer breaks the deal.
            </p>
            <p>
              Mckot is built to be the layer that does not break. Reliable cash-on-delivery
              handling so vendors do not have to argue about prepayment. Riders who treat the
              customer like a customer, not an inconvenience. A WhatsApp-native workflow
              because that is where Accra actually does business. We are the delivery partner
              I wished existed when I was the one waiting at the door.
            </p>
            <p className="text-sm font-semibold text-brand-foreground">
              Bruce Thiombiano, Founder, Mckot
            </p>
          </div>
        </FadeIn>
      </Section>

      <Section className="bg-brand-muted/10">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">What we believe</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {beliefs.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-brand-border bg-brand-surface/70 p-6"
              >
                <h3 className="font-semibold text-brand-foreground">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-foreground/65">{b.body}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section className="pb-24 md:pb-16">
        <FadeIn>
          <h2 className="text-2xl font-bold text-brand-foreground">Company</h2>
          <p className="mt-4 max-w-2xl text-brand-foreground/70">
            Mckot operates in Accra, Ghana. We cover Greater Accra today and are building
            toward Kumasi and Takoradi. We are a bootstrapped, registered Ghanaian business
            focused on making last-mile delivery work for the social commerce economy.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/#signup" variant="primary">
              Become a founding vendor
            </Button>
            <Button href="/contact" variant="secondary">
              Get in touch
            </Button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
