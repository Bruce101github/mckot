"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getCountries, requestOtp, verifyOtp } from "@/lib/auth/server";
import { getDeviceId, normalizePhone } from "@/lib/auth/client-utils";
import type { Country } from "@/lib/auth/types";

type Step = "phone" | "otp";

export function LoginPanel() {
  const { setUser } = useAuth();
  const [country, setCountry] = useState<Country | null>(null);
  const [step, setStep] = useState<Step>("phone");
  const [phoneInput, setPhoneInput] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCountries()
      .then((list) => {
        const gh =
          list.find((c) => c.short_name?.toUpperCase() === "GH") ??
          list.find((c) => (c.phone_code ?? "").replace(/\D/g, "") === "233") ??
          list[0] ??
          null;
        setCountry(gh);
      })
      .catch(() => setCountry(null));
  }, []);

  const phoneCode = (country?.phone_code ?? "233").replace(/\D/g, "");
  const normalizedPhone = normalizePhone(phoneInput, phoneCode);

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (phoneInput.replace(/\D/g, "").length < 6) {
      setError("Enter a valid phone number");
      return;
    }
    setLoading(true);
    const res = await requestOtp(normalizedPhone);
    setLoading(false);
    if (res.success) {
      setStep("otp");
    } else {
      setError(res.error ?? "Could not send code");
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (otp.replace(/\D/g, "").length < 4) {
      setError("Enter the code we sent you");
      return;
    }
    setLoading(true);
    const res = await verifyOtp({
      phone: normalizedPhone,
      otp: otp.replace(/\D/g, ""),
      countryId: country?.id ?? 1,
      device: getDeviceId(),
    });
    setLoading(false);
    if (res.success) {
      setUser(res.user);
    } else {
      setError(res.error ?? "Invalid code");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-surface px-4 py-10">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex justify-center" aria-label="Mckot home">
          <Image src="/logo-light.svg" alt="Mckot" width={120} height={34} className="h-9 w-auto" priority />
        </Link>

        <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-soft sm:p-8">
          <h1 className="text-xl font-semibold text-brand-foreground">
            {step === "phone" ? "Sign in to ride" : "Enter your code"}
          </h1>
          <p className="mt-1 text-sm text-brand-foreground/60">
            {step === "phone"
              ? "We'll text you a verification code."
              : `Sent to +${normalizedPhone}`}
          </p>

          {step === "phone" ? (
            <form onSubmit={handleSendCode} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-brand-foreground/80">Phone number</span>
                <div className="mt-1 flex items-center rounded-xl border border-brand-border bg-white focus-within:border-brand-dark">
                  <span className="px-3 text-sm font-medium text-brand-foreground/70">+{phoneCode}</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="24 123 4567"
                    className="w-full rounded-r-xl bg-transparent py-3 pr-3 text-brand-foreground outline-none"
                  />
                </div>
              </label>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-brand-dark py-3 font-semibold text-white transition-colors hover:bg-brand-foreground disabled:opacity-60"
              >
                {loading ? "Sending…" : "Continue"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-brand-foreground/80">Verification code</span>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  className="mt-1 w-full rounded-xl border border-brand-border bg-white py-3 px-3 text-center text-lg tracking-[0.3em] text-brand-foreground outline-none focus:border-brand-dark"
                />
              </label>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-brand-dark py-3 font-semibold text-white transition-colors hover:bg-brand-foreground disabled:opacity-60"
              >
                {loading ? "Verifying…" : "Verify & continue"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setOtp("");
                  setError(null);
                }}
                className="w-full text-sm text-brand-foreground/60 hover:text-brand-foreground"
              >
                Use a different number
              </button>
            </form>
          )}

          {step === "phone" && (
            <>
              <div className="my-6 flex items-center gap-3 text-xs text-brand-foreground/40">
                <span className="h-px flex-1 bg-brand-border" />
                or
                <span className="h-px flex-1 bg-brand-border" />
              </div>
              <div className="space-y-3">
                <OauthButton label="Continue with Google" provider="google" />
                <OauthButton label="Continue with Apple" provider="apple" />
              </div>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-brand-foreground/50">
          By continuing you agree to our{" "}
          <Link href="/terms" className="underline">terms</Link> and{" "}
          <Link href="/privacy" className="underline">privacy policy</Link>.
        </p>
      </div>
    </div>
  );
}

// Scaffolded — wired in Phase 1 once web OAuth client IDs are configured.
function OauthButton({ label, provider }: { label: string; provider: "google" | "apple" }) {
  return (
    <button
      type="button"
      onClick={() => alert("Social sign-in is being set up. Please use your phone number for now.")}
      data-provider={provider}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-border bg-white py-3 text-sm font-medium text-brand-foreground/80 transition-colors hover:bg-brand-muted/50"
    >
      {label}
    </button>
  );
}
