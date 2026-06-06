"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getCountries, oauthLogin, requestOtp, verifyOtp, type OauthOutcome } from "@/lib/auth/server";
import { getDeviceId, normalizePhone } from "@/lib/auth/client-utils";
import {
  APPLE_CLIENT_ID,
  GOOGLE_CLIENT_ID,
  renderGoogleButton,
  signInWithApple,
} from "@/lib/auth/oauth-client";
import type { Country } from "@/lib/auth/types";

type Step = "phone" | "otp";
type OauthSession = { token: string; firstName?: string; lastName?: string };

export function LoginPanel() {
  const { setUser } = useAuth();
  const [country, setCountry] = useState<Country | null>(null);
  const [step, setStep] = useState<Step>("phone");
  const [phoneInput, setPhoneInput] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [oauthSession, setOauthSession] = useState<OauthSession | null>(null);
  const googleHostRef = useRef<HTMLDivElement | null>(null);

  function handleOauthOutcome(outcome: OauthOutcome) {
    if (!outcome.success) {
      setError(outcome.error);
      return;
    }
    if ("needsPhone" in outcome) {
      setError(null);
      setPhoneInput("");
      setOtp("");
      setStep("phone");
      setOauthSession({
        token: outcome.oauthSessionToken,
        firstName: outcome.firstName,
        lastName: outcome.lastName,
      });
      return;
    }
    setUser(outcome.user);
  }

  // Render Google's (transparent) official button over our styled one.
  useEffect(() => {
    const host = googleHostRef.current;
    if (!host || step !== "phone" || oauthSession || !GOOGLE_CLIENT_ID) return;
    renderGoogleButton(
      host,
      async (idToken) => {
        setLoading(true);
        const outcome = await oauthLogin({ provider: "google", idToken, device: getDeviceId() });
        setLoading(false);
        handleOauthOutcome(outcome);
      },
      (message) => setError(message),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, oauthSession]);

  async function handleApple() {
    setError(null);
    setLoading(true);
    try {
      const { idToken, firstName, lastName } = await signInWithApple();
      const outcome = await oauthLogin({
        provider: "apple",
        idToken,
        device: getDeviceId(),
        firstName,
        lastName,
      });
      handleOauthOutcome(outcome);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Apple sign-in failed.");
    } finally {
      setLoading(false);
    }
  }

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
      oauthSessionToken: oauthSession?.token,
    });
    setLoading(false);
    if (res.success) {
      setUser(res.user);
    } else {
      setError(res.error ?? "Invalid code");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-10">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex justify-center" aria-label="Mckot home">
          <Image src="/logo-light.svg" alt="Mckot" width={120} height={34} className="h-9 w-auto" priority />
        </Link>

        <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-soft sm:p-8">
          <h1 className="text-xl font-semibold text-brand-foreground">
            {step === "otp"
              ? "Enter your code"
              : oauthSession
                ? oauthSession.firstName
                  ? `Almost there, ${oauthSession.firstName}`
                  : "Add your phone number"
                : "Sign in to book a delivery"}
          </h1>
          <p className="mt-1 text-sm text-brand-foreground/60">
            {step === "otp"
              ? `Sent to +${normalizedPhone}`
              : oauthSession
                ? "One last step, we'll text a code to verify your number."
                : "We'll text you a verification code."}
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

          {step === "phone" && !oauthSession && (GOOGLE_CLIENT_ID || APPLE_CLIENT_ID) && (
            <>
              <div className="my-6 flex items-center gap-3 text-xs text-brand-foreground/40">
                <span className="h-px flex-1 bg-brand-border" />
                or
                <span className="h-px flex-1 bg-brand-border" />
              </div>
              <div className="space-y-3">
                {GOOGLE_CLIENT_ID && (
                  <div className="relative">
                    <div className="pointer-events-none flex w-full items-center justify-center gap-2.5 rounded-xl border border-brand-border bg-white py-3 text-sm font-medium text-brand-foreground/80">
                      <GoogleIcon />
                      Continue with Google
                    </div>
                    <div
                      ref={googleHostRef}
                      aria-hidden
                      className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden opacity-0"
                    />
                  </div>
                )}
                {APPLE_CLIENT_ID && (
                  <button
                    type="button"
                    onClick={handleApple}
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-brand-border bg-white py-3 text-sm font-medium text-brand-foreground/80 transition-colors hover:bg-brand-muted/50 disabled:opacity-60"
                  >
                    <AppleIcon />
                    Continue with Apple
                  </button>
                )}
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

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.536c-.028-2.87 2.343-4.245 2.45-4.314-1.336-1.954-3.414-2.222-4.153-2.252-1.766-.179-3.448 1.04-4.345 1.04-.895 0-2.278-1.015-3.747-.987-1.927.028-3.703 1.12-4.695 2.846-2.003 3.475-.513 8.62 1.437 11.44.953 1.38 2.089 2.929 3.58 2.873 1.435-.057 1.977-.93 3.711-.93 1.733 0 2.222.93 3.742.902 1.544-.028 2.521-1.408 3.466-2.79 1.092-1.602 1.541-3.154 1.566-3.234-.034-.016-3.005-1.156-3.035-4.59zM14.27 4.13C15.063 3.17 15.595 1.835 15.45.5c-1.144.046-2.527.762-3.347 1.72-.736.85-1.378 2.21-1.206 3.515 1.276.099 2.578-.648 3.373-1.605z" />
    </svg>
  );
}
