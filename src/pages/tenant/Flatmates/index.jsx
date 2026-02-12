import React, { useEffect, useState } from "react";
import { MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FlatmateFilters from "./components/FlatmateFilters.jsx";
import FlatmateCard from "./components/FlatmateCard.jsx";
import Modal from "../../../components/common/Modal.jsx";
import { fetchFlatmates } from "../../../services/mock/flatmates.js";

export default function Flatmates() {
  const [people, setPeople] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlatmates().then(setPeople);
  }, []);

  const handleConnect = (person) => {
    const confirmed = window.confirm(`Send connect request to ${person.name}?`);
    if (confirmed) {
      window.alert("Connection request sent.");
    }
  };

  const handleSendMessage = (person) => {
    setSelected(null);
    navigate("/tenant/messages", { state: { userId: person.id, name: person.name } });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <div>
          <div className="section-title">Find Your Perfect Flatmate</div>
          <div className="section-subtitle">Connect with verified individuals looking for roommates.</div>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-light border" onClick={() => navigate("/tenant/flatmate-profile")}
            >
            Create Profile
          </button>
          <button className="btn btn-primary-soft" onClick={() => navigate("/tenant/flatmate-matches")}
            >
            View Matches
          </button>
        </div>
      </div>
      <FlatmateFilters />
      <div className="row g-4 mt-2">
        {people.map((person) => (
          <div className="col-md-4" key={person.id}>
            <FlatmateCard
              person={person}
              onSelect={() => setSelected(person)}
              onConnect={() => handleConnect(person)}
            />
          </div>
        ))}
      </div>

      <Modal
        open={Boolean(selected)}
        title="Flatmate Profile"
        onClose={() => setSelected(null)}
        actions={
          <>
            <button className="btn btn-primary-soft" onClick={() => selected && handleSendMessage(selected)}>
              Send Message
            </button>
          </>
        }
      >
        {selected && (
          <div>
            <div className="d-flex gap-3 align-items-center mb-3">
              <img
                src={selected.image}
                alt={selected.name}
                className="rounded-4"
                style={{ width: "90px", height: "90px", objectFit: "cover" }}
              />
              <div>
                <div className="fw-semibold">{selected.name}</div>
                <div className="text-muted small">{selected.role}</div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2 text-muted small mb-2">
              <Star size={14} className="text-warning" />
              {selected.rating} ({selected.reviews} reviews)
            </div>
            <div className="text-muted small d-flex align-items-center gap-2 mb-2">
              <MapPin size={14} />
              Preferred locations: {selected.locations.join(", ")}
            </div>
            <div className="text-muted small">Budget: {selected.budget}</div>
          </div>
        )}
      </Modal>
    </div>
  );
}
