"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Hides the marketing chrome (header/footer/banners) on the full-screen
// /ride booking app while leaving every marketing page untouched.
export function ConditionalChrome({
  banner,
  header,
  footer,
  children,
}: {
  banner: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isApp = pathname?.startsWith("/ride");

  if (isApp) return <>{children}</>;

  return (
    <>
      {banner}
      {header}
      <main id="main-content" className="pb-24 md:pb-0">
        {children}
      </main>
      {footer}
    </>
  );
}
