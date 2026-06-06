import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowRight } from "lucide-react";
import { siteConfig, waLink } from "@/lib/site";

type Props = {
  heading?: string;
  subheading?: string;
  // Pre-filled WhatsApp message. Always sent to the primary Mckot number.
  waMessage?: string;
  bookLabel?: string;
  className?: string;
};

const DEFAULT_WA = "Hi Mckot, I'd like to book a delivery.";

export function ThreeChannelCta({
  heading = "Three ways to book Mckot",
  subheading = "Pick whichever is easiest. Same riders, same coverage, same same-day delivery across Greater Accra.",
  waMessage = DEFAULT_WA,
  bookLabel = "Book a delivery",
  className,
}: Props) {
  return (
    <div
      className={`rounded-2xl border border-brand-accent/20 bg-brand-accent/5 p-8 md:p-10 ${className ?? ""}`}
    >
      <h2 className="text-2xl font-bold text-brand-foreground">{heading}</h2>
      <p className="mt-3 max-w-xl text-brand-foreground/70">{subheading}</p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          href={siteConfig.book}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent-hover"
        >
          {bookLabel}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <Link
          href={waLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-surface"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          WhatsApp us
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="text-sm text-brand-foreground/55">Or get the app:</span>
        <a
          href={siteConfig.app.playStore}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-75"
          aria-label="Get Mckot on Google Play"
        >
          <Image src="/badge-playstore.png" alt="Get it on Google Play" width={135} height={40} className="h-10 w-auto" />
        </a>
        <a
          href={siteConfig.app.appStore}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-75"
          aria-label="Download Mckot on the App Store"
        >
          <Image src="/badge-appstore.png" alt="Download on the App Store" width={120} height={40} className="h-10 w-auto" />
        </a>
      </div>
    </div>
  );
}
