import React, { createContext, useContext, useMemo, useState } from "react";
import {
  clearStoredSession,
  getStoredUser,
  setStoredUser
} from "../services/api/tokenStorage.js";
import { logoutUser } from "../services/api/auth.js";

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

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // The local session should end even if the server logout request fails.
    } finally {
      clearStoredSession();
      setUser(null);
    }
  };

  const updateUser = (nextUser) => {
    setUser(nextUser);
    setStoredUser(nextUser);
    return nextUser;
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      updateUser,
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
