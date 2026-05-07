import type { Metadata } from "next";
import { LegalShell, Section } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Mckot collects, uses, and protects personal data for vendors, buyers, and visitors in Ghana.",
};

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      description="How we handle personal information when you use Mckot websites, forms, and related delivery services."
      effectiveLabel="Effective date: replace this line before launch. Last reviewed: replace."
    >
      <Section title="Who we are">
        <p>
          Mckot (&quot;we&quot;, &quot;us&quot;) provides logistics and related technology services focused on
          Greater Accra, Ghana. This policy explains how we process personal data in connection with those
          services.
        </p>
      </Section>
      <Section title="Information we collect">
        <p>We may collect the following categories of information depending on how you interact with us:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Contact and identity data:</strong> name, phone number, WhatsApp details, email address,
            social handles you share on signup forms.
          </li>
          <li>
            <strong>Business data:</strong> shop name, pickup addresses, delivery addresses, order notes,
            and estimates you provide about shipment volumes.
          </li>
          <li>
            <strong>Technical data:</strong> device type, browser type, approximate region from IP address,
            cookies or similar technologies on our marketing site when enabled.
          </li>
          <li>
            <strong>Communications:</strong> messages you send us through WhatsApp, email, or in-app
            channels where applicable.
          </li>
        </ul>
      </Section>
      <Section title="How we use information">
        <p>We use personal data to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Provide scheduling, dispatch, delivery coordination, and customer support.</li>
          <li>Authenticate accounts, prevent fraud, and protect platform integrity.</li>
          <li>Improve routing, performance metrics, and product features.</li>
          <li>Send operational notices, safety alerts, and optional marketing where consent applies.</li>
          <li>Meet legal, regulatory, and insurance obligations.</li>
        </ul>
      </Section>
      <Section title="Legal bases">
        <p>
          Where relevant laws require a legal basis, we rely on performance of a contract, legitimate
          interests that are not overridden by your rights, consent where we ask for it, and compliance with
          legal obligations.
        </p>
      </Section>
      <Section title="Sharing">
        <p>We may share data with:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Riders, fulfillment partners, or subcontractors involved in completing deliveries.</li>
          <li>
            Service providers such as hosting, messaging gateways, maps providers, analytics (where
            configured), and payment processors when payments apply.
          </li>
          <li>Authorities when required by law or to protect safety.</li>
        </ul>
        <p className="mt-3">We do not sell personal data.</p>
      </Section>
      <Section title="Retention">
        <p>
          We keep information only as long as needed for the purposes above, including dispute resolution,
          accounting, and audit trails, unless a longer period is required by law.
        </p>
      </Section>
      <Section title="Security">
        <p>
          We apply reasonable administrative, technical, and physical safeguards designed to protect personal
          data. No method of transmission over the internet is completely secure.
        </p>
      </Section>
      <Section title="Your choices and rights">
        <p>
          You may request access, correction, deletion, or restriction in line with applicable Ghanaian data
          protection requirements. Contact us using the details on our Contact page. We may need to verify
          your identity before fulfilling requests.
        </p>
      </Section>
      <Section title="International transfers">
        <p>
          Where tools we use store data outside Ghana, we aim to ensure appropriate safeguards consistent with
          applicable law.
        </p>
      </Section>
      <Section title="Children">
        <p>Our services are not directed to children. If you believe we collected data from a child, contact us.</p>
      </Section>
      <Section title="Updates">
        <p>
          We may update this policy from time to time. We will post changes on this page and adjust the
          effective date when appropriate.
        </p>
      </Section>
    </LegalShell>
  );
}
