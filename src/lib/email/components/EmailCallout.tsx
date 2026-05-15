import { Section } from "@react-email/components";
import * as React from "react";
import { emailBrand } from "../brand";

type Props = {
  children: React.ReactNode;
  tone?: "accent" | "neutral";
};

export function EmailCallout({ children, tone = "accent" }: Props) {
  const isAccent = tone === "accent";
  return (
    <Section
      style={{
        backgroundColor: isAccent ? "#F2F8DE" : emailBrand.colors.surface,
        border: `1px solid ${isAccent ? "#D7E89A" : emailBrand.colors.border}`,
        borderLeft: `4px solid ${isAccent ? emailBrand.colors.accent : emailBrand.colors.dark}`,
        borderRadius: 8,
        padding: "18px 20px",
        margin: "8px 0 20px",
      }}
    >
      {children}
    </Section>
  );
}
