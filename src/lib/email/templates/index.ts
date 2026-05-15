import {
  VendorSignupConfirmationEmail,
  type VendorSignupConfirmationProps,
} from "./vendor-signup-confirmation";
import {
  VendorSignupInternalEmail,
  buildVendorSignupInternalSubject,
  type VendorSignupInternalProps,
} from "./vendor-signup-internal";
import type * as React from "react";

export type EmailRegistryEntry<P> = {
  component: (props: P) => React.JSX.Element;
  subject: ((props: P) => string) | string;
  /** Per-template tag to flow into Resend analytics */
  tag: string;
};

export type EmailTemplateMap = {
  "vendor-signup-confirmation": {
    props: VendorSignupConfirmationProps;
    entry: EmailRegistryEntry<VendorSignupConfirmationProps>;
  };
  "vendor-signup-internal": {
    props: VendorSignupInternalProps;
    entry: EmailRegistryEntry<VendorSignupInternalProps>;
  };
};

export type EmailTemplateName = keyof EmailTemplateMap;
export type EmailTemplateProps<K extends EmailTemplateName> = EmailTemplateMap[K]["props"];

export const emailRegistry: { [K in EmailTemplateName]: EmailTemplateMap[K]["entry"] } = {
  "vendor-signup-confirmation": {
    component: VendorSignupConfirmationEmail,
    subject: VendorSignupConfirmationEmail.subject,
    tag: "vendor-signup-confirmation",
  },
  "vendor-signup-internal": {
    component: VendorSignupInternalEmail,
    subject: buildVendorSignupInternalSubject,
    tag: "vendor-signup-internal",
  },
};
