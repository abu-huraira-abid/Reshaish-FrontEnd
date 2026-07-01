import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, MapPin, User } from "lucide-react";
import toast from "react-hot-toast";
import { registerUser } from "../../../../services/api/auth.js";
import Loading from "../../../../components/common/Loading.jsx";

const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const PASSWORD_MESSAGE =
  "Password must be at least 8 characters and include one uppercase letter, one number, and one symbol.";

export default function RegisterForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "tenant",
    password: "",
    city: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const passwordTouched = form.password.length > 0;
  const isPasswordValid = PASSWORD_PATTERN.test(form.password);
  const canSubmit =
    Boolean(form.name && form.email && form.password) && isPasswordValid && !loading;

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Full name, email, and password are required.");
      return;
    }
    if (!PASSWORD_PATTERN.test(form.password)) {
      toast.error(PASSWORD_MESSAGE);
      return;
    }
    setLoading(true);
    try {
      const user = await registerUser(form);
      toast.success("Account created. Check your email for the OTP.");
      onSuccess(user);
    } catch (err) {
      toast.error(err.message || "Unable to register. Try again.");
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

      <label className="form-label">Email</label>
      <div className="input-group mb-3">
        <span className="input-group-text auth-input-icon">
          <Mail size={16} />
        </span>
        <input
          className="form-control"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email address"
        />
      </div>

      <label className="form-label">Password</label>
      <div className="input-group mb-3">
        <span className="input-group-text auth-input-icon">
          <Lock size={16} />
        </span>
        <input
          className="form-control"
          type={showPassword ? "text" : "password"}
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Create a password"
          aria-invalid={passwordTouched && !isPasswordValid}
        />
        <button
          className="btn btn-light border password-toggle"
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      <div
        className={`password-requirements mb-3 ${
          passwordTouched && !isPasswordValid ? "text-danger" : ""
        }`}
      >
        {passwordTouched && !isPasswordValid
          ? PASSWORD_MESSAGE
          : "Use 8+ characters with uppercase, number, and symbol."}
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

      <button className="btn btn-primary-soft w-100" type="submit" disabled={!canSubmit}>
        {loading ? "Creating account..." : "Sign Up"}
      </button>
      {loading && <div className="mt-3"><Loading label="Setting up profile" /></div>}
    </form>
  );
}
