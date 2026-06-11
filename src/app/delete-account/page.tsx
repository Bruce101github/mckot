import type { Metadata } from "next";
import { LegalShell, Section } from "@/components/LegalShell";
import { siteConfig } from "@/lib/site";

const SUPPORT_EMAIL = "contact@mckot.com";

const mailtoRequest = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
  "Account deletion request",
)}&body=${encodeURIComponent(
  [
    "I would like to delete my Mckot account and associated data.",
    "",
    "Registered phone number (with +233): ",
    "Registered name: ",
    "",
    "I understand that outstanding wallet balance, an active trip, or",
    "money owed for cash-on-delivery may need to be resolved first, and",
    "that some records may be retained where the law requires it.",
  ].join("\n"),
)}`;

export const metadata: Metadata = {
  title: "Delete your account",
  description:
    "How to delete your Mckot account and associated data, what is removed, what is retained, and how long it takes.",
  alternates: { canonical: `${siteConfig.url}/delete-account` },
};

export default function DeleteAccountPage() {
  return (
    <LegalShell
      title="Delete your account"
      description="Request deletion of your Mckot account and the personal data associated with it."
      effectiveLabel="This page applies to the Mckot mobile app (com.mckot.app) and the Mckot account it creates."
    >
      <Section title="Option 1: Delete in the app (fastest)">
        <p>
          If you can still sign in, you can delete your account directly from the app. It is the
          quickest route and confirms your identity with a one-time SMS code:
        </p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Open the Mckot app and sign in.</li>
          <li>
            Go to <strong>Settings</strong> &rarr; <strong>Delete account</strong>.
          </li>
          <li>
            Review the on-screen summary, then tap <strong>Continue</strong>. We send a one-time
            code to your registered phone number.
          </li>
          <li>Enter the code to confirm. Your account is then closed immediately.</li>
        </ol>
      </Section>

      <Section title="Option 2: Request deletion without the app">
        <p>
          If you can no longer access the app or your phone number, you can ask us to delete your
          account for you. Email{" "}
          <a className="font-semibold text-brand-accent hover:underline" href={mailtoRequest}>
            {SUPPORT_EMAIL}
          </a>{" "}
          from any email address, or message us on{" "}
          <a
            className="font-semibold text-brand-accent hover:underline"
            href={siteConfig.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          , and include:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            The <strong>phone number</strong> registered to your Mckot account (with the +233 code).
          </li>
          <li>The name on the account.</li>
        </ul>
        <p>
          We verify ownership of the number before deleting, so we may contact you to confirm. We
          action verified requests within <strong>30 days</strong>.
        </p>
      </Section>

      <Section title="Before you delete">
        <p>
          For your protection, deletion is blocked while any of the following are open. Please
          resolve them first (the app tells you which apply to you):
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>A trip or delivery that is currently in progress.</li>
          <li>
            A remaining <strong>wallet balance</strong>, which you should withdraw or spend first,
            as it is not refundable after deletion.
          </li>
          <li>Money owed for a cash-on-delivery order.</li>
          <li>An identity verification (KYC) check still being reviewed.</li>
        </ul>
      </Section>

      <Section title="What gets deleted">
        <p>
          Once confirmed, your account is closed and your access tokens are revoked immediately.
          After a <strong>30-day grace period</strong> we permanently remove the personal data tied
          to your account, including:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Your profile (name, phone number, email, and profile photo).</li>
          <li>Saved addresses and recent search history.</li>
          <li>In-app chat messages and any images you shared in chat.</li>
          <li>Saved payment methods and identity-verification (KYC) documents.</li>
          <li>Device and push-notification identifiers used to reach your account.</li>
        </ul>
      </Section>

      <Section title="The 30-day grace period">
        <p>
          For the first 30 days your account is deactivated but recoverable. If you change your mind,
          simply sign in again within that window and the deletion is cancelled automatically. After
          30 days the removal is permanent and cannot be undone.
        </p>
      </Section>

      <Section title="What we may keep">
        <p>
          We retain a limited set of records where the law requires it or to protect against fraud
          and resolve disputes, for example transaction and payment records needed for accounting,
          tax, and regulatory obligations. These are kept only as long as required and are not used
          to re-create your account.
        </p>
      </Section>

      <Section title="Questions">
        <p>
          For anything about this process, contact us at{" "}
          <a className="font-semibold text-brand-accent hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>{" "}
          or call {siteConfig.phones.primaryFormatted}. See also our{" "}
          <a className="font-semibold text-brand-accent hover:underline" href="/privacy">
            Privacy Policy
          </a>
          .
        </p>
      </Section>
    </LegalShell>
  );
}
