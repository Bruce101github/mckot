import type { Metadata } from "next";
import { LegalShell, Section } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing use of Mckot logistics services, website, and vendor relationships in Ghana.",
};

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Service"
      description="These terms apply when you access our website, submit requests through our forms, or use Mckot delivery and related services."
      effectiveLabel="Effective date: replace this line before launch. Last reviewed: replace."
    >
      <Section title="Agreement">
        <p>
          By using Mckot services or continuing to work with us after we notify you of updates, you agree to
          these terms. If you use Mckot on behalf of a business, you confirm you have authority to bind that
          business.
        </p>
      </Section>
      <Section title="What we provide">
        <p>
          Mckot arranges last-mile logistics and related coordination for vendors and similar customers in
          areas we actively serve. Specific service levels, pricing, and coverage are confirmed in separate
          communications, rate cards, or written agreements where applicable.
        </p>
      </Section>
      <Section title="Accounts and eligibility">
        <p>
          You agree to provide accurate information, keep credentials secure, and promptly notify us of
          unauthorized access. We may suspend access when we reasonably suspect fraud, abuse, or risk to riders
          or customers.
        </p>
      </Section>
      <Section title="Vendor and sender responsibilities">
        <p>You agree to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Package goods safely and label them clearly.</li>
          <li>Declare restricted or fragile items honestly.</li>
          <li>Honor buyer refunds or replacements according to your own policies and applicable consumer rules.</li>
          <li>Provide lawful goods and comply with Ghanaian regulations.</li>
        </ul>
      </Section>
      <Section title="Fees and payments">
        <p>
          Charges follow the pricing communicated at booking or in your agreement. Late cancellations,
          redelivery attempts, or special handling may incur extra fees we disclose before charging where
          practical.
        </p>
      </Section>
      <Section title="Service limitations">
        <p>
          Delivery times are estimates. Traffic, weather, safety incidents, or force majeure events may cause
          delays. We are not responsible for delays outside reasonable control.
        </p>
      </Section>
      <Section title="Intellectual property">
        <p>
          Our branding, software, content on this website, and operational materials remain owned by Mckot or
          its licensors. You receive no license beyond what is necessary to use the services offered.
        </p>
      </Section>
      <Section title="Disclaimer">
        <p>
          Except where prohibited by law, services are provided &quot;as is&quot; without warranties of any kind,
          whether express or implied. Some jurisdictions do not allow certain disclaimers, so parts of this
          section may not apply to you.
        </p>
      </Section>
      <Section title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, Mckot is not liable for indirect, incidental, special,
          consequential, or punitive damages, or loss of profits, data, or goodwill, arising from these terms
          or the services. Our aggregate liability for claims arising from services in any twelve-month period is
          limited to the fees you paid Mckot for those services in that period unless a higher minimum applies
          under law.
        </p>
      </Section>
      <Section title="Indemnity">
        <p>
          You will defend and indemnify Mckot against third-party claims arising from your goods, your buyer
          disputes, or your violation of these terms, except to the extent caused by our gross negligence or
          willful misconduct.
        </p>
      </Section>
      <Section title="Termination">
        <p>
          Either party may stop using the services subject to outstanding deliveries and fees. We may suspend
          or terminate immediately for legal risk, unsafe goods, or repeated breaches.
        </p>
      </Section>
      <Section title="Governing law and disputes">
        <p>
          These terms are governed by the laws of Ghana. Courts located in Accra shall have exclusive
          jurisdiction, subject to any mandatory consumer protections that apply to you.
        </p>
      </Section>
      <Section title="Changes">
        <p>
          We may update these terms. Continued use after we post updates constitutes acceptance unless we are
          required to obtain separate consent.
        </p>
      </Section>
    </LegalShell>
  );
}
