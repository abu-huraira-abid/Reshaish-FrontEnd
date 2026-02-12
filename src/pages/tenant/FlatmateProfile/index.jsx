import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, CheckCircle2, MapPin, User } from "lucide-react";

const locations = ["Gulberg", "DHA", "Bahria Town", "Blue Area", "F-10", "Clifton", "PECHS", "Model Town"];
const interests = ["Reading", "Fitness", "Cooking", "Travel", "Gaming", "Movies", "Music", "Sports"];

export default function FlatmateProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    age: "",
    gender: "",
    occupation: "",
    workSchedule: "",
    minBudget: "",
    maxBudget: "",
    moveInDate: "",
    preferredLocations: [],
    bio: ""
  });

  const toggleLocation = (loc) => {
    setForm((prev) => ({
      ...prev,
      preferredLocations: prev.preferredLocations.includes(loc)
        ? prev.preferredLocations.filter((item) => item !== loc)
        : [...prev.preferredLocations, loc]
    }));
  };

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Create Flatmate Profile</div>
        <div className="section-subtitle">Share your preferences to find the best matches.</div>
      </div>

      <form className="d-grid gap-3">
        <div className="card p-4">
          <div className="fw-semibold mb-3 d-flex align-items-center gap-2">
            <User size={16} className="text-danger" /> Basic Information
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Age</label>
              <input className="form-control" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Gender</label>
              <select className="form-select" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Occupation</label>
              <input className="form-control" value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Work Schedule</label>
              <select className="form-select" value={form.workSchedule} onChange={(e) => setForm({ ...form, workSchedule: e.target.value })}>
                <option value="">Select schedule</option>
                <option value="9-5">9-5 (Regular)</option>
                <option value="Flexible">Flexible</option>
                <option value="Night">Night Shift</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Move-in Date</label>
              <input type="date" className="form-control" value={form.moveInDate} onChange={(e) => setForm({ ...form, moveInDate: e.target.value })} />
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="fw-semibold mb-3 d-flex align-items-center gap-2">
            <MapPin size={16} className="text-danger" /> Budget & Location Preferences
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Budget Min (PKR)</label>
              <input className="form-control" value={form.minBudget} onChange={(e) => setForm({ ...form, minBudget: e.target.value })} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Budget Max (PKR)</label>
              <input className="form-control" value={form.maxBudget} onChange={(e) => setForm({ ...form, maxBudget: e.target.value })} />
            </div>
            <div className="col-12">
              <label className="form-label">Preferred Locations</label>
              <div className="d-flex flex-wrap gap-2">
                {locations.map((loc) => (
                  <button
                    type="button"
                    key={loc}
                    className={`btn btn-light border ${form.preferredLocations.includes(loc) ? "border-danger text-danger" : ""}`}
                    onClick={() => toggleLocation(loc)}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="fw-semibold mb-3">Interests & Hobbies</div>
          <div className="d-flex flex-wrap gap-2">
            {interests.map((interest) => (
              <span key={interest} className="badge-soft">
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <div className="fw-semibold mb-3">About You</div>
          <textarea
            className="form-control"
            rows={4}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            placeholder="Tell potential flatmates about yourself..."
          />
        </div>

        <div className="d-flex gap-2">
          <button type="button" className="btn btn-light border" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary-soft" onClick={() => navigate("/tenant/flatmate-matches")}>
            <CheckCircle2 size={16} className="me-2" />
            Find Matches
          </button>
        </div>
      </form>
    </div>
  );
}
