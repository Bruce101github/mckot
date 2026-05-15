import { Column, Row, Text } from "@react-email/components";
import * as React from "react";
import { emailBrand } from "../brand";

type Props = {
  label: string;
  value: React.ReactNode;
};

export function EmailInfoRow({ label, value }: Props) {
  return (
    <Row style={{ borderBottom: `1px solid ${emailBrand.colors.border}` }}>
      <Column
        style={{
          width: "40%",
          padding: "10px 0",
          verticalAlign: "top",
        }}
      >
        <Text
          style={{
            margin: 0,
            fontSize: 13,
            lineHeight: "20px",
            color: emailBrand.colors.foregroundMuted,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: 0.4,
          }}
        >
          {label}
        </Text>
      </Column>
      <Column
        style={{
          width: "60%",
          padding: "10px 0",
          verticalAlign: "top",
        }}
      >
        <Text
          style={{
            margin: 0,
            fontSize: 15,
            lineHeight: "22px",
            color: emailBrand.colors.foreground,
            fontWeight: 500,
            wordBreak: "break-word",
          }}
        >
          {value}
        </Text>
      </Column>
    </Row>
  );
}
