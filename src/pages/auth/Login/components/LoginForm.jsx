import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { loginUser } from "../../../../services/api/auth.js";
import Loading from "../../../../components/common/Loading.jsx";

const DEFAULT_ROLE_OPTIONS = [
  { value: "tenant", label: "Tenant" },
  { value: "landlord", label: "Landlord" },
  { value: "agent", label: "Platform Agent" }
];

export default function LoginForm({
  onSuccess,
  roleOptions = DEFAULT_ROLE_OPTIONS,
  defaultRole = roleOptions[0]?.value || "tenant",
  showRoleSelect = true
}) {
  const [form, setForm] = useState({
    email: "",
    role: defaultRole,
    password: "",
    remember: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      const session = await loginUser(form);
      if (session.user.role !== form.role) {
        setError("This account does not match the selected login type.");
        return;
      }
      onSuccess(session);
    } catch (err) {
      setError(err.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {showRoleSelect && (
        <>
          <label className="form-label">Login as</label>
          <select
            className="form-select mb-3"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            {roleOptions.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </>
      )}

      <label className="form-label">Email or Phone</label>
      <div className="input-group mb-3">
        <span className="input-group-text auth-input-icon">
          <Mail size={16} />
        </span>
        <input
          className="form-control"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email or phone number"
        />
      </div>

      <label className="form-label">Password</label>
      <div className="input-group mb-3">
        <span className="input-group-text auth-input-icon">
          <Lock size={16} />
        </span>
        <input
          className="form-control"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
      </div>

      <div className="d-flex align-items-center justify-content-between mb-3">
        <label className="d-flex align-items-center gap-2 text-muted small">
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
          />
          Remember me
        </label>
        <button className="btn btn-link p-0 text-danger auth-link" type="button">
          Forgot password?
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      <button className="btn btn-primary-soft w-100" type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </button>
      {loading && <div className="mt-3"><Loading label="Checking credentials" /></div>}
    </form>
  );
}
