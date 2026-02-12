import React, { useState } from "react";
import { CheckCircle2, MapPin, MessageCircle, Star, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/common/Modal.jsx";

const matches = [
  {
    id: "m-1",
    name: "Ayesha Malik",
    age: 26,
    occupation: "Product Manager",
    locations: ["Gulberg", "DHA"],
    budget: "PKR 18,000 - 25,000",
    compatibility: 92,
    rating: 4.9,
    reviews: 12,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800"
  },
  {
    id: "m-2",
    name: "Zain Ahmed",
    age: 28,
    occupation: "Software Engineer",
    locations: ["Blue Area", "F-10"],
    budget: "PKR 20,000 - 28,000",
    compatibility: 86,
    rating: 4.7,
    reviews: 8,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800"
  },
  {
    id: "m-3",
    name: "Hira Noor",
    age: 24,
    occupation: "Marketing Specialist",
    locations: ["Clifton", "PECHS"],
    budget: "PKR 16,000 - 22,000",
    compatibility: 80,
    rating: 4.8,
    reviews: 10,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800"
  }
];

export default function FlatmateMatches() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSendMessage = (match) => {
    setSelected(null);
    navigate("/tenant/messages", { state: { name: match.name } });
  };

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Your Flatmate Matches</div>
        <div className="section-subtitle">We found {matches.length} compatible flatmates.</div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="stat-tile">
            <div className="icon-circle" style={{ background: "#dcfce7" }}>
              <CheckCircle2 size={18} className="text-success" />
            </div>
            <div>
              <div className="fw-semibold">{matches.filter((m) => m.compatibility >= 90).length}</div>
              <div className="text-muted small">Excellent Matches</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-tile">
            <div className="icon-circle" style={{ background: "#dbeafe" }}>
              <TrendingUp size={18} className="text-primary" />
            </div>
            <div>
              <div className="fw-semibold">{matches.filter((m) => m.compatibility >= 80).length}</div>
              <div className="text-muted small">Good Matches</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-tile">
            <div className="icon-circle" style={{ background: "#f3e8ff" }}>
              <MessageCircle size={18} className="text-primary" />
            </div>
            <div>
              <div className="fw-semibold">0</div>
              <div className="text-muted small">Active Chats</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {matches.map((match) => (
          <div className="col-md-4" key={match.id}>
            <div className="card flatmate-card h-100">
              <img src={match.image} alt={match.name} />
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="fw-semibold mb-1">
                      {match.name}, {match.age}
                    </h6>
                    <div className="text-muted small">{match.occupation}</div>
                  </div>
                  <span className="badge-pill badge-verified">{match.compatibility}% Match</span>
                </div>
                <div className="text-muted small d-flex align-items-center gap-2 mb-2">
                  <MapPin size={14} />
                  {match.locations.join(", ")}
                </div>
                <div className="text-muted small mb-3">Budget: {match.budget}</div>
                <div className="d-flex gap-2">
                  <button className="btn btn-light border" onClick={() => setSelected(match)}>
                    View Profile
                  </button>
                  <button className="btn btn-primary-soft">
                    <MessageCircle size={16} className="me-2" />
                    Connect
                  </button>
                </div>
              </div>
            </div>
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
                <div className="text-muted small">{selected.occupation}</div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2 text-muted small mb-2">
              <Star size={14} className="text-warning" />
              {selected.rating} ({selected.reviews} reviews)
            </div>
            <div className="text-muted small">Preferred locations: {selected.locations.join(", ")}</div>
          </div>
        )}
      </Modal>
    </div>
  );
}
