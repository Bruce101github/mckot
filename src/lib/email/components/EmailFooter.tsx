import { Hr, Link, Section, Text } from "@react-email/components";
import * as React from "react";
import { emailBrand } from "../brand";

export type FooterMode = "transactional" | "marketing";

type Props = {
  mode?: FooterMode;
  unsubscribeUrl?: string;
};

const socials: { label: string; href: string }[] = [
  { label: "WhatsApp", href: emailBrand.links.whatsapp },
  { label: "Instagram", href: emailBrand.links.instagram },
  { label: "TikTok", href: emailBrand.links.tiktok },
  { label: "Facebook", href: emailBrand.links.facebook },
];

export function EmailFooter({ mode = "transactional", unsubscribeUrl }: Props) {
  return (
    <Section
      style={{
        backgroundColor: emailBrand.colors.dark,
        borderRadius: `0 0 ${emailBrand.layout.radius}px ${emailBrand.layout.radius}px`,
        padding: "28px",
        marginTop: 0,
        color: emailBrand.colors.darkForeground,
      }}
    >
      <Text
        style={{
          margin: 0,
          fontSize: 14,
          lineHeight: "20px",
          color: emailBrand.colors.darkForeground,
          fontWeight: 600,
          letterSpacing: 0.2,
        }}
      >
        Mckot
      </Text>
      <Text
        style={{
          margin: "4px 0 0",
          fontSize: 13,
          lineHeight: "20px",
          color: emailBrand.colors.darkForegroundMuted,
        }}
      >
        {emailBrand.address}
      </Text>

      <Text
        style={{
          margin: "16px 0 0",
          fontSize: 13,
          lineHeight: "22px",
          color: emailBrand.colors.darkForegroundMuted,
        }}
      >
        {socials.map((s, i) => (
          <React.Fragment key={s.label}>
            {i > 0 && (
              <span style={{ color: emailBrand.colors.darkBorder, margin: "0 8px" }}>·</span>
            )}
            <Link
              href={s.href}
              style={{
                color: emailBrand.colors.accent,
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {s.label}
            </Link>
          </React.Fragment>
        ))}
      </Text>

      <Hr style={{ borderColor: emailBrand.colors.darkBorder, margin: "20px 0 14px" }} />

      <Text
        style={{
          margin: 0,
          fontSize: 12,
          lineHeight: "18px",
          color: emailBrand.colors.darkForegroundMuted,
        }}
      >
        © {new Date().getFullYear()} Mckot. Last-mile delivery for online vendors in Accra.
      </Text>

      {mode === "marketing" && unsubscribeUrl ? (
        <Text
          style={{
            margin: "8px 0 0",
            fontSize: 12,
            lineHeight: "18px",
            color: emailBrand.colors.darkForegroundMuted,
          }}
        >
          You are receiving this because you opted in to Mckot updates.{" "}
          <Link
            href={unsubscribeUrl}
            style={{ color: emailBrand.colors.accent, textDecoration: "underline" }}
          >
            Unsubscribe
          </Link>
          .
        </Text>
      ) : null}
    </Section>
  );
}
