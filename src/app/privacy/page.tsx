import type { Metadata } from "next";
import { LegalShell, Section } from "@/components/LegalShell";
import { siteConfig } from "@/lib/site";

const PRIVACY_EMAIL = "contact@mckot.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Mckot collects, uses, shares, and protects personal data across the Mckot mobile app and website for customers and riders in Ghana.",
  alternates: { canonical: `${siteConfig.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      description="How we handle personal information when you use the Mckot mobile app (com.mckot.app), our website, and related ride-hailing and delivery services."
      effectiveLabel="Effective date: 11 June 2026. Last reviewed: 11 June 2026."
    >
      <Section title="Who we are and what this covers">
        <p>
          Mckot (&quot;we&quot;, &quot;us&quot;) provides ride-hailing and parcel-delivery
          technology services focused on Greater Accra, Ghana. This policy explains how we
          collect, use, share, and protect personal data when you use the{" "}
          <strong>Mckot mobile app</strong> (Android/iOS, package{" "}
          <code>com.mckot.app</code>), book on our website, or contact us. It applies to both{" "}
          <strong>customers</strong> (people requesting rides and deliveries) and{" "}
          <strong>riders</strong> (drivers and couriers who fulfil them).
        </p>
      </Section>

      <Section title="Information we collect">
        <p>Depending on how you use Mckot, we collect the following categories of data:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Personal &amp; identity data:</strong> name, phone number, email address (if
            you sign in with Google or Apple), profile photo, your account identifier, country,
            and language preference.
          </li>
          <li>
            <strong>Identity verification (KYC) data:</strong> if you complete identity
            verification (required for riders, and for customers who want to withdraw funds), we
            collect your Ghana Card number, date of birth, gender, a selfie, and photos of your
            Ghana Card or driver&apos;s licence.
          </li>
          <li>
            <strong>Location data:</strong> precise and approximate location, including{" "}
            <strong>background location for riders</strong> while they are online (see the
            dedicated section below).
          </li>
          <li>
            <strong>Financial data:</strong> wallet balance and transaction history, a saved-card
            token and card metadata (last four digits, brand) via our payment processor, mobile
            money account details, and payout/referral records. We never store your full card
            number.
          </li>
          <li>
            <strong>Messages &amp; content:</strong> in-app chat messages and images you exchange
            with the other party on a trip, plus delivery notes, package descriptions, saved
            addresses, recent searches, and ratings you provide.
          </li>
          <li>
            <strong>Photos:</strong> a profile photo, KYC document images, and any images you send
            in chat.
          </li>
          <li>
            <strong>App activity &amp; technical data:</strong> in-app interactions and feature
            usage, device and push-notification identifiers, crash logs, and diagnostics.
          </li>
        </ul>
      </Section>

      <Section title="How we use your information">
        <p>We use personal data to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Provide the service (app functionality):</strong> match riders and customers,
            calculate routes and fares, show live tracking, process payments and payouts, and
            enable in-app chat.
          </li>
          <li>
            <strong>Manage your account:</strong> create and authenticate your account (phone +
            one-time SMS code, or Google/Apple sign-in) and maintain your profile.
          </li>
          <li>
            <strong>Fraud prevention, security &amp; compliance:</strong> verify identity (KYC),
            protect against fraud and abuse, and meet legal, tax, accounting, and regulatory
            obligations.
          </li>
          <li>
            <strong>Analytics &amp; reliability:</strong> understand how the app is used and
            diagnose crashes and performance issues so we can improve the service.
          </li>
          <li>
            <strong>Developer communications:</strong> send operational notifications such as trip
            updates and important service or security notices.
          </li>
        </ul>
        <p className="mt-3">
          We do <strong>not</strong> use your data for third-party advertising, and we do{" "}
          <strong>not</strong> sell your personal data.
        </p>
      </Section>

      <Section title="Background location (riders)">
        <p>
          When a rider goes online to receive and complete trips, the Mckot app collects their
          precise location <strong>in the background</strong> — including when the app is closed or
          not in use — so that we can dispatch nearby requests and share the rider&apos;s live
          location with the customer during a trip. Background location collection runs only while
          the rider is online and stops when they go offline. Customers&apos; location is collected
          while they are booking or on an active trip. You can control location access at any time
          through your device settings, though disabling it will prevent core features from working.
        </p>
      </Section>

      <Section title="How we share information">
        <p>
          <strong>With other users:</strong> to complete a trip or delivery, we share the
          information necessary between the customer and the assigned rider — for example name,
          profile photo, approximate or precise location, and chat messages — so they can find each
          other and communicate.
        </p>
        <p className="mt-3">
          <strong>With service providers</strong> who process data on our behalf to run the
          service:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Google Firebase</strong> — push notification delivery and app analytics.
          </li>
          <li>
            <strong>Pusher Beams</strong> — push notification delivery.
          </li>
          <li>
            <strong>Google Maps and Mapbox</strong> — maps, geocoding, and routing.
          </li>
          <li>
            <strong>Sentry</strong> — crash reporting and diagnostics.
          </li>
          <li>
            <strong>Paystack</strong> — card payment processing.
          </li>
          <li>
            <strong>Hubtel</strong> — mobile money payments, payouts, and Ghana Card verification.
          </li>
          <li>
            <strong>Cloud hosting and storage providers</strong> (including Amazon Web Services)
            that store our data and uploaded files.
          </li>
        </ul>
        <p className="mt-3">
          <strong>With authorities</strong> when required by law, to comply with legal process, or
          to protect the safety of users and the public. We do not sell personal data or share it
          with advertising networks.
        </p>
      </Section>

      <Section title="Data retention">
        <p>
          We keep personal data only as long as needed to provide the service and for legitimate
          business and legal purposes, such as dispute resolution, fraud prevention, accounting,
          tax, and regulatory compliance. When you delete your account, we remove your personal
          data after a 30-day grace period, except for limited records we are required to retain by
          law. See <a className="font-semibold text-brand-accent hover:underline" href="/delete-account">how to delete your account</a>.
        </p>
      </Section>

      <Section title="Security">
        <p>
          All data is encrypted in transit using TLS/HTTPS. We apply reasonable administrative,
          technical, and physical safeguards designed to protect personal data, including access
          controls and private storage for sensitive identity documents. No method of transmission
          or storage is completely secure, but we work to protect your information.
        </p>
      </Section>

      <Section title="Your choices and rights">
        <p>
          You may request access to, correction of, or deletion of your personal data, in line with
          applicable Ghanaian data-protection requirements. You can:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Delete your account and associated data</strong> from within the app
            (Settings &rarr; Delete account) or via{" "}
            <a className="font-semibold text-brand-accent hover:underline" href="/delete-account">
              {siteConfig.url.replace(/^https?:\/\//, "")}/delete-account
            </a>
            .
          </li>
          <li>
            <strong>Manage permissions</strong> such as location, camera, contacts, and
            notifications through your device settings.
          </li>
          <li>
            <strong>Contact us</strong> to exercise your rights. We may need to verify your identity
            before acting on a request.
          </li>
        </ul>
      </Section>

      <Section title="International transfers">
        <p>
          Some of the service providers above store and process data outside Ghana. Where data is
          transferred internationally, we take steps intended to ensure appropriate safeguards
          consistent with applicable law.
        </p>
      </Section>

      <Section title="Children">
        <p>
          Mckot is intended for users aged 18 and over and is not directed to children. We do not
          knowingly collect data from children. If you believe a child has provided us data, please
          contact us so we can remove it.
        </p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          We may update this policy from time to time. We will post changes on this page and update
          the effective date above. Significant changes may also be communicated in the app.
        </p>
      </Section>

      <Section title="Contact us">
        <p>
          For privacy questions or requests, contact us at{" "}
          <a className="font-semibold text-brand-accent hover:underline" href={`mailto:${PRIVACY_EMAIL}`}>
            {PRIVACY_EMAIL}
          </a>{" "}
          or call {siteConfig.phones.primaryFormatted}.
        </p>
      </Section>
    </LegalShell>
  );
}
