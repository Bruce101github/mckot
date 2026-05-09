import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-brand-dark py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <Image
            src="/logo-dark.svg"
            alt="Mckot"
            width={100}
            height={28}
            className="h-7 w-auto"
          />
          <p className="mt-3 max-w-xs text-sm text-brand-dark-foreground/60">
            Last-mile delivery and commerce tooling built with vendors in Accra.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-dark-foreground/40">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm text-brand-dark-foreground/65">
            <li>
              <Link href="/services" className="transition hover:text-brand-accent">
                Services
              </Link>
            </li>
            <li>
              <Link href="/vendors" className="transition hover:text-brand-accent">
                For Vendors
              </Link>
            </li>
            <li>
              <Link href="/coverage" className="transition hover:text-brand-accent">
                Coverage
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
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-brand-accent"
              >
                Instagram
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
