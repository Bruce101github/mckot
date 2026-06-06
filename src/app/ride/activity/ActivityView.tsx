"use client";

import { useEffect, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getTripHistory, type Paginator, type TripHistoryRow } from "@/lib/api/wallet";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
  "in progress": "bg-blue-100 text-blue-700",
  accepted: "bg-blue-100 text-blue-700",
  requested: "bg-amber-100 text-amber-700",
  scheduled: "bg-brand-muted text-brand-foreground/60",
};

export function ActivityView() {
  const { user } = useAuth();
  const symbol = user?.currency_symbol ?? "₵";

  const [rows, setRows] = useState<TripHistoryRow[]>([]);
  const [paginator, setPaginator] = useState<Paginator | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { items, paginator } = await getTripHistory(1);
      if (cancelled) return;
      setRows(items);
      setPaginator(paginator);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function loadMore() {
    if (!paginator?.next || loadingMore) return;
    setLoadingMore(true);
    const next = page + 1;
    const { items, paginator: pg } = await getTripHistory(next);
    setRows((prev) => [...prev, ...items]);
    setPaginator(pg);
    setPage(next);
    setLoadingMore(false);
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-brand-foreground">Your trips</h1>

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl border border-brand-border bg-brand-muted/30" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <p className="rounded-2xl border border-brand-border bg-white px-4 py-12 text-center text-sm text-brand-foreground/50">
          You have no past trips yet.
        </p>
      ) : (
        <>
          <div className="space-y-3">
            {rows.map((row) => (
              <TripRow key={row.id} row={row} symbol={symbol} />
            ))}
          </div>
          {paginator?.next && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={loadMore}
                disabled={loadingMore}
                className="flex items-center gap-2 rounded-full border border-brand-border bg-white px-5 py-2 text-sm font-medium text-brand-foreground/70 transition hover:border-brand-foreground/30 disabled:opacity-60"
              >
                {loadingMore && <Loader2 className="h-4 w-4 animate-spin" />}
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function TripRow({ row, symbol }: { row: TripHistoryRow; symbol: string }) {
  const pickup = row.route?.[0];
  const dropoff = row.route?.[row.route.length - 1];
  const price = Number(row.price ?? 0);
  const statusStyle = STATUS_STYLES[row.status] ?? "bg-brand-muted text-brand-foreground/60";

  return (
    <div className="rounded-2xl border border-brand-border bg-white p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-brand-foreground">
            {row.ride_type__label ?? "Mckot"}
          </p>
          <p className="text-xs text-brand-foreground/50">{formatDate(row.created)}</p>
        </div>
        <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize", statusStyle)}>
          {row.status}
        </span>
      </div>

      <div className="mt-3 space-y-1.5">
        <Stop color="#0B3B2D" label={pickup?.address ?? pickup?.location ?? "Pickup"} />
        <Stop color="#A4D233" label={dropoff?.address ?? dropoff?.location ?? "Destination"} />
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-brand-border pt-3">
        <span className="text-xs capitalize text-brand-foreground/50">
          {(row.payment_method ?? "").replace(/_/g, " ") || "-"}
        </span>
        <span className="font-semibold text-brand-foreground">
          {symbol}
          {price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

function Stop({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color }} />
      <span className="truncate text-sm text-brand-foreground/80">{label}</span>
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}
