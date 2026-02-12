import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ConversationList from "./components/ConversationList.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import { fetchConversations, fetchMessagesByConversation } from "../../../services/mock/messages.js";

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [messages, setMessages] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchConversations().then((data) => {
      setConversations(data);
      if (!data.length) return;
      const preferred = location.state?.userId
        ? data.find((item) => item.userId === location.state.userId)
        : location.state?.name
          ? data.find((item) => item.name === location.state.name)
          : data[0];
      setSelectedId(preferred?.id || data[0].id);
    });
  }, [location.state?.userId]);

  useEffect(() => {
    if (!selectedId) return;
    fetchMessagesByConversation(selectedId).then(setMessages);
  }, [selectedId]);

  const selectedConversation = useMemo(
    () => conversations.find((item) => item.id === selectedId),
    [conversations, selectedId]
  );

  const handleSend = (text) => {
    setMessages((prev) => [
      ...prev,
      { id: `m-${Date.now()}`, sender: "me", text, time: "Now" }
    ]);
    setConversations((prev) =>
      prev.map((item) =>
        item.id === selectedId
          ? { ...item, lastMessage: text, time: "Now", unread: 0 }
          : item
      )
    );
  };

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Messages</div>
        <div className="section-subtitle">Chat with your shortlisted flatmates.</div>
      </div>
      <div className="row g-4">
        <div className="col-lg-4">
          <ConversationList
            conversations={conversations}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
        <div className="col-lg-8">
          <ChatWindow conversation={selectedConversation} messages={messages} onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}
