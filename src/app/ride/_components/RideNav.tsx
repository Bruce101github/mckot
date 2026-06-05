"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileMenu } from "./ProfileMenu";

const TABS = [
  { href: "/ride", label: "Ride" },
  { href: "/ride/activity", label: "Activity" },
];

export function RideNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/ride" ? pathname === "/ride" : pathname.startsWith(href);

  // Close the mobile menu on outside click / Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 shrink-0 border-b border-brand-border bg-white/95 shadow-soft backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3 md:gap-8">
          <Link href="/ride" aria-label="Mckot home" className="flex items-center">
            <Image src="/logo-light.svg" alt="Mckot" width={110} height={31} className="h-8 w-auto" priority />
          </Link>

          {/* Desktop inline nav — hidden on mobile */}
          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "text-sm font-medium text-brand-foreground/65 transition hover:text-brand-foreground",
                  isActive(tab.href) && "text-brand-foreground",
                )}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ProfileMenu />

          {/* Mobile hamburger — opens the nav menu; hidden on desktop */}
          <div className="relative md:hidden" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-full text-brand-foreground transition hover:bg-brand-muted/60"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            {menuOpen && (
              <nav
                role="menu"
                aria-label="Primary"
                className="absolute right-0 top-[calc(100%+8px)] z-50 w-48 overflow-hidden rounded-2xl border border-brand-border bg-white py-1 shadow-xl"
              >
                {TABS.map((tab) => (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 text-sm font-medium text-brand-foreground/70 transition hover:bg-brand-muted/50",
                      isActive(tab.href) && "text-brand-foreground",
                    )}
                  >
                    {tab.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
