import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import ConversationList from "./components/ConversationList.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import {
  fetchConversations,
  fetchMessagesByConversation,
  sendConversationMessage
} from "../../../services/api/messages.js";

const demoConversationStorageKey = "rehaish-demo-flatmate-conversations";
const demoMessageStorageKey = "rehaish-demo-flatmate-messages";

function readStoredDemoConversations() {
  try {
    return JSON.parse(window.localStorage.getItem(demoConversationStorageKey) || "[]");
  } catch {
    return [];
  }
}

function readStoredDemoMessages() {
  try {
    return JSON.parse(window.localStorage.getItem(demoMessageStorageKey) || "{}");
  } catch {
    return {};
  }
}

function storeDemoConversations(conversations) {
  window.localStorage.setItem(demoConversationStorageKey, JSON.stringify(conversations));
}

function storeDemoMessages(messagesByConversation) {
  window.localStorage.setItem(demoMessageStorageKey, JSON.stringify(messagesByConversation));
}

function mergeConversations(primary = [], secondary = []) {
  const seen = new Set();
  return [...primary, ...secondary].filter((item) => {
    if (!item?.id || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const isDemoConversation = String(selectedId).startsWith("demo-");

  useEffect(() => {
    const storedDemoConversations = readStoredDemoConversations();
    const storedDemoMessages = readStoredDemoMessages();

    if (location.state?.demoConversation) {
      const conversationId = location.state.demoConversation.id;
      const demoConversations = mergeConversations(
        [location.state.demoConversation],
        storedDemoConversations
      );
      const demoMessages = {
        ...storedDemoMessages,
        [conversationId]: storedDemoMessages[conversationId] || location.state.demoMessages || []
      };
      storeDemoConversations(demoConversations);
      storeDemoMessages(demoMessages);
      setConversations(demoConversations);
      setSelectedId(conversationId);
      setMessages(demoMessages[conversationId] || []);
      return;
    }

    fetchConversations().then((data) => {
      const merged = mergeConversations(
        location.state?.conversation ? [location.state.conversation] : [],
        mergeConversations(data, storedDemoConversations)
      );
      setConversations(merged);
      if (!merged.length) return;
      const preferred = location.state?.conversationId
        ? merged.find((item) => item.id === location.state.conversationId)
        : location.state?.userId
        ? merged.find((item) => item.userId === location.state.userId)
        : location.state?.name
          ? merged.find((item) => item.name === location.state.name)
          : merged[0];
      setSelectedId(preferred?.id || merged[0].id);
    });
  }, [
    location.state?.conversation,
    location.state?.conversationId,
    location.state?.demoConversation,
    location.state?.name,
    location.state?.userId
  ]);

  useEffect(() => {
    if (!selectedId || isDemoConversation) return;
    fetchMessagesByConversation(selectedId).then(setMessages);

    const interval = window.setInterval(() => {
      fetchMessagesByConversation(selectedId)
        .then(setMessages)
        .catch(() => {});
      fetchConversations()
        .then((data) => setConversations(mergeConversations(data, readStoredDemoConversations())))
        .catch(() => {});
    }, 3000);

    return () => window.clearInterval(interval);
  }, [isDemoConversation, selectedId]);

  useEffect(() => {
    if (!selectedId || !isDemoConversation) return;
    setMessages(readStoredDemoMessages()[selectedId] || []);
  }, [isDemoConversation, selectedId]);

  const selectedConversation = useMemo(
    () => conversations.find((item) => item.id === selectedId),
    [conversations, selectedId]
  );

  const handleSend = async (text) => {
    if (isDemoConversation) {
      const message = { id: `demo-local-${Date.now()}`, sender: "me", text, time: "Now" };
      const nextMessages = [...messages, message];
      setMessages(nextMessages);
      setConversations((prev) => {
        const updated = prev.map((item) =>
          item.id === selectedId
            ? { ...item, lastMessage: text, time: "Now", unread: 0 }
            : item
        );
        storeDemoConversations(updated.filter((item) => String(item.id).startsWith("demo-")));
        return updated;
      });
      storeDemoMessages({
        ...readStoredDemoMessages(),
        [selectedId]: nextMessages
      });
      return;
    }

    try {
      const message = await sendConversationMessage(selectedId, text);
      setMessages((prev) => [...prev, message]);
      setConversations((prev) =>
        prev.map((item) =>
          item.id === selectedId
            ? { ...item, lastMessage: text, time: "Now", unread: 0 }
            : item
        )
      );
    } catch (error) {
      toast.error(error.message || "Unable to send message.");
    }
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
