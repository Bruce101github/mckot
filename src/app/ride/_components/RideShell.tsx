"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";
import { RideNav } from "./RideNav";

// Chrome for the authenticated account sub-pages (wallet, activity). The
// booking page renders its own full-bleed map shell; these pages are normal
// scrollable content under the shared navbar. Bounces to /ride (login) when
// there's no session.
export function RideShell({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/ride");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <RideNav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 md:px-8">{children}</main>
    </div>
  );
}
