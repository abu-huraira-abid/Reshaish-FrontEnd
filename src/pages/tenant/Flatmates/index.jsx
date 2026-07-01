import React, { useEffect, useState } from "react";
import { MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FlatmateFilters from "./components/FlatmateFilters.jsx";
import FlatmateCard from "./components/FlatmateCard.jsx";
import DataPagination from "../../../components/common/DataPagination.jsx";
import Modal from "../../../components/common/Modal.jsx";
import { fetchFlatmates } from "../../../services/api/flatmates.js";
import { startConversation } from "../../../services/api/messages.js";
import toast from "react-hot-toast";

export default function Flatmates() {
  const [people, setPeople] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlatmates().then(setPeople);
  }, []);

  const handleConnect = async (person) => {
    if (person.isDemo) {
      navigate("/tenant/messages", {
        state: {
          demoConversation: {
            id: `demo-${person.id}`,
            userId: person.userId,
            name: person.name,
            image: person.image,
            role: person.property || person.role,
            lastMessage: "Hi, I am interested in discussing flatmate compatibility.",
            unread: 0,
            online: true
          },
          demoMessages: [
            {
              id: `demo-msg-${person.id}`,
              sender: "them",
              text: "Hi! Let me know if you want to discuss the room, budget, and move-in date.",
              time: "Now"
            }
          ]
        }
      });
      return;
    }

    try {
      const conversation = await startConversation({
        recipientId: person.userId,
        listingId: person.isListing ? person.id : null
      });
      navigate("/tenant/messages", {
        state: {
          conversation,
          conversationId: conversation.id,
          userId: person.userId,
          name: person.name
        }
      });
    } catch (error) {
      toast.error(error.message || "Unable to start chat.");
    }
  };

  const handleSendMessage = (person) => {
    setSelected(null);
    handleConnect(person);
  };

  const pagedPeople = people.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <div>
          <div className="section-title">Find Flatmates</div>
          <div className="section-subtitle">Connect with verified individuals looking for roommates.</div>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-light border" onClick={() => navigate("/tenant/flatmate-profile")}
            >
            Profile / List Property
          </button>
          <button className="btn btn-primary-soft" onClick={() => navigate("/tenant/flatmate-matches")}
            >
            View Matches
          </button>
        </div>
      </div>
      <FlatmateFilters />
      <div className="row g-4 mt-2">
        {pagedPeople.map((person) => (
          <div className="col-md-4" key={person.id}>
            <FlatmateCard
              person={person}
              onSelect={() => setSelected(person)}
              onConnect={() => handleConnect(person)}
            />
          </div>
        ))}
      </div>
      {people.length > 0 && (
        <DataPagination
          itemLabel="profiles"
          page={page}
          pageSize={pageSize}
          pageSizeOptions={[6, 12, 24, 48]}
          totalItems={people.length}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      )}

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
                src={selected.image || "/rehaish-logo.png"}
                alt={selected.name}
                className="rounded-4"
                style={{ width: "90px", height: "90px", objectFit: "cover" }}
              />
              <div>
                <div className="fw-semibold">{selected.name}</div>
                <div className="text-muted small">{selected.role}</div>
                {selected.property && <div className="text-muted small">{selected.property}</div>}
              </div>
            </div>
            <div className="d-flex align-items-center gap-2 text-muted small mb-2">
              <Star size={14} className="text-warning" />
              {selected.rating} ({selected.reviews} reviews)
            </div>
            <div className="text-muted small d-flex align-items-center gap-2 mb-2">
              <MapPin size={14} />
              Preferred locations: {(selected.locations || [selected.city]).filter(Boolean).join(", ") || "Flexible"}
            </div>
            <div className="text-muted small">
              {selected.isListing ? "Expected share" : "Budget"}: PKR {Number(selected.budget || 0).toLocaleString()}
            </div>
            {selected.bio && <p className="text-muted small mt-3 mb-0">{selected.bio}</p>}
          </div>
        )}
      </Modal>
    </div>
  );
}
