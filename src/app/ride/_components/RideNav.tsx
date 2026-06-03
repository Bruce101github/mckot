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
    <header className="z-30 flex h-16 shrink-0 items-center justify-between border-b border-brand-border bg-white px-4 md:px-6">
      <div className="flex items-center gap-6">
        <Link href="/ride" aria-label="Mckot" className="flex items-center">
          <Image src="/logo-light.svg" alt="Mckot" width={104} height={30} className="h-7 w-auto" priority />
        </Link>
        <nav className="flex items-center gap-1">
          {TABS.map((tab) => {
            const active = tab.href === "/ride" ? pathname === "/ride" : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition",
                  active
                    ? "bg-brand-foreground text-white"
                    : "text-brand-foreground/70 hover:bg-brand-muted/60",
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <ProfileMenu />
    </header>
  );
}
