"use client";

import { useEffect, useState } from "react";
import { CreditCard, Smartphone, Banknote } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";
import {
  getSavedMethods,
  getWalletActivity,
  getWalletOverview,
  type SavedMethod,
  type WalletOverview,
  type WalletTx,
} from "@/lib/api/wallet";
import { cn } from "@/lib/utils";

export function WalletView() {
  const { user } = useAuth();
  const symbol = user?.currency_symbol ?? "₵";

  const [overview, setOverview] = useState<WalletOverview | null>(null);
  const [methods, setMethods] = useState<SavedMethod[]>([]);
  const [txns, setTxns] = useState<WalletTx[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [ov, ms, ac] = await Promise.all([
        getWalletOverview(),
        getSavedMethods(),
        getWalletActivity(1),
      ]);
      if (cancelled) return;
      setOverview(ov);
      setMethods(ms);
      setTxns(ac.items);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const balance = overview ? Number(overview.balance) : Number(user?.balance ?? 0);

  return (
    <div className="space-y-8">
      <section>
        <div className="overflow-hidden rounded-2xl bg-brand-dark p-6 text-white shadow-soft">
          <p className="text-sm text-white/70">Mckot balance</p>
          <p className="mt-1 text-4xl font-semibold">
            {symbol}
            {balance.toFixed(2)}
          </p>
          {overview?.pending_money_requests ? (
            <p className="mt-3 text-xs text-white/70">
              {overview.pending_money_requests} pending money request
              {overview.pending_money_requests > 1 ? "s" : ""}
            </p>
          ) : null}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-brand-foreground">Payment methods</h2>
        <div className="space-y-2">
          <MethodRow
            icon={<Banknote className="h-5 w-5" />}
            title="Cash"
            subtitle="Pay the driver directly"
            badge="Default"
          />
          {loading && methods.length === 0 ? (
            <SkeletonRows />
          ) : (
            methods.map((m) => (
              <MethodRow
                key={m.id}
                icon={
                  m.type === "card" ? (
                    <CreditCard className="h-5 w-5" />
                  ) : (
                    <Smartphone className="h-5 w-5" />
                  )
                }
                title={m.user_label || m.label}
                subtitle={
                  m.type === "card"
                    ? `${m.card_brand ?? "Card"} •••• ${m.card_last4 ?? ""}`.trim()
                    : `${m.momo_provider ?? "MoMo"} · ${m.momo_phone ?? ""}`.trim()
                }
                badge={m.is_default ? "Default" : undefined}
              />
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-brand-foreground">Recent activity</h2>
        {loading ? (
          <SkeletonRows />
        ) : txns.length === 0 ? (
          <p className="rounded-xl border border-brand-border bg-white px-4 py-8 text-center text-sm text-brand-foreground/50">
            No wallet activity yet.
          </p>
        ) : (
          <div className="divide-y divide-brand-border overflow-hidden rounded-xl border border-brand-border bg-white">
            {txns.map((tx) => (
              <TxRow key={tx.id} tx={tx} symbol={symbol} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function MethodRow({
  icon,
  title,
  subtitle,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badge?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-brand-border bg-white px-4 py-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-muted/60 text-brand-foreground/60">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-brand-foreground">{title}</p>
        <p className="truncate text-xs text-brand-foreground/50">{subtitle}</p>
      </div>
      {badge && (
        <span className="rounded-full bg-brand-muted px-2 py-0.5 text-xs font-medium text-brand-foreground/60">
          {badge}
        </span>
      )}
    </div>
  );
}

function TxRow({ tx, symbol }: { tx: WalletTx; symbol: string }) {
  const credit = tx.trans_type === "credit";
  const amount = Number(tx.amount);
  const title = tx.counterparty_name || tx.note || tx.method.replace(/_/g, " ");
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="min-w-0">
        <p className="truncate font-medium capitalize text-brand-foreground">{title}</p>
        <p className="text-xs text-brand-foreground/50">{formatDate(tx.created)}</p>
      </div>
      <div className="text-right">
        <p className={cn("font-semibold", credit ? "text-green-600" : "text-brand-foreground")}>
          {credit ? "+" : "−"}
          {symbol}
          {Math.abs(amount).toFixed(2)}
        </p>
        <p className="text-xs capitalize text-brand-foreground/50">{tx.status}</p>
      </div>
    </div>
  );
}

function SkeletonRows() {
  return (
    <div className="space-y-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-16 animate-pulse rounded-xl border border-brand-border bg-brand-muted/30" />
      ))}
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}
