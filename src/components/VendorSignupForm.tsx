"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/Button";
import { coverageZones } from "@/lib/site";

export function VendorSignupForm({ id }: { id?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/vendor-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong");
      setStatus("ok");
      setMessage("Thanks. Our team will reach out within one business day.");
      e.currentTarget.reset();
    } catch {
      setStatus("err");
      setMessage("Could not submit. Try WhatsApp or email instead.");
    }
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className="grid gap-4 rounded-2xl border border-brand-border bg-brand-surface/90 p-6 md:grid-cols-2 md:p-8"
      aria-label="Vendor signup form"
    >
      <div className="md:col-span-2">
        <label htmlFor="vendor-name" className="text-sm font-medium text-brand-foreground/80">
          Your name
        </label>
        <input
          id="vendor-name"
          name="contactName"
          required
          className="mt-2 w-full rounded-xl border border-brand-border bg-brand px-4 py-3 text-brand-foreground outline-none ring-brand-accent/30 placeholder:text-brand-foreground/35 focus:ring-2"
          placeholder="Full name"
        />
      </div>
      <div>
        <label htmlFor="business-name" className="text-sm font-medium text-brand-foreground/80">
          Business name
        </label>
        <input
          id="business-name"
          name="businessName"
          required
          className="mt-2 w-full rounded-xl border border-brand-border bg-brand px-4 py-3 text-brand-foreground outline-none focus:ring-2 focus:ring-brand-accent/40"
        />
      </div>
      <div>
        <label htmlFor="phone" className="text-sm font-medium text-brand-foreground/80">
          Phone (WhatsApp preferred)
        </label>
        <input
          id="phone"
          name="phone"
          required
          type="tel"
          className="mt-2 w-full rounded-xl border border-brand-border bg-brand px-4 py-3 text-brand-foreground outline-none focus:ring-2 focus:ring-brand-accent/40"
          placeholder="+233 ..."
        />
      </div>
      <div>
        <label htmlFor="handle" className="text-sm font-medium text-brand-foreground/80">
          Instagram or TikTok handle
        </label>
        <input
          id="handle"
          name="socialHandle"
          className="mt-2 w-full rounded-xl border border-brand-border bg-brand px-4 py-3 text-brand-foreground outline-none focus:ring-2 focus:ring-brand-accent/40"
          placeholder="@yourbrand"
        />
      </div>
      <div>
        <label htmlFor="monthly" className="text-sm font-medium text-brand-foreground/80">
          Approx. deliveries per month
        </label>
        <select
          id="monthly"
          name="monthlyDeliveries"
          required
          className="mt-2 w-full rounded-xl border border-brand-border bg-brand px-4 py-3 text-brand-foreground outline-none focus:ring-2 focus:ring-brand-accent/40"
          defaultValue=""
        >
          <option value="" disabled>
            Select range
          </option>
          <option value="1-50">1 to 50</option>
          <option value="51-150">51 to 150</option>
          <option value="151-400">151 to 400</option>
          <option value="400+">400 plus</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label htmlFor="zone" className="text-sm font-medium text-brand-foreground/80">
          Primary pickup area
        </label>
        <select
          id="zone"
          name="serviceZone"
          required
          className="mt-2 w-full rounded-xl border border-brand-border bg-brand px-4 py-3 text-brand-foreground outline-none focus:ring-2 focus:ring-brand-accent/40"
          defaultValue=""
        >
          <option value="" disabled>
            Choose zone
          </option>
          {coverageZones.map((z) => (
            <option key={z.id} value={z.id}>
              {z.label}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <Button
          type="submit"
          variant="primary"
          className="w-full md:w-auto"
          disabled={status === "loading"}
          ariaLabel="Submit vendor signup"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              Sending
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
      {message ? (
        <p
          className={`md:col-span-2 text-sm ${status === "ok" ? "text-brand-accent" : "text-red-300"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
