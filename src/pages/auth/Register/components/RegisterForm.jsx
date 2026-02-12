import React, { useState } from "react";
import { Mail, Lock, User, MapPin } from "lucide-react";
import { registerUser } from "../../../../services/mock/auth.js";
import Loading from "../../../../components/common/Loading.jsx";

export default function RegisterForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "tenant",
    password: "",
    city: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) {
      setError("Full name, email, and password are required.");
      return;
    }
    setLoading(true);
    try {
      const user = await registerUser(form);
      onSuccess(user);
    } catch (err) {
      setError("Unable to register. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-label">Full Name</label>
      <div className="input-group mb-3">
        <span className="input-group-text auth-input-icon">
          <User size={16} />
        </span>
        <input
          className="form-control"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your full name"
        />
      </div>

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
          placeholder="Create a password"
        />
      </div>

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

      <label className="form-label">City</label>
      <div className="input-group mb-3">
        <span className="input-group-text auth-input-icon">
          <MapPin size={16} />
        </span>
        <input
          className="form-control"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Lahore"
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      <button className="btn btn-primary-soft w-100" type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Sign Up"}
      </button>
      {loading && <div className="mt-3"><Loading label="Setting up profile" /></div>}
    </form>
  );
}
