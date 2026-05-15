import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Preview,
} from "@react-email/components";
import * as React from "react";
import { emailBrand } from "../brand";
import { EmailHeader } from "./EmailHeader";
import { EmailFooter, type FooterMode } from "./EmailFooter";

type Props = {
  preview: string;
  children: React.ReactNode;
  footerMode?: FooterMode;
  unsubscribeUrl?: string;
};

export function EmailLayout({ preview, children, footerMode = "transactional", unsubscribeUrl }: Props) {
  return (
    <Html lang="en">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light only" />
        <Font
          fontFamily="Inter"
          fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50ojIw2boKoduKmMEVuLyfMZg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter"
          fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50ojIw2boKoduKmMEVuFyfMZg.woff2",
            format: "woff2",
          }}
          fontWeight={600}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter"
          fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50ojIw2boKoduKmMEVuGKYMZg.woff2",
            format: "woff2",
          }}
          fontWeight={700}
          fontStyle="normal"
        />
      </Head>
      <Preview>{preview}</Preview>
      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: emailBrand.colors.page,
          fontFamily: emailBrand.fonts.sans,
          color: emailBrand.colors.foreground,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <Container
          style={{
            width: "100%",
            maxWidth: emailBrand.layout.containerWidth,
            margin: "0 auto",
            padding: "24px 12px 32px",
          }}
        >
          <EmailHeader />
          <Container
            style={{
              backgroundColor: emailBrand.colors.card,
              borderRadius: emailBrand.layout.radius,
              border: `1px solid ${emailBrand.colors.border}`,
              padding: `${emailBrand.layout.bodyPadding}px`,
              boxSizing: "border-box",
              width: "100%",
            }}
          >
            {children}
          </Container>
          <EmailFooter mode={footerMode} unsubscribeUrl={unsubscribeUrl} />
        </Container>
      </Body>
    </Html>
  );
}
