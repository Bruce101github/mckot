"use client";

import { useEffect } from "react";
import { trackPricingView } from "@/lib/analytics";

export function PricingViewTracker() {
  useEffect(() => {
    trackPricingView();
  }, []);
  return null;
}
