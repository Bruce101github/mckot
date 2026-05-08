"use client";

import { useEffect, useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/Button";

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("exit_dismissed")) return;

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 10) {
        setVisible(true);
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 8000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem("exit_dismissed", "1");
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={dismiss}
            aria-hidden
          />
          <motion.div
            key="popup"
            role="dialog"
            aria-modal="true"
            aria-label="Special offer"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-[70] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-brand-accent/30 bg-brand p-8 shadow-glow"
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close offer"
              className="absolute right-4 top-4 rounded-lg p-1.5 text-brand-foreground/40 hover:text-brand-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <p className="text-4xl">🎁</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-widest text-brand-accent">
                Wait. Special offer
              </p>
              <h2 className="mt-2 text-2xl font-bold text-brand-foreground">
                50% off your first 10 deliveries
              </h2>
              <p className="mt-3 text-sm text-brand-foreground/65">
                Sign up today and we apply the discount automatically. No code needed. Only
                for vendors who join this week.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <Button href="#signup" variant="primary" icon={ArrowRight} className="w-full justify-center" >
                  Claim 50% off now
                </Button>
                <button
                  type="button"
                  onClick={dismiss}
                  className="text-sm text-brand-foreground/40 hover:text-brand-foreground"
                >
                  No thanks, I will pay full price
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
