import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../Login/components/LoginForm.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";

const ADMIN_ROLE = [{ value: "admin", label: "Admin" }];

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, roleHome } = useAuth();

  const handleSuccess = (session) => {
    const logged = login(session);
    navigate(roleHome[logged.role]);
  };

  return (
    <div>
      <h3 className="mb-2">Admin Login</h3>
      <p className="text-muted mb-4">Sign in with your administrator account</p>
      <LoginForm
        onSuccess={handleSuccess}
        roleOptions={ADMIN_ROLE}
        defaultRole="admin"
        showRoleSelect={false}
      />
      <div className="text-center text-muted mt-4">
        Not an admin? <Link className="auth-link" to="/auth/login">Use normal login</Link>
      </div>
    </div>
  );
}
