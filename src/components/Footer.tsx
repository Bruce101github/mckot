import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-brand-dark py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-5">
        <div>
          <Image
            src="/logo-dark.svg"
            alt="Mckot"
            width={100}
            height={28}
            className="h-7 w-auto"
          />
          <p className="mt-3 max-w-xs text-sm text-brand-dark-foreground/60">
            Same-day delivery across Greater Accra. Send anything, anywhere:
            book on the site, in the app, or on WhatsApp.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-dark-foreground/40">
            Services
          </p>
          <ul className="mt-4 space-y-2 text-sm text-brand-dark-foreground/65">
            <li>
              <Link href="/services/same-day-delivery" className="transition hover:text-brand-accent">
                Same-day delivery
              </Link>
            </li>
            <li>
              <Link href="/services/parcel-delivery" className="transition hover:text-brand-accent">
                Parcel delivery
              </Link>
            </li>
            <li>
              <Link href="/services/document-delivery" className="transition hover:text-brand-accent">
                Document delivery
              </Link>
            </li>
            <li>
              <Link href="/services/business-delivery" className="transition hover:text-brand-accent">
                Business delivery
              </Link>
            </li>
            <li>
              <Link href="/services/scheduled-pickup" className="transition hover:text-brand-accent">
                Scheduled pickup
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="transition hover:text-brand-accent">
                Pricing
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-dark-foreground/40">
            Who we move for
          </p>
          <ul className="mt-4 space-y-2 text-sm text-brand-dark-foreground/65">
            <li>
              <Link href="/for/individuals" className="transition hover:text-brand-accent">
                Individuals
              </Link>
            </li>
            <li>
              <Link href="/for/small-business" className="transition hover:text-brand-accent">
                Small businesses
              </Link>
            </li>
            <li>
              <Link href="/for/companies" className="transition hover:text-brand-accent">
                Companies
              </Link>
            </li>
            <li>
              <Link href="/for/restaurants" className="transition hover:text-brand-accent">
                Restaurants
              </Link>
            </li>
            <li>
              <Link href="/for/pharmacies" className="transition hover:text-brand-accent">
                Pharmacies
              </Link>
            </li>
            <li>
              <Link href="/vendors" className="transition hover:text-brand-accent">
                Online vendors
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-dark-foreground/40">
            Company
          </p>
          <ul className="mt-4 space-y-2 text-sm text-brand-dark-foreground/65">
            <li>
              <Link href="/drive" className="transition hover:text-brand-accent">
                Drive with Mckot
              </Link>
            </li>
            <li>
              <Link href="/deliver" className="transition hover:text-brand-accent">
                Become a Rider
              </Link>
            </li>
            <li>
              <Link href="/become-a-fleet-partner" className="transition hover:text-brand-accent">
                For Fleet Partners
              </Link>
            </li>
            <li>
              <Link href="/coverage" className="transition hover:text-brand-accent">
                Coverage
              </Link>
            </li>
            <li>
              <Link href="/safety" className="transition hover:text-brand-accent">
                Safety
              </Link>
            </li>
            <li>
              <Link href="/blog" className="transition hover:text-brand-accent">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition hover:text-brand-accent">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-brand-accent">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="transition hover:text-brand-accent">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition hover:text-brand-accent">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/eula" className="transition hover:text-brand-accent">
                EULA
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-dark-foreground/40">
            Connect
          </p>
          <ul className="mt-4 space-y-2 text-sm text-brand-dark-foreground/65">
            <li>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-brand-accent"
              >
                WhatsApp Business
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.whatsappChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-brand-accent"
              >
                WhatsApp Channel
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-brand-accent"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-brand-accent"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-brand-accent"
              >
                TikTok
              </a>
            </li>
          </ul>
          <div className="mt-6 flex flex-col gap-2">
            <a
              href={siteConfig.app.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-dark-foreground/50 transition hover:text-brand-accent"
            >
              ↗ Google Play
            </a>
            <a
              href={siteConfig.app.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-dark-foreground/50 transition hover:text-brand-accent"
            >
              ↗ App Store
            </a>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl px-4 text-center text-xs text-brand-dark-foreground/30 sm:px-6">
        © {new Date().getFullYear()} Mckot. Accra, Ghana.
      </p>
    </footer>
  );
}
