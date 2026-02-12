import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";

export default function ConversationList({ conversations, selectedId, onSelect }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return conversations;
    const lower = query.toLowerCase();
    return conversations.filter((item) => item.name.toLowerCase().includes(lower));
  }, [conversations, query]);

  return (
    <div className="card chat-list-card h-100">
      <div className="p-3 border-bottom">
        <div className="fw-semibold mb-2">Inbox</div>
        <div className="position-relative">
          <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
          <input
            className="form-control ps-5"
            placeholder="Search messages"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="chat-list">
        {filtered.map((chat) => (
          <button
            key={chat.id}
            type="button"
            className={`chat-item ${selectedId === chat.id ? "active" : ""}`}
            onClick={() => onSelect(chat.id)}
          >
            <img src={chat.image} alt={chat.name} className="chat-avatar" />
            <div className="flex-grow-1 text-start">
              <div className="d-flex justify-content-between">
                <div className="fw-semibold text-truncate">{chat.name}</div>
                <div className="text-muted small">{chat.time}</div>
              </div>
              <div className="text-muted small text-truncate">{chat.lastMessage}</div>
            </div>
            {chat.unread > 0 && <span className="chat-unread">{chat.unread}</span>}
          </button>
        ))}
        {!filtered.length && (
          <div className="p-3 text-muted small">No conversations found.</div>
        )}
      </div>
    </div>
  );
}
