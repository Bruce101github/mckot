"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { MckotUser } from "./types";
import { getDeviceId } from "./client-utils";
import { logout as logoutAction } from "./server";

type AuthContextValue = {
  user: MckotUser | null;
  setUser: (user: MckotUser | null) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  initialUser,
  children,
}: {
  initialUser: MckotUser | null;
  children: ReactNode;
}) {
  const [user, setUser] = useState<MckotUser | null>(initialUser);

  const logout = useCallback(async () => {
    await logoutAction(getDeviceId());
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
