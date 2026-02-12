import React, { useEffect, useState } from "react";
import { fetchProfile } from "../../../../services/mock/auth.js";
import Loading from "../../../../components/common/Loading.jsx";

export default function ProfileCard({ userId }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile(userId).then(setProfile);
  }, [userId]);

  if (!profile) return <Loading label="Loading profile" />;

  return (
    <div className="card p-3">
      <h5 className="mb-2">{profile.name}</h5>
      <div className="text-muted">{profile.email}</div>
      <div className="mt-3">
        <div className="small text-muted">City</div>
        <div>{profile.city}</div>
      </div>
      <div className="mt-3">
        <div className="small text-muted">Preferences</div>
        <div className="d-flex flex-wrap gap-2">
          {profile.preferences.map((pref) => (
            <span key={pref} className="badge-soft">
              {pref}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
