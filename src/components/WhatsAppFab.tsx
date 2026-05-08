import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={siteConfig.social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Mckot on WhatsApp"
      className="fixed bottom-6 right-5 z-50 hidden items-center gap-2.5 rounded-full border border-brand-accent/40 bg-brand-accent px-5 py-3.5 text-sm font-semibold text-brand shadow-glow transition-transform hover:scale-105 active:scale-95 md:inline-flex"
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      Chat on WhatsApp
    </a>
  );
}
