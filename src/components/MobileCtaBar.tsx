import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-border bg-brand/95 p-3 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg gap-3">
        <Link
          href="/contact#signup"
          className="flex flex-1 items-center justify-center rounded-xl bg-brand-accent py-3 text-center text-sm font-semibold text-brand"
        >
          Get Started
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
