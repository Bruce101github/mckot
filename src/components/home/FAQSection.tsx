"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";

const faqs = [
  {
    q: "How fast is pickup after I send an order?",
    a: "Most pickups happen within 2 to 3 hours of your WhatsApp message. For recurring vendors, we can schedule fixed pickup windows that fit your packing routine.",
  },
  {
    q: "What areas of Accra do you cover?",
    a: "We currently cover East Legon, Osu, Cantonments, Ridge, Madina, Adenta, Spintex, Tema Communities 1 to 12, Circle, Lapaz, Achimota, Kwashieman, Dansoman, and Weija. Check our coverage page for the full map.",
  },
  {
    q: "How do I pay for deliveries?",
    a: "We support Mobile Money (MTN MoMo and Vodafone Cash) and bank transfer. You can pay per delivery or settle a weekly invoice if you have high volume. No cash required.",
  },
  {
    q: "Is there a minimum number of orders?",
    a: "No minimums. You can book a single delivery or fifty a day. We do offer discounted batch rates for vendors sending 5 or more orders per day.",
  },
  {
    q: "How does the customer tracking work?",
    a: "After pickup, your customer receives a tracking link via SMS or WhatsApp showing their order status in real time. You can also share the link yourself from your vendor dashboard.",
  },
  {
    q: "What if my package is lost or damaged?",
    a: "Every delivery includes proof of delivery. If something goes wrong, we have a structured claims process and most issues are resolved within 24 hours. We take accountability seriously.",
  },
  {
    q: "Do I need to download an app?",
    a: "No app required to get started. Booking happens entirely over WhatsApp. A lightweight vendor dashboard is available for tracking and invoices.",
  },
];

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
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
            FAQ
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-brand-foreground md:text-4xl">
            Questions vendors ask
          </h2>
          <p className="mt-4 text-brand-foreground/70">
            Everything you need to know before your first pickup. Still have questions?{" "}
            <a
              href="#signup"
              className="font-semibold text-brand-accent underline-offset-2 hover:underline"
            >
              WhatsApp us directly.
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
