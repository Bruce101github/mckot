"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function MobileCtaBar() {
  // Hidden by default. On pages with the hero CTAs (`#hero-cta`), reveal the
  // bar only once those buttons scroll out of view so the two don't overlap.
  // On pages without that anchor (inner pages), show it straight away.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("hero-cta");
    if (!target) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-brand-border bg-brand/95 p-3 backdrop-blur-md transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-lg gap-3">
        <Link
          href="/ride"
          className="flex flex-1 items-center justify-center rounded-xl bg-brand-accent py-3 text-center text-sm font-semibold text-brand"
        >
          Book a delivery
        </Link>
        <Link
          href={siteConfig.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-accent/50 py-3 text-sm font-semibold text-brand-accent"
          aria-label="Open WhatsApp chat with Mckot"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          WhatsApp
        </Link>
      </div>
    </div>
  );
}
