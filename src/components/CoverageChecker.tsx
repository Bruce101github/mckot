"use client";

import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export function CoverageChecker() {
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [result, setResult] = useState<{
    inCoverage: boolean;
    detail: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function check(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/coverage-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, postalCode: postal }),
      });
      const data = (await res.json()) as {
        inCoverage: boolean;
        detail: string;
      };
      setResult(data);
    } catch {
      setResult({
        inCoverage: false,
        detail: "Could not verify right now. Message us on WhatsApp with your landmark.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <form onSubmit={check} className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <label htmlFor="addr" className="text-sm font-medium text-brand-foreground/80">
            Street or landmark
          </label>
          <div className="relative mt-2">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-accent/70" />
            <input
              id="addr"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full rounded-xl border border-brand-border bg-brand py-3 pl-11 pr-4 text-brand-foreground outline-none focus:ring-2 focus:ring-brand-accent/40"
              placeholder="e.g. Near Junction Mall, Nungua"
              autoComplete="street-address"
            />
          </div>
        </div>
        <div className="w-full md:w-40">
          <label htmlFor="postal" className="text-sm font-medium text-brand-foreground/80">
            Digital address (optional)
          </label>
          <input
            id="postal"
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
            className="mt-2 w-full rounded-xl border border-brand-border bg-brand px-4 py-3 text-brand-foreground outline-none focus:ring-2 focus:ring-brand-accent/40"
            placeholder="GA-XXX-XXXX"
          />
        </div>
        <Button type="submit" variant="primary" disabled={loading} icon={Search} className="md:mb-0">
          {loading ? "Checking" : "Check"}
        </Button>
      </form>
      {result ? (
        <p
          className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
            result.inCoverage
              ? "border-brand-accent/40 bg-brand-accent/10 text-brand-accent"
              : "border-brand-border bg-brand-muted/20 text-brand-foreground/85"
          }`}
          role="status"
        >
          {result.detail}
        </p>
      ) : null}
    </Card>
  );
}
