import { Hr } from "@react-email/components";
import * as React from "react";
import { emailBrand } from "../brand";

export function EmailDivider({ spacing = 20 }: { spacing?: number }) {
  return (
    <Hr
      style={{
        borderColor: emailBrand.colors.border,
        borderTopWidth: 1,
        borderTopStyle: "solid",
        margin: `${spacing}px 0`,
      }}
    />
  );
}
