import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Calendar,
  CheckCircle2,
  Contact,
  Home,
  IdCard,
  Phone,
  ShieldCheck,
  Upload
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import {
  fetchMyOnboarding,
  submitOnboarding
} from "../../../services/api/onboarding.js";
import { updateProfile } from "../../../services/api/auth.js";

const initialForm = {
  profile_photo: null,
  cnic_number: "",
  cnic_front_image: null,
  cnic_back_image: null,
  date_of_birth: "",
  gender: "",
  current_address: "",
  occupation: "",
  emergency_contact_name: "",
  emergency_contact_phone: ""
};

const statusLabel = (value) =>
  String(value || "not submitted")
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

function FieldIcon({ children }) {
  return <span className="input-group-text auth-input-icon">{children}</span>;
}

function FileDrop({ label, name, file, existingUrl, onChange }) {
  const isUploaded = Boolean(file || existingUrl);

  return (
    <label className={`onboarding-upload ${isUploaded ? "uploaded" : ""}`}>
      <input
        type="file"
        name={name}
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={onChange}
      />
      <span className="onboarding-upload-icon">
        <Upload size={20} />
      </span>
      <span>
        <strong>{label}</strong>
        <small>
          {file?.name ||
            (existingUrl ? "Image already uploaded" : "PNG, JPG or WebP up to 5MB")}
        </small>
      </span>
    </label>
  );
}

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, roleHome, updateUser } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [existing, setExisting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const homePath = roleHome[user?.role] || "/";
  const onboardingStatus = existing?.status || "draft";
  const isPendingReview = onboardingStatus === "pending_review";
  const isRejected = onboardingStatus === "rejected";
  const isApproved = onboardingStatus === "approved";

  const steps = useMemo(
    () => [
      { title: "CNIC details", done: Boolean(form.cnic_number) },
      { title: "Profile photo", done: Boolean(form.profile_photo || user?.profilePhoto) },
      {
        title: "Identity images",
        done:
          Boolean(form.cnic_front_image || existing?.cnic_front_image) &&
          Boolean(form.cnic_back_image || existing?.cnic_back_image)
      },
      { title: "Profile basics", done: Boolean(form.current_address) }
    ],
    [existing, form, user?.profilePhoto]
  );

  useEffect(() => {
    fetchMyOnboarding()
      .then((data) => {
        if (!data) return;
        setExisting(data);
        setForm((prev) => ({
          ...prev,
          cnic_number: data.cnic_number || "",
          date_of_birth: data.date_of_birth || "",
          gender: data.gender || "",
          current_address: data.current_address || "",
          occupation: data.occupation || "",
          emergency_contact_name: data.emergency_contact_name || "",
          emergency_contact_phone: data.emergency_contact_phone || ""
        }));
      })
      .catch(() => toast.error("Unable to load onboarding details."))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: files?.[0] || value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.cnic_number || !form.current_address) {
      toast.error("CNIC number and current address are required.");
      return;
    }

    if (!form.cnic_front_image && !existing?.cnic_front_image) {
      toast.error("Upload the front image of your CNIC.");
      return;
    }

    if (!form.cnic_back_image && !existing?.cnic_back_image) {
      toast.error("Upload the back image of your CNIC.");
      return;
    }

    setSaving(true);
    try {
      if (form.profile_photo && user?.id) {
        const updatedUser = await updateProfile(user.id, {
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          email: user.email,
          username: user.email,
          phone: user.phone || "",
          city: user.city || "",
          profile_photo: form.profile_photo
        });
        updateUser(updatedUser);
      }
      const saved = await submitOnboarding(form);
      setExisting(saved);
      toast.success("Your onboarding has been submitted for review.");
      navigate(homePath, { replace: true });
    } catch (err) {
      const message =
        err.data?.cnic_number?.[0] ||
        err.data?.non_field_errors?.[0] ||
        err.message ||
        "Unable to submit onboarding.";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="page-content onboarding-page">
        <div className="container container-wide">
          <div className="card onboarding-card p-4">Loading onboarding...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-content onboarding-page">
      <div className="container container-wide">
        <div className="onboarding-shell">
          <section className="onboarding-hero">
            <div>
              <div className="onboarding-brand-row">
                <div className="onboarding-brand">
                  <span className="brand-icon">
                    <img src="/rehaish-logo.png" alt="Rehaish logo" />
                  </span>
                  <span>Rehaish</span>
                </div>
                <span className="badge-soft onboarding-eyebrow">
                  <ShieldCheck size={15} /> Identity onboarding
                </span>
              </div>
              <h1>Complete your Rehaish verification</h1>
              <p>
                Add the identity details our team needs to review your account
                before property, visit, and rental workflows begin.
              </p>
            </div>
            <div className="onboarding-status-panel">
              <span className={`badge-pill status-${existing?.status || "draft"}`}>
                {statusLabel(existing?.status)}
              </span>
              <BadgeCheck size={42} />
            </div>
          </section>

          <div className="row g-4 align-items-start">
            <div className="col-lg-4">
              <aside className="card onboarding-side">
                <h2>Review checklist</h2>
                <div className="onboarding-steps">
                  {steps.map((step, index) => (
                    <div className="onboarding-step" key={step.title}>
                      <span className={step.done ? "step-dot done" : "step-dot"}>
                        {step.done ? <CheckCircle2 size={16} /> : index + 1}
                      </span>
                      <span>{step.title}</span>
                    </div>
                  ))}
                </div>
                <div className="onboarding-note">
                  <IdCard size={20} />
                  <p>
                    CNIC format is checked automatically. Real document approval
                    remains pending until an admin or agent reviews the images.
                  </p>
                </div>
              </aside>
            </div>

            <div className="col-lg-8">
              {existing?.id && (
                <div className={`onboarding-status-message status-${onboardingStatus}`}>
                  <ShieldCheck size={22} />
                  <div>
                    <h2>
                      {isApproved
                        ? "Your account is approved"
                        : isRejected
                          ? "Verification needs an update"
                          : "Waiting for admin approval"}
                    </h2>
                    <p>
                      {isApproved
                        ? "Your Rehaish account has been approved. You can now continue to your dashboard."
                        : isRejected
                          ? existing.rejection_reason ||
                            "Please update your details and submit again for admin review."
                          : "Your onboarding request has been submitted. Please wait for admin approval or contact the Rehaish admin team for support."}
                    </p>
                    {isApproved && (
                      <button
                        className="btn btn-primary-soft"
                        onClick={() => navigate(homePath, { replace: true })}
                        type="button"
                      >
                        Go to dashboard
                      </button>
                    )}
                  </div>
                </div>
              )}

              <form className="card onboarding-card" onSubmit={handleSubmit}>
                <div className="onboarding-section-title">
                  <h2>Identity details</h2>
                  <p>Use the same details shown on your CNIC.</p>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">CNIC number</label>
                    <div className="input-group">
                      <FieldIcon>
                        <IdCard size={16} />
                      </FieldIcon>
                      <input
                        className="form-control"
                        name="cnic_number"
                        value={form.cnic_number}
                        onChange={handleChange}
                        placeholder="12345-1234567-1"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Date of birth</label>
                    <div className="input-group">
                      <FieldIcon>
                        <Calendar size={16} />
                      </FieldIcon>
                      <input
                        className="form-control"
                        type="date"
                        name="date_of_birth"
                        value={form.date_of_birth}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Occupation</label>
                    <div className="input-group">
                      <FieldIcon>
                        <BriefcaseBusiness size={16} />
                      </FieldIcon>
                      <input
                        className="form-control"
                        name="occupation"
                        value={form.occupation}
                        onChange={handleChange}
                        placeholder="Software engineer"
                      />
                    </div>
                  </div>
                </div>

                <div className="onboarding-section-title mt-4">
                  <h2>Profile photo</h2>
                  <p>Add a clear photo to personalize your Rehaish account.</p>
                </div>

                <FileDrop
                  label="Profile photo"
                  name="profile_photo"
                  file={form.profile_photo}
                  existingUrl={user?.profilePhoto}
                  onChange={handleChange}
                />

                <div className="onboarding-section-title mt-4">
                  <h2>CNIC images</h2>
                  <p>Upload clear front and back images for manual review.</p>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <FileDrop
                      label="Front image"
                      name="cnic_front_image"
                      file={form.cnic_front_image}
                      existingUrl={existing?.cnic_front_image}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <FileDrop
                      label="Back image"
                      name="cnic_back_image"
                      file={form.cnic_back_image}
                      existingUrl={existing?.cnic_back_image}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="onboarding-section-title mt-4">
                  <h2>Contact and residence</h2>
                  <p>These details help support rental safety and follow-up.</p>
                </div>

                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Current address</label>
                    <div className="input-group">
                      <FieldIcon>
                        <Home size={16} />
                      </FieldIcon>
                      <textarea
                        className="form-control"
                        name="current_address"
                        value={form.current_address}
                        onChange={handleChange}
                        rows="3"
                        placeholder="House number, street, area, city"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Emergency contact name</label>
                    <div className="input-group">
                      <FieldIcon>
                        <Contact size={16} />
                      </FieldIcon>
                      <input
                        className="form-control"
                        name="emergency_contact_name"
                        value={form.emergency_contact_name}
                        onChange={handleChange}
                        placeholder="Family member or trusted contact"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Emergency contact phone</label>
                    <div className="input-group">
                      <FieldIcon>
                        <Phone size={16} />
                      </FieldIcon>
                      <input
                        className="form-control"
                        name="emergency_contact_phone"
                        value={form.emergency_contact_phone}
                        onChange={handleChange}
                        placeholder="+92 300 0000000"
                      />
                    </div>
                  </div>
                </div>

                <div className="onboarding-actions">
                  <button className="btn btn-primary-soft" type="submit" disabled={saving}>
                    {saving ? "Submitting..." : "Submit for review"}
                    {!saving && <ArrowRight size={16} />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
