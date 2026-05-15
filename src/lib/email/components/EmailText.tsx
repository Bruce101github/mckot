import { Text } from "@react-email/components";
import * as React from "react";
import { emailBrand } from "../brand";

type Props = {
  children: React.ReactNode;
  muted?: boolean;
  small?: boolean;
  bold?: boolean;
  style?: React.CSSProperties;
};

export function EmailText({ children, muted = false, small = false, bold = false, style }: Props) {
  return (
    <Text
      style={{
        margin: "0 0 14px",
        fontSize: small ? 14 : 16,
        lineHeight: small ? "22px" : "26px",
        color: muted ? emailBrand.colors.foregroundMuted : emailBrand.colors.foreground,
        fontWeight: bold ? 600 : 400,
        ...style,
      }}
    >
      {children}
    </Text>
  );
}
