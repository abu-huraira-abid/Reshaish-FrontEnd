import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const ROLE_HOME = {
  tenant: "/tenant",
  landlord: "/landlord",
  agent: "/agent",
  admin: "/admin"
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (role, profile = {}) => {
    const newUser = {
      id: "u-1001",
      name: profile.name || "Demo User",
      role
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => setUser(null);

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
