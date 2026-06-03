import type { Metadata } from "next";
import { getSession } from "@/lib/auth/server";
import { AuthProvider } from "@/lib/auth/AuthProvider";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book a ride",
  robots: { index: false, follow: false },
};

export default async function RideLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession();
  return (
    <AuthProvider initialUser={user}>
      <div className="flex min-h-screen flex-col bg-white">{children}</div>
    </AuthProvider>
  );
}
