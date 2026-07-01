import React, { useEffect, useMemo, useState } from "react";
import { Camera, Eye, EyeOff, Lock, Save } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext.jsx";
import {
  changePassword,
  updateProfile
} from "../../../services/api/auth.js";

const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const PASSWORD_MESSAGE =
  "Password must be at least 8 characters and include one uppercase letter, one number, and one symbol.";

export default function Settings() {
  const { user, updateUser } = useAuth();
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [profile, setProfile] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    city: user?.city || "",
    profile_photo: null
  });
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [visiblePasswords, setVisiblePasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const photoPreview = useMemo(() => {
    if (profile.profile_photo) return URL.createObjectURL(profile.profile_photo);
    return user?.profilePhoto || "";
  }, [profile.profile_photo, user?.profilePhoto]);

  useEffect(() => {
    return () => {
      if (profile.profile_photo && photoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview, profile.profile_photo]);

  const handleProfileChange = (event) => {
    const { name, value, files } = event.target;
    setProfile((prev) => ({
      ...prev,
      [name]: files?.[0] || value
    }));
  };

  const handlePasswordChange = (event) => {
    setPassword((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setProfileSaving(true);
    try {
      const updated = await updateProfile(user.id, profile);
      updateUser(updated);
      setProfile((prev) => ({ ...prev, profile_photo: null }));
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error.message || "Unable to update profile.");
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    if (!PASSWORD_PATTERN.test(password.newPassword)) {
      toast.error(PASSWORD_MESSAGE);
      return;
    }

    setPasswordSaving(true);
    try {
      await changePassword(password);
      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      toast.success("Password updated successfully.");
    } catch (error) {
      toast.error(error.message || "Unable to change password.");
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <div className="settings-page">
      <div className="mb-4">
        <div className="section-title">Settings</div>
        <div className="section-subtitle">
          Manage your profile information and account password.
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <form className="card settings-card" onSubmit={handleProfileSubmit}>
            <div className="settings-card-header">
              <div>
                <h2>Profile information</h2>
                <p>Keep your contact details and profile photo up to date.</p>
              </div>
              <span className="settings-header-icon">
                <Camera size={20} />
              </span>
            </div>

            <div className="settings-photo-row">
              <div className="settings-avatar">
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile" />
                ) : (
                  <Camera size={26} />
                )}
              </div>
              <div className="settings-photo-copy">
                <div className="settings-photo-title">Profile photo</div>
                <div className="settings-photo-help">
                  Upload a clear photo so your profile looks trusted across Rehaish.
                </div>
                <label className="btn btn-light border">
                  <Camera size={16} />
                  Upload photo
                  <input
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="d-none"
                    name="profile_photo"
                    onChange={handleProfileChange}
                    type="file"
                  />
                </label>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">First name</label>
                <input
                  className="form-control"
                  name="first_name"
                  onChange={handleProfileChange}
                  value={profile.first_name}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last name</label>
                <input
                  className="form-control"
                  name="last_name"
                  onChange={handleProfileChange}
                  value={profile.last_name}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  name="email"
                  onChange={handleProfileChange}
                  type="email"
                  value={profile.email}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone number</label>
                <input
                  className="form-control"
                  name="phone"
                  onChange={handleProfileChange}
                  value={profile.phone}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">City</label>
                <input
                  className="form-control"
                  name="city"
                  onChange={handleProfileChange}
                  value={profile.city}
                />
              </div>
            </div>

            <div className="settings-actions">
              <button className="btn btn-primary-soft" disabled={profileSaving} type="submit">
                {profileSaving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save profile
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="col-lg-5">
          <form className="card settings-card" onSubmit={handlePasswordSubmit}>
            <div className="settings-card-header">
              <div>
                <h2>Change password</h2>
                <p>Use a strong password with uppercase, number, and symbol.</p>
              </div>
              <span className="settings-header-icon">
                <Lock size={20} />
              </span>
            </div>

            <label className="form-label">Current password</label>
            <div className="password-field mb-3">
              <input
                className="form-control"
                name="currentPassword"
                onChange={handlePasswordChange}
                type={visiblePasswords.currentPassword ? "text" : "password"}
                value={password.currentPassword}
              />
              <button
                aria-label={
                  visiblePasswords.currentPassword
                    ? "Hide current password"
                    : "Show current password"
                }
                className="password-eye-btn"
                onClick={() => togglePasswordVisibility("currentPassword")}
                type="button"
              >
                {visiblePasswords.currentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <label className="form-label">New password</label>
            <div className="password-field mb-2">
              <input
                className="form-control"
                name="newPassword"
                onChange={handlePasswordChange}
                type={visiblePasswords.newPassword ? "text" : "password"}
                value={password.newPassword}
              />
              <button
                aria-label={
                  visiblePasswords.newPassword ? "Hide new password" : "Show new password"
                }
                className="password-eye-btn"
                onClick={() => togglePasswordVisibility("newPassword")}
                type="button"
              >
                {visiblePasswords.newPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div
              className={`password-requirements mb-3 ${
                password.newPassword && !PASSWORD_PATTERN.test(password.newPassword)
                  ? "text-danger"
                  : ""
              }`}
            >
              {PASSWORD_MESSAGE}
            </div>

            <label className="form-label">Confirm new password</label>
            <div className="password-field">
              <input
                className="form-control"
                name="confirmPassword"
                onChange={handlePasswordChange}
                type={visiblePasswords.confirmPassword ? "text" : "password"}
                value={password.confirmPassword}
              />
              <button
                aria-label={
                  visiblePasswords.confirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                className="password-eye-btn"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                type="button"
              >
                {visiblePasswords.confirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="settings-actions">
              <button className="btn btn-primary-soft" disabled={passwordSaving} type="submit">
                {passwordSaving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Update password
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
