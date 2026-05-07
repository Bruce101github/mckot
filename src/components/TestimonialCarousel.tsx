"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/Card";

const items = [
  {
    quote:
      "Customers stopped asking where their parcel is. Mckot shows tracking without me juggling ten chats.",
    name: "Ama K.",
    role: "Skincare vendor, Osu",
  },
  {
    quote:
      "Same-day handoffs mean my TikTok drops actually convert. Riders show up like clockwork.",
    name: "Kwame L.",
    role: "Streetwear seller, East Legon",
  },
  {
    quote:
      "Rates make sense for small batches. I scale weekly runs instead of praying for a random courier.",
    name: "Naa O.",
    role: "Home bakery, Tema",
  },
];

export function TestimonialCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 6500);
    return () => clearInterval(t);
  }, []);

  const prev = () => setI((v) => (v - 1 + items.length) % items.length);
  const next = () => setI((v) => (v + 1) % items.length);

  return (
    <Card className="relative overflow-hidden">
      <Quote className="absolute right-6 top-6 h-10 w-10 text-brand-accent/25" aria-hidden />
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35 }}
        >
          <p className="text-lg font-medium leading-relaxed text-brand-foreground md:text-xl">
            &ldquo;{items[i].quote}&rdquo;
          </p>
          <p className="mt-6 text-sm font-semibold text-brand-accent">{items[i].name}</p>
          <p className="text-sm text-brand-foreground/55">{items[i].role}</p>
        </motion.div>
      </AnimatePresence>
      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`h-2 w-8 rounded-full transition ${
                idx === i ? "bg-brand-accent" : "bg-brand-border"
              }`}
              onClick={() => setI(idx)}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prev}
            className="rounded-lg border border-brand-border p-2 hover:border-brand-accent/50"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="rounded-lg border border-brand-border p-2 hover:border-brand-accent/50"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Card>
  );
}
