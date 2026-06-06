"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

type Step = 0 | 1 | 2 | 3;

const STEPS = [
  { num: "01", title: "About you" },
  { num: "02", title: "Your business" },
  { num: "03", title: "Your fleet plans" },
  { num: "04", title: "How to pay you" },
] as const;

type VehicleType = "bike" | "car" | "truck";

interface FormState {
  // step 0
  owner_full_name: string;
  owner_phone: string;
  owner_email: string;
  owner_ghana_card_number: string;
  owner_date_of_birth: string;
  // step 1
  business_name: string;
  business_type:
    | "individual"
    | "sole_proprietorship"
    | "limited_company"
    | "partnership";
  business_registration_number: string;
  tax_id: string;
  // step 2
  expected_fleet_size: number;
  vehicle_types: VehicleType[];
  primary_operating_area: string;
  has_existing_vehicles: boolean;
  pitch: string;
  // step 3
  payout_method: "momo" | "bank";
  momo_provider: "mtn" | "telecel" | "airteltigo" | "";
  momo_phone: string;
  momo_holder_name: string;
  bank_name: string;
  bank_account_number: string;
  bank_account_name: string;
  // compliance
  accepted_terms: boolean;
}

const INITIAL: FormState = {
  owner_full_name: "",
  owner_phone: "",
  owner_email: "",
  owner_ghana_card_number: "",
  owner_date_of_birth: "",
  business_name: "",
  business_type: "individual",
  business_registration_number: "",
  tax_id: "",
  expected_fleet_size: 1,
  vehicle_types: ["bike"],
  primary_operating_area: "",
  has_existing_vehicles: true,
  pitch: "",
  payout_method: "momo",
  momo_provider: "mtn",
  momo_phone: "",
  momo_holder_name: "",
  bank_name: "",
  bank_account_number: "",
  bank_account_name: "",
  accepted_terms: false,
};

interface ApplyResponse {
  success: boolean;
  info?: {
    application_code?: string;
    status?: string;
    business_name?: string;
    submitted_at?: string;
  } | string;
  message?: string;
  duplicate?: boolean;
}

export function FleetApplicationForm() {
  const [step, setStep] = useState<Step>(0);
  const [data, setData] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ApplyResponse | null>(null);

  const stepValid = useMemo(() => validateStep(step, data), [step, data]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function toggleVehicle(v: VehicleType) {
    setData((d) => ({
      ...d,
      vehicle_types: d.vehicle_types.includes(v)
        ? d.vehicle_types.filter((x) => x !== v)
        : [...d.vehicle_types, v],
    }));
  }

  async function submit() {
    setError(null);
    setSubmitting(true);
    try {
      const r = await fetch("/api/fleet-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json: ApplyResponse = await r.json();
      if (!r.ok || !json.success) {
        setError(
          typeof json.info === "string"
            ? json.info
            : "Couldn't submit. Check your details and try again.",
        );
        return;
      }
      setResult(json);
    } catch {
      setError("Network error. Try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  if (result?.success) {
    return <SuccessPanel result={result} />;
  }

  return (
    <div className="rounded-3xl border border-brand-border bg-white shadow-soft">
      <Stepper step={step} />

      <div className="px-5 py-6 md:px-10 md:py-10">
        {step === 0 && <StepAboutYou data={data} update={update} />}
        {step === 1 && <StepBusiness data={data} update={update} />}
        {step === 2 && (
          <StepFleetPlans data={data} update={update} toggleVehicle={toggleVehicle} />
        )}
        {step === 3 && <StepPayout data={data} update={update} />}

        {error && (
          <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => (s > 0 ? ((s - 1) as Step) : s))}
            disabled={step === 0 || submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-white px-5 py-3 text-sm font-medium text-brand-foreground transition hover:border-brand-accent/40 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden /> Back
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={() => stepValid.ok && setStep((s) => ((s + 1) as Step))}
              disabled={!stepValid.ok}
              title={!stepValid.ok ? stepValid.message : undefined}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-dark px-6 py-3 text-sm font-semibold text-brand-dark-foreground transition hover:bg-brand-dark-muted disabled:opacity-40"
            >
              Continue
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => stepValid.ok && submit()}
              disabled={!stepValid.ok || submitting}
              title={!stepValid.ok ? stepValid.message : undefined}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-dark shadow-glow transition hover:bg-brand-accent-hover disabled:opacity-40"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Submitting…
                </>
              ) : (
                <>
                  Submit application
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </>
              )}
            </button>
          )}
        </div>

        {!stepValid.ok && stepValid.message && (
          <p className="mt-3 text-right text-xs text-brand-foreground/55">
            {stepValid.message}
          </p>
        )}
      </div>
    </div>
  );
}

