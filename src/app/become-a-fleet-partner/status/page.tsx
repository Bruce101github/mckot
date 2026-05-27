"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

interface StatusResult {
  success: boolean;
  info?:
    | string
    | {
        application_code: string;
        status: string;
        business_name?: string;
        owner_full_name?: string;
        submitted_at?: string | null;
        reviewed_at?: string | null;
        rejection_reason?: string;
        info_request_message?: string;
        approved_rider_share_pct?: string | null;
        approved_fleet_share_pct?: string | null;
      };
}

function StatusInner() {
  const params = useSearchParams();
  const [code, setCode] = useState((params.get("code") ?? "").toUpperCase());
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StatusResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // If the email link landed with ?code= prefilled, focus the phone
  // field so users can finish the lookup with one keystroke.
  useEffect(() => {
    if (params.get("code")) {
      const input = document.getElementById("phone-input");
      input?.focus();
    }
  }, [params]);

  async function lookup(e?: React.FormEvent) {
    e?.preventDefault();
    if (!code.trim() || !phone.trim()) {
      setError("Enter your application code and phone number.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const r = await fetch("/api/fleet-application-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          application_code: code.trim().toUpperCase(),
          owner_phone: phone.trim(),
        }),
      });
      const json: StatusResult = await r.json();
      setResult(json);
      if (!json.success && typeof json.info === "string") {
        setError(json.info);
      }
    } catch {
      setError("Network error. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  const info =
    result?.success && typeof result.info === "object" ? result.info : null;

  return (
    <section className="bg-brand-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <Link
          href="/become-a-fleet-partner"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-foreground/65 transition hover:text-brand-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to Mckot Fleet
        </Link>

        <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight text-brand-foreground md:text-4xl">
          Check your application
        </h1>
        <p className="mt-3 text-brand-foreground/65">
          Enter the application code we emailed you and the phone you applied with.
        </p>

        <form
          onSubmit={lookup}
          className="mt-8 grid gap-4 rounded-3xl border border-brand-border bg-white p-6 md:p-8"
        >
          <div>
            <label className="block text-sm font-medium text-brand-foreground/80">
              Application code
            </label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="MKF-XXXXXX"
              className="mt-2 w-full rounded-xl border border-brand-border bg-white px-4 py-3 font-mono text-sm tracking-wide text-brand-foreground outline-none placeholder:text-brand-foreground/35 focus:ring-2 focus:ring-brand-accent/40"
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="phone-input"
              className="block text-sm font-medium text-brand-foreground/80"
            >
              Phone number
            </label>
            <input
              id="phone-input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0244 123 456"
              className="mt-2 w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm text-brand-foreground outline-none placeholder:text-brand-foreground/35 focus:ring-2 focus:ring-brand-accent/40"
              autoComplete="tel"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-dark px-5 py-3 text-sm font-semibold text-brand-dark-foreground transition hover:bg-brand-dark-muted disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Looking up…
              </>
            ) : (
              "Check status"
            )}
          </button>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
        </form>

        {info && <StatusCard info={info} />}
      </div>
    </section>
  );
}

function StatusCard({ info }: { info: NonNullable<StatusResult["info"]> & object }) {
  const status = info.status ?? "";
  const palette = paletteFor(status);
  return (
    <article className="mt-6 overflow-hidden rounded-3xl border border-brand-border bg-white shadow-soft">
      <header className={`px-6 py-4 ${palette.headerBg}`}>
        <p className={`text-xs font-medium uppercase tracking-wider ${palette.headerLabel}`}>
          Current status
        </p>
        <p className={`mt-1 text-xl font-semibold ${palette.headerText}`}>
          {humanStatus(status)}
        </p>
      </header>
      <div className="space-y-4 px-6 py-6">
        <Row label="Application code" value={info.application_code} mono />
        {info.business_name && (
          <Row label="Business" value={info.business_name} />
        )}
        {info.owner_full_name && (
          <Row label="Applicant" value={info.owner_full_name} />
        )}
        {info.submitted_at && (
          <Row label="Submitted" value={fmtDate(info.submitted_at)} />
        )}
        {info.reviewed_at && (
          <Row label="Last update" value={fmtDate(info.reviewed_at)} />
        )}
        {info.info_request_message && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <p className="font-semibold">We need more information</p>
            <p className="mt-1">{info.info_request_message}</p>
          </div>
        )}
        {info.rejection_reason && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            <p className="font-semibold">Reason for rejection</p>
            <p className="mt-1">{info.rejection_reason}</p>
          </div>
        )}
        {info.approved_rider_share_pct && (
          <div className="rounded-xl border border-brand-accent/30 bg-brand-accent/10 p-4 text-sm text-brand-foreground">
            <p className="font-semibold">You're approved 🎉</p>
            <p className="mt-1">
              Negotiated split: <strong>{info.approved_rider_share_pct}%</strong> to
              the rider, <strong>{info.approved_fleet_share_pct}%</strong> to
              your fleet, after Mckot's platform commission.
            </p>
            <p className="mt-2 text-xs text-brand-foreground/65">
              We'll send your dashboard login details by email shortly.
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
      <span className="text-brand-foreground/60">{label}</span>
      <span
        className={
          "text-brand-foreground " +
          (mono ? "font-mono font-semibold tracking-wide" : "font-medium")
        }
      >
        {value}
      </span>
    </div>
  );
}

function humanStatus(s: string) {
  return (
    {
      submitted: "Submitted — awaiting review",
      under_review: "Under review",
      info_requested: "More info requested",
      approved: "Approved",
      rejected: "Rejected",
    }[s] ?? "Unknown"
  );
}

function paletteFor(status: string) {
  if (status === "approved") {
    return {
      headerBg: "bg-brand-accent/15",
      headerLabel: "text-brand-accent",
      headerText: "text-brand-foreground",
    };
  }
  if (status === "rejected") {
    return {
      headerBg: "bg-red-50",
      headerLabel: "text-red-700",
      headerText: "text-red-900",
    };
  }
  if (status === "info_requested") {
    return {
      headerBg: "bg-amber-50",
      headerLabel: "text-amber-700",
      headerText: "text-amber-900",
    };
  }
  return {
    headerBg: "bg-brand-muted/60",
    headerLabel: "text-brand-foreground/55",
    headerText: "text-brand-foreground",
  };
}

function fmtDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Africa/Accra",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function FleetStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center text-brand-foreground/55">
          <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
        </div>
      }
    >
      <StatusInner />
    </Suspense>
  );
}
