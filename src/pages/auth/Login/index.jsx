import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login, roleHome } = useAuth();

  const handleSuccess = (user) => {
    const logged = login(user.role, { name: user.name });
    navigate(roleHome[logged.role]);
  };

  return (
    <div>
      <h3 className="mb-2">Welcome Back</h3>
      <p className="text-muted mb-4">Sign in to your account to continue</p>
      <LoginForm onSuccess={handleSuccess} />
      <div className="auth-divider">Or continue with</div>
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <button className="btn btn-light border w-100 auth-social-btn" type="button">
            <span className="social-icon google-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.1 0 5.9 1.1 8.1 3.2l6-6C34.5 2.6 29.6.5 24 .5 14.9.5 7.1 5.6 3.3 13.2l7.1 5.5C12.1 13.5 17.6 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-2.7-.4-3.9H24v7.4h12.6c-.6 3-2.3 5.5-5 7.2l7.7 6c4.5-4.2 7.8-10.4 7.8-16.7z"/>
                <path fill="#FBBC05" d="M10.4 28.7c-.5-1.4-.8-2.8-.8-4.2s.3-2.8.8-4.2l-7.1-5.5C1.2 17.9.5 21.2.5 24.5s.7 6.6 2.8 9.7l7.1-5.5z"/>
                <path fill="#34A853" d="M24 47.5c5.6 0 10.4-1.8 13.9-4.9l-7.7-6c-2.1 1.4-4.8 2.2-6.2 2.2-6.4 0-11.9-4-13.6-9.5l-7.1 5.5C7.1 42.4 14.9 47.5 24 47.5z"/>
              </svg>
            </span>
            Google
          </button>
        </div>
        <div className="col-md-6">
          <button className="btn btn-light border w-100 auth-social-btn" type="button">
            <span className="social-icon facebook-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path fill="#1877F2" d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1c0 6.1 4.4 11.2 10.2 12V15.6H7.1v-3.5h3.1V9.4c0-3.1 1.8-4.8 4.6-4.8 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 1-2 2v2.4h3.4l-.5 3.5h-2.9V24C19.6 23.3 24 18.2 24 12.1z"/>
              </svg>
            </span>
            Facebook
          </button>
        </div>
      </div>
      <div className="text-center text-muted">
        Don't have an account? <Link className="auth-link" to="/auth/register">Sign up</Link>
      </div>
    </div>
  );
}
