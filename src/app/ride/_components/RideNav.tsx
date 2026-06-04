"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ProfileMenu } from "./ProfileMenu";

const TABS = [
  { href: "/ride", label: "Ride" },
  { href: "/ride/activity", label: "Activity" },
];

export function RideNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 shrink-0 border-b border-brand-border bg-white/95 shadow-soft backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-8">
          <Link href="/ride" aria-label="Mckot home" className="flex items-center">
            <Image src="/logo-light.svg" alt="Mckot" width={110} height={31} className="h-8 w-auto" priority />
          </Link>
          <nav className="flex items-center gap-6" aria-label="Primary">
            {TABS.map((tab) => {
              const active = tab.href === "/ride" ? pathname === "/ride" : pathname.startsWith(tab.href);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "text-sm font-medium text-brand-foreground/65 transition hover:text-brand-foreground",
                    active && "text-brand-foreground",
                  )}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <ProfileMenu />
      </div>
    </header>
  );
}