function SuccessPanel({ result }: { result: ApplyResponse }) {
  const info = typeof result.info === "object" && result.info ? result.info : null;
  return (
    <div className="rounded-3xl border border-brand-accent/30 bg-brand-accent/5 p-8 text-center md:p-12">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-accent/20 text-brand-accent">
        <CheckCircle2 className="h-8 w-8" aria-hidden />
      </div>
      <h3 className="mt-6 text-2xl font-bold tracking-tight text-brand-foreground md:text-3xl">
        {result.duplicate ? "You've already applied" : "You're in the queue"}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-balance text-sm text-brand-foreground/70 md:text-base">
        {result.message ??
          "We'll review your details and get back to you within two business days."}
      </p>

      {info?.application_code && (
        <div className="mx-auto mt-6 inline-flex flex-col items-center rounded-2xl border border-brand-border bg-white px-6 py-4">
          <p className="text-xs uppercase tracking-wider text-brand-foreground/50">
            Application code
          </p>
          <p className="mt-1 select-all font-mono text-xl font-semibold tracking-wide text-brand-foreground">
            {info.application_code}
          </p>
          <p className="mt-1 text-xs text-brand-foreground/55">
            Save this, you&rsquo;ll need it to check status.
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="/become-a-fleet-partner/status"
          className="inline-flex items-center justify-center rounded-xl border border-brand-border bg-white px-5 py-3 text-sm font-medium text-brand-foreground transition hover:border-brand-accent/40"
        >
          Check status
        </a>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-brand-dark px-5 py-3 text-sm font-semibold text-brand-dark-foreground transition hover:bg-brand-dark-muted"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// step renderers
// ──────────────────────────────────────────────────────────────────────

function StepAboutYou({
  data,
  update,
}: {
  data: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <StepHeader
        title="About you"
        subtitle="The person legally responsible for this fleet."
      />
      <Field
        label="Full name"
        required
        value={data.owner_full_name}
        onChange={(v) => update("owner_full_name", v)}
        placeholder="As written on your Ghana Card"
        autoComplete="name"
      />
      <Field
        label="Phone (WhatsApp)"
        required
        value={data.owner_phone}
        onChange={(v) => update("owner_phone", v)}
        placeholder="0244 123 456"
        type="tel"
        autoComplete="tel"
      />
      <Field
        label="Email"
        required
        value={data.owner_email}
        onChange={(v) => update("owner_email", v)}
        placeholder="you@example.com"
        type="email"
        autoComplete="email"
      />
      <Field
        label="Date of birth"
        value={data.owner_date_of_birth}
        onChange={(v) => update("owner_date_of_birth", v)}
        type="date"
      />
      <Field
        label="Ghana Card number"
        value={data.owner_ghana_card_number}
        onChange={(v) =>
          update("owner_ghana_card_number", v.toUpperCase().slice(0, 16))
        }
        placeholder="GHA-XXXXXXXXX-X"
        wide
      />
    </div>
  );
}

function StepBusiness({
  data,
  update,
}: {
  data: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  const showReg = data.business_type !== "individual";
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <StepHeader
        title="Your business"
        subtitle="If you operate as an individual, that's fine, just say so."
      />
      <Field
        label="Business name"
        required
        value={data.business_name}
        onChange={(v) => update("business_name", v)}
        placeholder="e.g. Kintampo Logistics"
      />
      <SelectField
        label="Business type"
        value={data.business_type}
        onChange={(v) =>
          update("business_type", v as FormState["business_type"])
        }
        options={[
          { value: "individual", label: "Individual investor" },
          { value: "sole_proprietorship", label: "Sole proprietorship" },
          { value: "limited_company", label: "Limited liability company" },
          { value: "partnership", label: "Partnership" },
        ]}
      />
      {showReg && (
        <>
          <Field
            label="RGD registration number"
            value={data.business_registration_number}
            onChange={(v) => update("business_registration_number", v)}
            placeholder="Required for registered entities"
          />
          <Field
            label="Tax ID (TIN)"
            value={data.tax_id}
            onChange={(v) => update("tax_id", v)}
            placeholder="Optional"
          />
        </>
      )}
    </div>
  );
}

function StepFleetPlans({
  data,
  update,
  toggleVehicle,
}: {
  data: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  toggleVehicle: (v: VehicleType) => void;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <StepHeader
        title="Your fleet plans"
        subtitle="Tell us what you'd like to run on Mckot."
      />
      <Field
        label="How many vehicles?"
        required
        type="number"
        min={1}
        max={9999}
        value={String(data.expected_fleet_size)}
        onChange={(v) => update("expected_fleet_size", Math.max(1, Number(v) || 1))}
      />
      <Field
        label="Primary operating area"
        value={data.primary_operating_area}
        onChange={(v) => update("primary_operating_area", v)}
        placeholder="e.g. Accra · East Legon, Spintex"
      />
      <div className="md:col-span-2">
        <span className="block text-sm font-medium text-brand-foreground/80">
          Vehicle types you plan to operate
        </span>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {(["bike", "car", "truck"] as VehicleType[]).map((v) => {
            const on = data.vehicle_types.includes(v);
            return (
              <button
                key={v}
                type="button"
                onClick={() => toggleVehicle(v)}
                className={
                  "rounded-xl border px-3 py-3 text-sm font-medium capitalize transition " +
                  (on
                    ? "border-brand-accent bg-brand-accent/15 text-brand-foreground"
                    : "border-brand-border bg-white text-brand-foreground/70 hover:border-brand-accent/30")
                }
                aria-pressed={on}
              >
                {v === "bike" ? "🛵 Motorcycle" : v === "car" ? "🚗 Car" : "🚚 Truck"}
              </button>
            );
          })}
        </div>
      </div>

      <div className="md:col-span-2">
        <label className="flex items-start gap-3 rounded-xl border border-brand-border bg-brand-surface/50 px-4 py-3 text-sm text-brand-foreground/75">
          <input
            type="checkbox"
            checked={data.has_existing_vehicles}
            onChange={(e) => update("has_existing_vehicles", e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-brand-accent"
          />
          I already own the vehicles I plan to operate.
        </label>
      </div>

      <div className="md:col-span-2">
        <label
          htmlFor="pitch"
          className="block text-sm font-medium text-brand-foreground/80"
        >
          Anything we should know? <span className="text-brand-foreground/45">(optional)</span>
        </label>
        <textarea
          id="pitch"
          rows={4}
          value={data.pitch}
          onChange={(e) => update("pitch", e.target.value.slice(0, 4000))}
          placeholder="Why you're joining, your experience, growth goals…"
          className="mt-2 w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm text-brand-foreground outline-none placeholder:text-brand-foreground/35 focus:ring-2 focus:ring-brand-accent/40"
        />
      </div>
    </div>
  );
}

function StepPayout({
  data,
  update,
}: {
  data: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <StepHeader
        title="How to pay you"
        subtitle="Where your share of every trip will be settled."
      />

      <div className="md:col-span-2">
        <span className="block text-sm font-medium text-brand-foreground/80">
          Payout method
        </span>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {(["momo", "bank"] as const).map((m) => {
            const on = data.payout_method === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => update("payout_method", m)}
                className={
                  "rounded-xl border px-3 py-3 text-sm font-medium transition " +
                  (on
                    ? "border-brand-accent bg-brand-accent/15 text-brand-foreground"
                    : "border-brand-border bg-white text-brand-foreground/70 hover:border-brand-accent/30")
                }
                aria-pressed={on}
              >
                {m === "momo" ? "📱 Mobile money" : "🏦 Bank account"}
              </button>
            );
          })}
        </div>
      </div>

      {data.payout_method === "momo" ? (
        <>
          <SelectField
            label="Provider"
            value={data.momo_provider}
            onChange={(v) => update("momo_provider", v as FormState["momo_provider"])}
            options={[
              { value: "mtn", label: "MTN MoMo" },
              { value: "telecel", label: "Telecel Cash" },
              { value: "airteltigo", label: "AirtelTigo Money" },
            ]}
          />
          <Field
            label="Mobile money number"
            value={data.momo_phone}
            onChange={(v) => update("momo_phone", v)}
            placeholder="0244 123 456"
            type="tel"
          />
          <Field
            label="Account holder name"
            value={data.momo_holder_name}
            onChange={(v) => update("momo_holder_name", v)}
            placeholder="Name registered on the wallet"
            wide
          />
        </>
      ) : (
        <>
          <Field
            label="Bank name"
            value={data.bank_name}
            onChange={(v) => update("bank_name", v)}
            placeholder="e.g. Stanbic Bank"
          />
          <Field
            label="Account number"
            value={data.bank_account_number}
            onChange={(v) => update("bank_account_number", v)}
            placeholder="13 digits"
          />
          <Field
            label="Account name"
            value={data.bank_account_name}
            onChange={(v) => update("bank_account_name", v)}
            placeholder="As registered with the bank"
            wide
          />
        </>
      )}

      <div className="md:col-span-2">
        <label className="flex items-start gap-3 text-sm text-brand-foreground/75">
          <input
            type="checkbox"
            checked={data.accepted_terms}
            onChange={(e) => update("accepted_terms", e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-brand-accent"
          />
          <span>
            I confirm the information above is accurate and I agree to the{" "}
            <a href="/terms" className="underline">
              Mckot Fleet partner terms
            </a>
            . Mckot will verify my identity and business documents before
            activating the account.
          </span>
        </label>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// small primitives
// ──────────────────────────────────────────────────────────────────────

function Stepper({ step }: { step: Step }) {
  return (
    <ol className="grid grid-cols-4 border-b border-brand-border">
      {STEPS.map((s, i) => {
        const done = i < step;
        const current = i === step;
        return (
          <li
            key={s.num}
            className={
              "flex items-center gap-3 px-3 py-4 text-xs sm:px-5 sm:text-sm " +
              (current
                ? "bg-brand-surface/60 font-semibold text-brand-foreground"
                : "text-brand-foreground/55") +
              (i > 0 ? " border-l border-brand-border" : "")
            }
          >
            <span
              className={
                "grid h-7 w-7 place-items-center rounded-full text-xs font-bold " +
                (done
                  ? "bg-brand-accent text-brand-dark"
                  : current
                    ? "bg-brand-dark text-brand-dark-foreground"
                    : "bg-brand-muted text-brand-foreground/55")
              }
            >
              {done ? "✓" : s.num}
            </span>
            <span className="hidden sm:inline">{s.title}</span>
          </li>
        );
      })}
    </ol>
  );
}

function StepHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <header className="md:col-span-2">
      <h3 className="text-2xl font-bold tracking-tight text-brand-foreground md:text-3xl">
        {title}
      </h3>
      <p className="mt-1 text-sm text-brand-foreground/65">{subtitle}</p>
    </header>
  );
}

function Field({
  label,
  required,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  min,
  max,
  wide,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  min?: number;
  max?: number;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "md:col-span-2" : undefined}>
      <label className="block text-sm font-medium text-brand-foreground/80">
        {label} {required && <span className="text-brand-accent">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        min={min}
        max={max}
        required={required}
        className="mt-2 w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm text-brand-foreground outline-none placeholder:text-brand-foreground/35 focus:ring-2 focus:ring-brand-accent/40"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-foreground/80">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm text-brand-foreground outline-none focus:ring-2 focus:ring-brand-accent/40"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// validation
// ──────────────────────────────────────────────────────────────────────

function validateStep(
  step: Step,
  d: FormState,
): { ok: boolean; message?: string } {
  if (step === 0) {
    if (!d.owner_full_name.trim()) return { ok: false, message: "Add your full name." };
    if (!normalizePhone(d.owner_phone))
      return { ok: false, message: "Phone must be a Ghanaian number." };
    if (!isEmail(d.owner_email))
      return { ok: false, message: "Enter a valid email address." };
    return { ok: true };
  }
  if (step === 1) {
    if (!d.business_name.trim())
      return { ok: false, message: "Give your business or operating name." };
    if (
      d.business_type !== "individual" &&
      !d.business_registration_number.trim()
    )
      return {
        ok: false,
        message: "Add your RGD registration number for registered entities.",
      };
    return { ok: true };
  }
  if (step === 2) {
    if (d.expected_fleet_size < 1)
      return { ok: false, message: "How many vehicles do you plan to run?" };
    if (d.vehicle_types.length === 0)
      return { ok: false, message: "Pick at least one vehicle type." };
    return { ok: true };
  }
  // step 3
  if (d.payout_method === "momo") {
    if (!normalizePhone(d.momo_phone))
      return { ok: false, message: "Add a valid MoMo number." };
    if (!d.momo_holder_name.trim())
      return { ok: false, message: "Add the MoMo account holder name." };
  } else {
    if (!d.bank_name.trim())
      return { ok: false, message: "Add the bank name." };
    if (!d.bank_account_number.trim())
      return { ok: false, message: "Add the bank account number." };
    if (!d.bank_account_name.trim())
      return { ok: false, message: "Add the account holder name." };
  }
  if (!d.accepted_terms)
    return { ok: false, message: "Tick the agreement box to continue." };
  return { ok: true };
}

function normalizePhone(raw: string): string {
  const cleaned = raw.replace(/[^\d+]/g, "");
  if (/^\+233\d{9}$/.test(cleaned)) return cleaned.slice(1);
  if (/^233\d{9}$/.test(cleaned)) return cleaned;
  if (/^0\d{9}$/.test(cleaned)) return "233" + cleaned.slice(1);
  return "";
}

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
