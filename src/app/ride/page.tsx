"use client";

import { useAuth } from "@/lib/auth/AuthProvider";
import { LoginPanel } from "./_components/LoginPanel";
import { BookingScreen } from "./_components/BookingScreen";

export default function RidePage() {
  const { user } = useAuth();
  return user ? <BookingScreen /> : <LoginPanel />;
}
