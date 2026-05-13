"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/Button";
import { coverageZones } from "@/lib/site";
import { trackVendorSignupSubmit } from "@/lib/analytics";

const activeZones = coverageZones.filter((z) => z.inCoverage);

export function VendorSignupForm({ id }: { id?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");
  const [zones, setZones] = useState<string[]>([]);

  function toggleZone(id: string) {
    setZones((prev) =>
      prev.includes(id) ? prev.filter((z) => z !== id) : [...prev, id],
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (zones.length === 0) {
      setStatus("err");
      setMessage("Select at least one delivery zone.");
      return;
    }
    setStatus("loading");
    setMessage("");
    const form = new FormData(e.currentTarget);
    const payload = {
      ...Object.fromEntries(form.entries()),
      deliveryZones: zones,
    };

    try {
      const res = await fetch("/api/vendor-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong");
      setStatus("ok");
      trackVendorSignupSubmit();
      setMessage(
        "You are in. Our team will reach out on WhatsApp within one business day to get you started.",
      );
      e.currentTarget.reset();
      setZones([]);
    } catch {
      setStatus("err");
      setMessage("Could not submit. Try WhatsApp or contact us directly.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-brand-accent/30 bg-brand-accent/10 p-8 text-center">
        <p className="text-3xl">🎉</p>
        <p className="mt-4 text-lg font-semibold text-brand-foreground">You are on the list!</p>
        <p className="mt-2 text-sm text-brand-foreground/65">{message}</p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className="grid gap-5 rounded-2xl border border-brand-border bg-brand-surface/90 p-6 md:grid-cols-2 md:p-8"
      aria-label="Vendor signup form"
    >
      <div>
        <label
          htmlFor="vs-name"
          className="block text-sm font-medium text-brand-foreground/80"
        >
          Your name <span className="text-brand-accent">*</span>
        </label>
        <input
          id="vs-name"
          name="contactName"
          required
          className="mt-2 w-full rounded-xl border border-brand-border bg-brand px-4 py-3 text-sm text-brand-foreground outline-none placeholder:text-brand-foreground/35 focus:ring-2 focus:ring-brand-accent/40"
          placeholder="Full name"
        />
      </div>

      <div>
        <label
          htmlFor="vs-business"
          className="block text-sm font-medium text-brand-foreground/80"
        >
          Business name <span className="text-brand-accent">*</span>
        </label>
        <input
          id="vs-business"
          name="businessName"
          required
          className="mt-2 w-full rounded-xl border border-brand-border bg-brand px-4 py-3 text-sm text-brand-foreground outline-none focus:ring-2 focus:ring-brand-accent/40"
          placeholder="Your brand or shop name"
        />
      </div>

      <div>
        <label
          htmlFor="vs-phone"
          className="block text-sm font-medium text-brand-foreground/80"
        >
          WhatsApp number <span className="text-brand-accent">*</span>
        </label>
        <input
          id="vs-phone"
          name="phone"
          required
          type="tel"
          className="mt-2 w-full rounded-xl border border-brand-border bg-brand px-4 py-3 text-sm text-brand-foreground outline-none focus:ring-2 focus:ring-brand-accent/40"
          placeholder="+233 XX XXX XXXX"
        />
      </div>

      <div>
        <label
          htmlFor="vs-handle"
          className="block text-sm font-medium text-brand-foreground/80"
        >
          Instagram or TikTok handle
        </label>
        <input
          id="vs-handle"
          name="socialHandle"
          className="mt-2 w-full rounded-xl border border-brand-border bg-brand px-4 py-3 text-sm text-brand-foreground outline-none focus:ring-2 focus:ring-brand-accent/40"
          placeholder="@yourbrand"
        />
      </div>

      <div className="md:col-span-2">
        <label
          htmlFor="vs-daily"
          className="block text-sm font-medium text-brand-foreground/80"
        >
          Average sales per day <span className="text-brand-accent">*</span>
        </label>
        <select
          id="vs-daily"
          name="dailySales"
          required
          defaultValue=""
          className="mt-2 w-full rounded-xl border border-brand-border bg-brand px-4 py-3 text-sm text-brand-foreground outline-none focus:ring-2 focus:ring-brand-accent/40"
        >
          <option value="" disabled>
            Select your daily volume
          </option>
          <option value="1-2">1 to 2 orders</option>
          <option value="3-5">3 to 5 orders</option>
          <option value="6-10">6 to 10 orders</option>
          <option value="10+">More than 10 orders</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <p className="text-sm font-medium text-brand-foreground/80">
          Delivery zones needed <span className="text-brand-accent">*</span>
        </p>
        <p className="mt-0.5 text-xs text-brand-foreground/45">Select all zones your customers are in</p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {activeZones.map((zone) => {
            const checked = zones.includes(zone.id);
            return (
              <label
                key={zone.id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                  checked
                    ? "border-brand-accent/50 bg-brand-accent/10 text-brand-foreground"
                    : "border-brand-border bg-brand text-brand-foreground/70 hover:border-brand-accent/30"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleZone(zone.id)}
                  aria-label={zone.label}
                />
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-xs font-bold ${
                    checked
                      ? "border-brand-accent bg-brand-accent text-brand"
                      : "border-brand-border"
                  }`}
                  aria-hidden
                >
                  {checked ? "✓" : ""}
                </span>
                {zone.label}
              </label>
            );
          })}
        </div>
      </div>

      <div className="md:col-span-2">
        <Button
          type="submit"
          variant="primary"
          className="w-full py-4 text-base"
          disabled={status === "loading"}
          ariaLabel="Submit vendor signup"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              Submitting
            </>
          ) : (
            "Join Mckot. Start Delivering in 24 Hours."
          )}
        </Button>
        <p className="mt-2 text-center text-xs text-brand-foreground/40">
          No commitment. Our team confirms your setup over WhatsApp.
        </p>
      </div>

      {status === "err" && message && (
        <p className="md:col-span-2 text-sm text-red-300" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
