import React, { useState } from "react";
import { Send } from "lucide-react";

export default function ChatWindow({ conversation, messages, onSend }) {
  const [draft, setDraft] = useState("");

  if (!conversation) {
    return (
      <div className="card chat-window h-100 d-flex align-items-center justify-content-center text-muted">
        Select a conversation to start chatting.
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!draft.trim()) return;
    onSend(draft);
    setDraft("");
  };

  return (
    <div className="card chat-window h-100">
      <div className="chat-header">
        <div className="d-flex align-items-center gap-3">
          <img src={conversation.image} alt={conversation.name} className="chat-avatar" />
          <div>
            <div className="fw-semibold">{conversation.name}</div>
            <div className="text-muted small">{conversation.role}</div>
          </div>
        </div>
        <span className={`chat-status ${conversation.online ? "online" : "offline"}`}>
          {conversation.online ? "Active now" : "Offline"}
        </span>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${message.sender === "me" ? "me" : "them"}`}
          >
            <div className={`chat-bubble ${message.sender === "me" ? "me" : "them"}`}>
              {message.text}
            </div>
            <div className="chat-time">{message.time}</div>
          </div>
        ))}
      </div>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          className="form-control"
          placeholder="Type your message..."
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button className="btn btn-primary-soft text-nowrap" type="submit">
          Send
          <Send size={16} className="ms-1" />
        </button>
      </form>
    </div>
  );
}
