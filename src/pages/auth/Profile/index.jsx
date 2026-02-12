import React from "react";
import ProfileCard from "./components/ProfileCard.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <div className="text-muted">Login to view profile.</div>;
  }

  return (
    <div>
      <h3 className="mb-3">Profile</h3>
      <ProfileCard userId={user.id} />
    </div>
  );
}
