import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-muted/20 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-brand-foreground">{siteConfig.name}</p>
          <p className="mt-2 max-w-xs text-sm text-brand-foreground/65">
            Last-mile delivery and commerce tooling built with vendors in Accra.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm text-brand-foreground/75">
            <li>
              <Link href="/services" className="hover:text-brand-accent">
                Services
              </Link>
            </li>
            <li>
              <Link href="/vendors" className="hover:text-brand-accent">
                For Vendors
              </Link>
            </li>
            <li>
              <Link href="/coverage" className="hover:text-brand-accent">
                Coverage
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            Company
          </p>
          <ul className="mt-4 space-y-2 text-sm text-brand-foreground/75">
            <li>
              <Link href="/about" className="hover:text-brand-accent">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-accent">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            Connect
          </p>
          <ul className="mt-4 space-y-2 text-sm text-brand-foreground/75">
            <li>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-accent"
              >
                WhatsApp Business
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-accent"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl px-4 text-center text-xs text-brand-foreground/45 sm:px-6">
        © {new Date().getFullYear()} Mckot. Accra, Ghana.
      </p>
    </footer>
  );
}
