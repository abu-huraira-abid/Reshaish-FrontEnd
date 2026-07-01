import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { fetchMyOnboarding } from "../services/api/onboarding.js";

export default function ProtectedRoute({
  allow,
  loginPath = "/auth/login",
  requireOnboarding = false
}) {
  const { user } = useAuth();
  const location = useLocation();
  const [checkingOnboarding, setCheckingOnboarding] = useState(requireOnboarding);
  const [onboarding, setOnboarding] = useState(null);

  useEffect(() => {
    if (!user || !requireOnboarding) return undefined;

    let mounted = true;
    setCheckingOnboarding(true);
    fetchMyOnboarding()
      .then((data) => {
        if (mounted) setOnboarding(data || null);
      })
      .catch(() => {
        if (mounted) setOnboarding(null);
      })
      .finally(() => {
        if (mounted) setCheckingOnboarding(false);
      });

    return () => {
      mounted = false;
    };
  }, [requireOnboarding, user]);

  if (!user) return <Navigate to={loginPath} replace />;
  if (allow && !allow.includes(user.role)) return <Navigate to="/unauthorized" replace />;

  if (checkingOnboarding) {
    return (
      <main className="page-content">
        <div className="container container-wide">
          <div className="card p-4">Checking onboarding...</div>
        </div>
      </main>
    );
  }

  if (
    requireOnboarding &&
    onboarding?.status !== "approved" &&
    location.pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}
