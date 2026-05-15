import { Heading } from "@react-email/components";
import * as React from "react";
import { emailBrand } from "../brand";

type Props = {
  level?: 1 | 2 | 3;
  children: React.ReactNode;
};

export function EmailHeading({ level = 1, children }: Props) {
  const sizing =
    level === 1
      ? { fontSize: 28, lineHeight: "34px", margin: "0 0 12px", letterSpacing: -0.4 }
      : level === 2
        ? { fontSize: 20, lineHeight: "26px", margin: "0 0 8px", letterSpacing: -0.2 }
        : { fontSize: 15, lineHeight: "22px", margin: "0 0 6px", letterSpacing: 0.4 };

  return (
    <Heading
      as={level === 1 ? "h1" : level === 2 ? "h2" : "h3"}
      style={{
        ...sizing,
        color: emailBrand.colors.foreground,
        fontWeight: level === 3 ? 600 : 700,
        textTransform: level === 3 ? "uppercase" : "none",
      }}
    >
      {children}
    </Heading>
  );
}
