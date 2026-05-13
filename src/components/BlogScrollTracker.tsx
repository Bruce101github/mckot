"use client";

import { useEffect } from "react";
import { trackBlogReadComplete } from "@/lib/analytics";

export function BlogScrollTracker({ slug }: { slug: string }) {
  useEffect(() => {
    let fired = false;

    function onScroll() {
      if (fired) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.body.scrollHeight;
      if (scrolled / total >= 0.75) {
        fired = true;
        trackBlogReadComplete(slug);
        window.removeEventListener("scroll", onScroll);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  return null;
}
