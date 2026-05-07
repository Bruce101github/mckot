"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/vendors", label: "For Vendors" },
  { href: "/coverage", label: "Coverage" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border/80 bg-brand/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-brand-foreground"
          aria-label="Mckot home"
        >
          <span className="text-brand-accent">{siteConfig.name.slice(0, 1)}</span>
          {siteConfig.name.slice(1)}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-brand-foreground/75 transition hover:text-brand-accent",
                pathname === item.href && "text-brand-accent",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={siteConfig.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-brand-accent px-4 py-2 text-sm font-semibold text-brand hover:bg-brand-accent-hover"
          >
            WhatsApp
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-brand-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-brand-border bg-brand md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-3 text-base font-medium text-brand-foreground/90 hover:bg-brand-muted/40"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={siteConfig.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 rounded-xl bg-brand-accent px-4 py-3 text-center font-semibold text-brand"
            onClick={() => setOpen(false)}
          >
            Chat on WhatsApp
          </Link>
        </nav>
      </div>
    </header>
  );
}
