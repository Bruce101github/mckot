"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/site";

const faqs = [
  {
    q: "How fast is pickup after I send an order?",
    a: "Most pickups happen within 2 to 3 hours of your WhatsApp message. For recurring vendors, we set fixed pickup windows that fit your packing routine so you never need to chase us.",
  },
  {
    q: "What areas of Accra do you cover?",
    a: "We cover East Legon, Osu, Cantonments, Ridge, Madina, Adenta, Spintex, Tema Communities 1 to 12, Circle, Lapaz, Achimota, Kwashieman, Dansoman, and Weija. Check the coverage page for the full map.",
  },
  {
    q: "How does cash-on-delivery work?",
    a: "Your customer pays cash to our rider at the door. We collect, reconcile the total, and transfer the amount to your Mobile Money account the same day. No chasing customers for payment.",
  },
  {
    q: "How do I pay for deliveries?",
    a: "We support Mobile Money (MTN MoMo and Vodafone Cash) and bank transfer. Pay per delivery or settle a weekly invoice for high volumes. No cash required from you.",
  },
  {
    q: "Is there a minimum number of orders?",
    a: "No minimum. You can book a single delivery or fifty a day. Vendors sending 5 or more orders per day get discounted bulk rates automatically.",
  },
  {
    q: "How does my customer track their order?",
    a: "After pickup, your customer receives a tracking link via SMS or WhatsApp showing real-time order status. You can also share the link yourself from your vendor dashboard in the app.",
  },
  {
    q: "How do I book a delivery?",
    a: "Download the free Mckot app on Android or iOS and book directly. You can also message us on WhatsApp. The app gives you real-time tracking, order history, and batch scheduling.",
  },
  {
    q: "What happens if a package is lost or damaged?",
    a: "Every delivery includes proof of delivery. If something goes wrong, we have a structured claims process and resolve most issues within 24 hours. We take full accountability for what is in our hands.",
  },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-brand-border last:border-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-brand-foreground hover:text-brand-accent"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-brand-accent transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-brand-foreground/65">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  return (
    <Section id="faq" className="bg-brand-muted/10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-dark/60">
            FAQ
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-brand-foreground md:text-4xl">
            Questions vendors ask
          </h2>
          <p className="mt-4 text-brand-foreground/70">
            Everything you need to know before your first pickup. Still have questions?{" "}
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-accent underline-offset-2 hover:underline"
            >
              Ask us on WhatsApp.
            </a>
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-10 rounded-2xl border border-brand-border bg-brand-surface/60 px-6">
          {faqs.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </FadeIn>
      </div>
    </Section>
  );
}
