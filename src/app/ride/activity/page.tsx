import type { Metadata } from "next";
import { getSession } from "@/lib/auth/server";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { RideShell } from "../_components/RideShell";
import { ActivityView } from "./ActivityView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Activity",
  robots: { index: false, follow: false },
};

export default async function ActivityPage() {
  const user = await getSession();
  return (
    <AuthProvider initialUser={user}>
      <RideShell>
        <ActivityView />
      </RideShell>
    </AuthProvider>
  );
}
