import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ allow, loginPath = "/auth/login" }) {
  const { user } = useAuth();

  if (!user) return <Navigate to={loginPath} replace />;
  if (allow && !allow.includes(user.role)) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
}
