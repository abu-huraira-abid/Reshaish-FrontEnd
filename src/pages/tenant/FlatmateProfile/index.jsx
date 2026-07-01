import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Home, MapPin, User } from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchMyActiveRentals,
  saveFlatmateListing,
  saveFlatmateProfile
} from "../../../services/api/flatmates.js";

const locations = ["Gulberg", "DHA", "Bahria Town", "Blue Area", "F-10", "Clifton", "PECHS", "Model Town"];
const interests = ["Reading", "Fitness", "Cooking", "Travel", "Gaming", "Movies", "Music", "Sports"];

export default function FlatmateProfile() {
  const navigate = useNavigate();
  const [rentals, setRentals] = useState([]);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingListing, setSavingListing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    age: "",
    gender: "",
    occupation: "",
    workSchedule: "",
    minBudget: "",
    maxBudget: "",
    moveInDate: "",
    city: "Lahore",
    preferredLocations: [],
    interests: [],
    bio: "",
    matchVisibility: true
  });
  const [listingForm, setListingForm] = useState({
    tenancy: "",
    title: "",
    availableRoom: "",
    expectedShare: "",
    availableFrom: "",
    description: "",
    houseRules: [],
    preferences: {
      gender: "",
      occupation: "",
      lifestyle: ""
    }
  });

  useEffect(() => {
    fetchMyActiveRentals().then((items) => {
      const active = items.filter((item) => ["active", "notice_given"].includes(item.status));
      setRentals(active);
      if (active[0]) {
        setListingForm((prev) => ({
          ...prev,
          tenancy: active[0].id,
          title: prev.title || `Flatmate wanted for ${active[0].property_title}`
        }));
      }
    });
  }, []);

  const toggleProfileList = (key, value) => {
    setProfileForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value]
    }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setSavingProfile(true);
    try {
      await saveFlatmateProfile(profileForm);
      toast.success("Flatmate profile saved.");
      navigate("/tenant/flatmates");
    } catch (error) {
      toast.error(error.message || "Unable to save flatmate profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleListingSubmit = async (event) => {
    event.preventDefault();
    setSavingListing(true);
    try {
      await saveFlatmateListing(listingForm);
      toast.success("Your rental is listed for flatmate finding.");
      navigate("/tenant/flatmates");
    } catch (error) {
      toast.error(error.message || "Unable to publish flatmate listing.");
    } finally {
      setSavingListing(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Flatmate Setup</div>
        <div className="section-subtitle">
          Create your profile, or list your rented property to find a compatible flatmate.
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <form className="card p-4 h-100" onSubmit={handleProfileSubmit}>
            <div className="fw-semibold mb-3 d-flex align-items-center gap-2">
              <User size={16} className="text-danger" /> Find a Flatmate
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Age</label>
                <input className="form-control" value={profileForm.age} onChange={(e) => setProfileForm({ ...profileForm, age: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Gender</label>
                <select className="form-select" value={profileForm.gender} onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}>
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Occupation</label>
                <input className="form-control" value={profileForm.occupation} onChange={(e) => setProfileForm({ ...profileForm, occupation: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Work Schedule</label>
                <select className="form-select" value={profileForm.workSchedule} onChange={(e) => setProfileForm({ ...profileForm, workSchedule: e.target.value })}>
                  <option value="">Select schedule</option>
                  <option value="9-5">9-5 Regular</option>
                  <option value="Flexible">Flexible</option>
                  <option value="Night">Night Shift</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">City</label>
                <input className="form-control" value={profileForm.city} onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Move-in Date</label>
                <input type="date" className="form-control" value={profileForm.moveInDate} onChange={(e) => setProfileForm({ ...profileForm, moveInDate: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Budget Min (PKR)</label>
                <input className="form-control" value={profileForm.minBudget} onChange={(e) => setProfileForm({ ...profileForm, minBudget: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Budget Max (PKR)</label>
                <input className="form-control" required value={profileForm.maxBudget} onChange={(e) => setProfileForm({ ...profileForm, maxBudget: e.target.value })} />
              </div>
              <div className="col-12">
                <label className="form-label d-flex align-items-center gap-2">
                  <MapPin size={14} /> Preferred Locations
                </label>
                <div className="d-flex flex-wrap gap-2">
                  {locations.map((loc) => (
                    <button
                      type="button"
                      key={loc}
                      className={`btn btn-light border ${profileForm.preferredLocations.includes(loc) ? "border-danger text-danger" : ""}`}
                      onClick={() => toggleProfileList("preferredLocations", loc)}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-12">
                <label className="form-label">Interests</label>
                <div className="d-flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <button
                      type="button"
                      key={interest}
                      className={`btn btn-light border ${profileForm.interests.includes(interest) ? "border-danger text-danger" : ""}`}
                      onClick={() => toggleProfileList("interests", interest)}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-12">
                <label className="form-label">About You</label>
                <textarea className="form-control" rows={4} value={profileForm.bio} onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })} />
              </div>
            </div>
            <button className="btn btn-primary-soft mt-4" disabled={savingProfile} type="submit">
              {savingProfile ? "Saving..." : "Save Profile"}
              <CheckCircle2 size={16} className="ms-2" />
            </button>
          </form>
        </div>

        <div className="col-lg-6">
          <form className="card p-4 h-100" onSubmit={handleListingSubmit}>
            <div className="fw-semibold mb-3 d-flex align-items-center gap-2">
              <Home size={16} className="text-danger" /> List Your Rented Property
            </div>
            {!rentals.length && (
              <div className="alert alert-warning">
                You need an active rental before listing a property for flatmate finding.
              </div>
            )}
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Active Rental</label>
                <select
                  className="form-select"
                  required
                  disabled={!rentals.length}
                  value={listingForm.tenancy}
                  onChange={(e) => setListingForm({ ...listingForm, tenancy: e.target.value })}
                >
                  <option value="">Select rented property</option>
                  {rentals.map((rental) => (
                    <option key={rental.id} value={rental.id}>
                      {rental.property_title} - {rental.property_city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <label className="form-label">Listing Title</label>
                <input className="form-control" required value={listingForm.title} onChange={(e) => setListingForm({ ...listingForm, title: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Available Room</label>
                <input className="form-control" placeholder="e.g., furnished room" value={listingForm.availableRoom} onChange={(e) => setListingForm({ ...listingForm, availableRoom: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Expected Share (PKR)</label>
                <input className="form-control" required value={listingForm.expectedShare} onChange={(e) => setListingForm({ ...listingForm, expectedShare: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Available From</label>
                <input type="date" className="form-control" value={listingForm.availableFrom} onChange={(e) => setListingForm({ ...listingForm, availableFrom: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Preferred Gender</label>
                <select
                  className="form-select"
                  value={listingForm.preferences.gender}
                  onChange={(e) => setListingForm({ ...listingForm, preferences: { ...listingForm.preferences, gender: e.target.value } })}
                >
                  <option value="">Any</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows={5}
                  placeholder="Describe the room, shared spaces, expectations, and lifestyle."
                  value={listingForm.description}
                  onChange={(e) => setListingForm({ ...listingForm, description: e.target.value })}
                />
              </div>
            </div>
            <button className="btn btn-primary-soft mt-4" disabled={savingListing || !rentals.length} type="submit">
              {savingListing ? "Publishing..." : "Publish Property Listing"}
              <CheckCircle2 size={16} className="ms-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
