import { Section } from "@react-email/components";
import * as React from "react";
import { emailBrand } from "../brand";
import { EmailLayout } from "../components/EmailLayout";
import { EmailHeading } from "../components/EmailHeading";
import { EmailText } from "../components/EmailText";
import { EmailInfoRow } from "../components/EmailInfoRow";

export type VendorSignupInternalProps = {
  contactName: string;
  businessName: string;
  phone: string;
  socialHandle?: string;
  dailySales: string;
  deliveryZones: string[];
  submittedAt: string;
};

const SUBJECT_PREFIX = "[Signup]";
const PREVIEW = "A new vendor just submitted the Mckot signup form.";

const dailySalesLabel: Record<string, string> = {
  "1-2": "1 to 2 orders / day",
  "3-5": "3 to 5 orders / day",
  "6-10": "6 to 10 orders / day",
  "10+": "More than 10 orders / day",
};

export function buildVendorSignupInternalSubject(p: { businessName: string }): string {
  return `${SUBJECT_PREFIX} ${p.businessName}`;
}

export function VendorSignupInternalEmail({
  contactName,
  businessName,
  phone,
  socialHandle,
  dailySales,
  deliveryZones,
  submittedAt,
}: VendorSignupInternalProps) {
  return (
    <EmailLayout preview={PREVIEW} footerMode="transactional">
      <EmailHeading level={3}>New vendor signup</EmailHeading>
      <EmailHeading level={1}>{businessName}</EmailHeading>
      <EmailText muted small style={{ margin: "0 0 24px" }}>
        Submitted {submittedAt}. Reply via WhatsApp first &mdash; phone number below.
      </EmailText>

      <Section
        style={{
          backgroundColor: emailBrand.colors.surface,
          border: `1px solid ${emailBrand.colors.border}`,
          borderRadius: 10,
          padding: "8px 18px",
        }}
      >
        <EmailInfoRow label="Contact" value={contactName} />
        <EmailInfoRow label="Business" value={businessName} />
        <EmailInfoRow label="WhatsApp" value={phone} />
        <EmailInfoRow label="Social" value={socialHandle || "—"} />
        <EmailInfoRow label="Daily sales" value={dailySalesLabel[dailySales] ?? dailySales} />
        <EmailInfoRow
          label="Zones"
          value={deliveryZones.length ? deliveryZones.join(", ") : "—"}
        />
      </Section>

      <EmailText muted small style={{ margin: "20px 0 0" }}>
        Sent by mckot.com signup form. To stop these, change the internal recipient in the website
        env vars.
      </EmailText>
    </EmailLayout>
  );
}

VendorSignupInternalEmail.previewText = PREVIEW;

VendorSignupInternalEmail.PreviewProps = {
  contactName: "Akosua Mensah",
  businessName: "Akosua Threads",
  phone: "+233 50 123 4567",
  socialHandle: "@akosuathreads",
  dailySales: "3-5",
  deliveryZones: ["East Legon and Adjacent", "Osu, Ridge, Cantonments"],
  submittedAt: "May 14, 2026 · 14:32 GMT",
} satisfies VendorSignupInternalProps;

export default VendorSignupInternalEmail;
