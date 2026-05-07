import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
};

export function Card({ children, className, glow }: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-brand-border bg-brand-surface/80 bg-card-shine p-6 backdrop-blur-sm transition-colors hover:border-brand-accent/25",
        glow && "shadow-glow/50",
        className,
      )}
    >
      {children}
    </div>
  );
}
