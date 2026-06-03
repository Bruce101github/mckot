import type { Metadata } from "next";
import { getSession } from "@/lib/auth/server";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { RideShell } from "../_components/RideShell";
import { WalletView } from "./WalletView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Wallet",
  robots: { index: false, follow: false },
};

export default async function WalletPage() {
  const user = await getSession();
  return (
    <AuthProvider initialUser={user}>
      <RideShell>
        <WalletView />
      </RideShell>
    </AuthProvider>
  );
}
