"use client";

import { useEffect } from "react";
import { trackWhatsAppClick } from "@/lib/analytics";

export function AnalyticsInit() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as Element).closest("a");
      if (!target) return;
      const href = target.getAttribute("href") || "";
      if (href.includes("wa.me") || href.includes("whatsapp.com") || href.includes("api.whatsapp")) {
        const section =
          target.closest("[data-section]")?.getAttribute("data-section") ??
          document.title;
        trackWhatsAppClick(section);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
