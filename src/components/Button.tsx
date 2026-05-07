import Link from "next/link";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-accent text-brand font-semibold hover:bg-brand-accent-hover shadow-glow",
  secondary:
    "border border-brand-border bg-brand-surface text-brand-foreground hover:border-brand-accent/60 hover:bg-brand-muted/30",
  ghost: "text-brand-foreground hover:bg-white/5",
};

type Props = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  icon?: LucideIcon;
  external?: boolean;
  type?: "button" | "submit";
  ariaLabel?: string;
  disabled?: boolean;
};

export function Button({
  href,
  children,
  className,
  variant = "primary",
  icon: Icon,
  external,
  type = "button",
  ariaLabel,
  disabled,
}: Props) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm transition-all duration-200 disabled:opacity-50 sm:text-base",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label={ariaLabel}
      >
        {Icon ? <Icon className="h-5 w-5 shrink-0" aria-hidden /> : null}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} aria-label={ariaLabel} disabled={disabled}>
      {Icon ? <Icon className="h-5 w-5 shrink-0" aria-hidden /> : null}
      {children}
    </button>
  );
}
