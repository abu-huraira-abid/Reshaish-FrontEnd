import React, { createContext, useContext, useMemo, useState } from "react";
import {
  clearAuthTokens,
  getStoredUser,
  setStoredUser
} from "../services/api/tokenStorage.js";

const AuthContext = createContext(null);

const ROLE_HOME = {
  tenant: "/tenant",
  landlord: "/landlord",
  agent: "/agent",
  admin: "/admin"
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());

  const login = (sessionOrRole, profile = {}) => {
    const newUser =
      typeof sessionOrRole === "object"
        ? sessionOrRole.user || sessionOrRole
        : {
            id: profile.id,
            name: profile.name || "Demo User",
            role: sessionOrRole,
            email: profile.email
          };

    setUser(newUser);
    setStoredUser(newUser);
    return newUser;
  };

  const logout = () => {
    clearAuthTokens();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      roleHome: ROLE_HOME
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
