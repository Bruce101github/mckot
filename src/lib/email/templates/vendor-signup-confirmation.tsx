import { Section } from "@react-email/components";
import * as React from "react";
import { siteConfig } from "@/lib/site";
import { emailBrand } from "../brand";
import { EmailLayout } from "../components/EmailLayout";
import { EmailHeading } from "../components/EmailHeading";
import { EmailText } from "../components/EmailText";
import { EmailButton } from "../components/EmailButton";
import { EmailCallout } from "../components/EmailCallout";
import { EmailDivider } from "../components/EmailDivider";

export type VendorSignupConfirmationProps = {
  firstName: string;
  businessName: string;
  whatsappUrl?: string;
};

const SUBJECT = "Welcome to Mckot — let's get your first delivery booked";
const PREVIEW =
  "Your 3 free deliveries are ready. Here's how to book your first one over WhatsApp.";

function firstNameOrFallback(name: string): string {
  const trimmed = (name ?? "").trim().split(/\s+/)[0];
  return trimmed || "there";
}

export function VendorSignupConfirmationEmail({
  firstName,
  businessName,
  whatsappUrl,
}: VendorSignupConfirmationProps) {
  const greetingName = firstNameOrFallback(firstName);
  const waUrl = whatsappUrl || siteConfig.social.whatsapp;
  const offerHeadline = siteConfig.offer.headline;

  return (
    <EmailLayout preview={PREVIEW} footerMode="transactional">
      <EmailHeading level={3}>You&rsquo;re in</EmailHeading>
      <EmailHeading level={1}>
        Welcome to Mckot, {greetingName}.
      </EmailHeading>

      <EmailText>
        We got your signup for <strong style={{ color: emailBrand.colors.foreground }}>{businessName}</strong>.
        I&rsquo;m Bruce, the founder &mdash; I look at every new vendor that comes in, so I wanted to write
        you personally.
      </EmailText>

      <EmailCallout tone="accent">
        <EmailText
          style={{
            margin: 0,
            fontSize: 13,
            lineHeight: "18px",
            color: emailBrand.colors.foregroundMuted,
            textTransform: "uppercase",
            letterSpacing: 0.6,
            fontWeight: 600,
          }}
        >
          Your launch offer
        </EmailText>
        <EmailText
          style={{
            margin: "6px 0 0",
            fontSize: 18,
            lineHeight: "26px",
            color: emailBrand.colors.foreground,
            fontWeight: 700,
          }}
        >
          {offerHeadline}.
        </EmailText>
        <EmailText muted small style={{ margin: "6px 0 0" }}>
          No card on file, no fine print. Book your first three deliveries within 30 days and we cover
          the rider fee. You only handle your cash-on-delivery as normal.
        </EmailText>
      </EmailCallout>

      <EmailHeading level={2}>Here&rsquo;s what happens next</EmailHeading>

      <Section style={{ margin: "8px 0 16px" }}>
        <EmailText style={{ margin: "0 0 10px" }}>
          <strong>1.</strong> Tap the green button below. It opens WhatsApp with a short message
          already typed &mdash; just send it.
        </EmailText>
        <EmailText style={{ margin: "0 0 10px" }}>
          <strong>2.</strong> Our ops team replies within one business day to confirm your pickup
          point and walk you through booking.
        </EmailText>
        <EmailText style={{ margin: "0 0 10px" }}>
          <strong>3.</strong> You book your first delivery the same day. A rider shows up at your
          pickup point. We deliver, collect cash on delivery if needed, and settle within 24 hours.
        </EmailText>
      </Section>

      <Section style={{ textAlign: "center", margin: "24px 0 8px" }}>
        <EmailButton href={waUrl} fullWidth>
          Start on WhatsApp &rarr;
        </EmailButton>
      </Section>
      <EmailText muted small style={{ textAlign: "center", margin: "0 0 8px" }}>
        Prefer to call? {siteConfig.phones.primaryFormatted}
      </EmailText>

      <EmailDivider spacing={28} />

      <EmailText style={{ margin: 0 }}>
        If WhatsApp isn&rsquo;t your thing, just reply to this email &mdash; it comes straight to
        our team. Welcome aboard. We&rsquo;re glad you&rsquo;re here.
      </EmailText>

      <EmailText style={{ margin: "20px 0 0" }} bold>
        &mdash; {emailBrand.founder.name}
      </EmailText>
      <EmailText muted small style={{ margin: "2px 0 0" }}>
        {emailBrand.founder.role}
      </EmailText>
    </EmailLayout>
  );
}

VendorSignupConfirmationEmail.subject = SUBJECT;
VendorSignupConfirmationEmail.previewText = PREVIEW;

VendorSignupConfirmationEmail.PreviewProps = {
  firstName: "Akosua",
  businessName: "Akosua Threads",
} satisfies VendorSignupConfirmationProps;

export default VendorSignupConfirmationEmail;
