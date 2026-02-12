import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { loginUser } from "../../../../services/mock/auth.js";
import Loading from "../../../../components/common/Loading.jsx";

export default function LoginForm({ onSuccess }) {
  const [form, setForm] = useState({
    email: "",
    role: "tenant",
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
    if (form.role === "tenant") {
      onSuccess({
        id: `u-${Date.now()}`,
        name: form.email?.split("@")[0] || "Tenant",
        role: "tenant",
        email: form.email
      });
      return;
    }
    setLoading(true);
    try {
      const user = await loginUser(form);
      onSuccess(user);
    } catch (err) {
      setError("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-label">Login as</label>
      <select
        className="form-select mb-3"
        name="role"
        value={form.role}
        onChange={handleChange}
      >
        <option value="tenant">Tenant</option>
        <option value="landlord">Landlord</option>
        <option value="agent">Platform Agent</option>
        <option value="admin">Admin</option>
      </select>

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
