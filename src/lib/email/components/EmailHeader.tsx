import { Img, Link, Section } from "@react-email/components";
import * as React from "react";
import { emailBrand } from "../brand";

export function EmailHeader() {
  return (
    <Section
      style={{
        backgroundColor: emailBrand.colors.dark,
        borderRadius: `${emailBrand.layout.radius}px ${emailBrand.layout.radius}px 0 0`,
        padding: "24px 28px",
        textAlign: "left",
      }}
    >
      <Link href={emailBrand.links.site} style={{ textDecoration: "none", display: "inline-block" }}>
        <Img
          src={emailBrand.links.logo}
          alt="Mckot"
          width={108}
          height={30}
          style={{
            display: "block",
            border: 0,
            outline: "none",
            textDecoration: "none",
            width: 108,
            height: 30,
          }}
        />
      </Link>
    </Section>
  );
}
