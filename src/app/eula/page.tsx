import type { Metadata } from "next";
import { LegalShell, Section } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "End User License Agreement",
  description:
    "License terms for the Mckot mobile application used by vendors, riders, and related users.",
};

export default function EulaPage() {
  return (
    <LegalShell
      title="End User License Agreement (EULA)"
      description="This agreement governs your use of the Mckot mobile application and related client software we provide for Android and iOS."
      effectiveLabel="Effective date: replace this line before launch. Last reviewed: replace."
    >
      <Section title="Parties">
        <p>
          This End User License Agreement is between you (&quot;you&quot;) and Mckot (&quot;we&quot;,
          &quot;us&quot;) regarding the Mckot mobile application (the &quot;App&quot;).
        </p>
      </Section>
      <Section title="License grant">
        <p>
          Subject to these terms, we grant you a personal, non-exclusive, non-transferable, revocable license
          to install and use the App on devices you own or control, solely for legitimate business or personal
          use connected to Mckot logistics services.
        </p>
      </Section>
      <Section title="Accounts">
        <p>
          You may need an account. You are responsible for activity under your credentials and for complying
          with applicable rider or vendor rules communicated inside the App or by operations staff.
        </p>
      </Section>
      <Section title="Restrictions">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Copy, modify, reverse engineer, decompile, or attempt to extract source code except where law forbids this restriction.</li>
          <li>Rent, lease, sublicense, sell, or distribute the App.</li>
          <li>
            Circumvent security, misuse APIs, scrape data at scale, or interfere with other users&apos;
            experience.
          </li>
          <li>Use the App for unlawful goods, harassment, or unsafe behavior toward riders or customers.</li>
        </ul>
      </Section>
      <Section title="Updates">
        <p>
          We may ship updates, patches, or feature changes through app stores. Some updates may be required to
          continue using the App.
        </p>
      </Section>
      <Section title="Third-party services">
        <p>
          The App may integrate maps, notifications, analytics, or authentication providers. Their terms may
          apply in addition to ours.
        </p>
      </Section>
      <Section title="Privacy">
        <p>
          Our Privacy Policy explains how we handle personal data from the App and related channels. Using the
          App means you acknowledge that policy.
        </p>
      </Section>
      <Section title="Ownership">
        <p>
          We retain all rights to the App, trademarks, and related materials. No rights are granted except the
          limited license above.
        </p>
      </Section>
      <Section title="Disclaimer">
        <p>
          The App is provided &quot;as is&quot; without warranties of any kind to the extent permitted by law.
          We do not guarantee uninterrupted or error-free operation.
        </p>
      </Section>
      <Section title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, we are not liable for indirect or consequential damages arising
          from use of the App. Liability caps in our Terms of Service may also apply where services overlap.
        </p>
      </Section>
      <Section title="Termination">
        <p>
          You may stop using the App at any time by uninstalling it. We may suspend or terminate access if you
          violate these terms or create safety risks.
        </p>
      </Section>
      <Section title="App store terms">
        <p>
          If you download through Apple App Store or Google Play, those platforms&apos; rules apply as between
          you and the platform. Apple and Google are not responsible for providing support for the App unless
          required by their policies.
        </p>
      </Section>
      <Section title="Governing law">
        <p>
          This EULA is governed by the laws of Ghana. Courts in Accra shall have jurisdiction unless mandatory
          rules say otherwise.
        </p>
      </Section>
      <Section title="Contact">
        <p>Use the contact methods listed on our website if you have licensing questions about the App.</p>
      </Section>
    </LegalShell>
  );
}
