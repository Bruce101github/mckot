"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Wallet, Receipt, LifeBuoy, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { cn } from "@/lib/utils";

function initials(first?: string | null, last?: string | null): string {
  const a = (first ?? "").trim()[0] ?? "";
  const b = (last ?? "").trim()[0] ?? "";
  return (a + b).toUpperCase() || "?";
}

export function ProfileMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!user) return null;

  const symbol = user.currency_symbol ?? "₵";
  const balance = Number(user.balance ?? 0);
  const fullName = `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() || user.phone;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1 rounded-full border border-brand-border bg-white p-0.5 pr-2 shadow-soft transition hover:border-brand-foreground/30"
      >
        <Avatar user={user} />
        <ChevronDown className={cn("h-4 w-4 text-brand-foreground/50 transition", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-72 overflow-hidden rounded-2xl border border-brand-border bg-white shadow-xl"
        >
          <div className="flex items-center gap-3 p-4">
            <Avatar user={user} size={44} />
            <div className="min-w-0">
              <p className="truncate font-semibold text-brand-foreground">{fullName}</p>
              <p className="truncate text-xs text-brand-foreground/50">{user.phone}</p>
            </div>
          </div>

          <Link
            href="/ride/wallet"
            onClick={() => setOpen(false)}
            className="mx-3 mb-2 flex items-center justify-between rounded-xl bg-brand-muted/50 px-4 py-3 transition hover:bg-brand-muted"
          >
            <span className="text-sm font-medium text-brand-foreground/70">Mckot balance</span>
            <span className="font-semibold text-brand-foreground">
              {symbol}
              {balance.toFixed(2)}
            </span>
          </Link>

          <div className="border-t border-brand-border py-1">
            <MenuLink href="/ride/wallet" icon={<Wallet className="h-4 w-4" />} label="Wallet" onClick={() => setOpen(false)} />
            <MenuLink href="/ride/activity" icon={<Receipt className="h-4 w-4" />} label="Activity" onClick={() => setOpen(false)} />
            <MenuLink href="/#faq" icon={<LifeBuoy className="h-4 w-4" />} label="Help" onClick={() => setOpen(false)} />
          </div>

          <div className="border-t border-brand-border py-1">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLink({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-brand-foreground/80 transition hover:bg-brand-muted/50"
    >
      <span className="text-brand-foreground/50">{icon}</span>
      {label}
    </Link>
  );
}

function Avatar({ user, size = 32 }: { user: ReturnType<typeof useAuth>["user"]; size?: number }) {
  if (!user) return null;
  if (user.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.image}
        alt=""
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="flex items-center justify-center rounded-full bg-brand-dark font-semibold text-white"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials(user.first_name, user.last_name)}
    </span>
  );
}
