import { Button } from "@react-email/components";
import * as React from "react";
import { emailBrand } from "../brand";

type Variant = "primary" | "secondary";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  fullWidth?: boolean;
};

export function EmailButton({ href, children, variant = "primary", fullWidth = false }: Props) {
  const isPrimary = variant === "primary";
  return (
    <Button
      href={href}
      style={{
        display: fullWidth ? "block" : "inline-block",
        textAlign: "center",
        width: fullWidth ? "100%" : "auto",
        maxWidth: "100%",
        boxSizing: "border-box",
        backgroundColor: isPrimary ? emailBrand.colors.accent : "transparent",
        color: isPrimary ? emailBrand.colors.dark : emailBrand.colors.foreground,
        borderRadius: 10,
        border: isPrimary ? "none" : `1.5px solid ${emailBrand.colors.border}`,
        fontSize: 16,
        fontWeight: 700,
        lineHeight: "20px",
        padding: "14px 28px",
        textDecoration: "none",
        letterSpacing: 0.1,
      }}
    >
      {children}
    </Button>
  );
}
