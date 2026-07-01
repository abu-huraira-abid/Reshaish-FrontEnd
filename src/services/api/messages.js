import { apiClient, unwrapData } from "./client.js";

const fallbackAvatar = "/rehaish-logo.png";

function mapConversation(item = {}) {
  const other = item.other_user || {};
  const last = item.last_message || {};
  return {
    ...item,
    id: item.id,
    userId: other.id,
    name: other.name || other.email || "Flatmate",
    image: other.profile_photo || fallbackAvatar,
    role: item.listing_detail?.property_title || "Flatmate conversation",
    lastMessage: last.body || "No messages yet.",
    time: last.created_at ? new Date(last.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "",
    unread: item.unread_count || 0,
    online: true
  };
}

function mapMessage(item = {}) {
  return {
    ...item,
    id: item.id,
    sender: item.is_me ? "me" : "them",
    text: item.body,
    time: item.created_at ? new Date(item.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Now"
  };
}

export async function fetchConversations() {
  const data = unwrapData(await apiClient.get("/flatmate-conversations/"));
  return data.map(mapConversation);
}

export async function startConversation({ recipientId, listingId }) {
  const { data } = await apiClient.post("/flatmate-conversations/", {
    recipient: recipientId,
    listing: listingId || null
  });
  return mapConversation(data);
}

export async function fetchMessagesByConversation(conversationId) {
  const data = unwrapData(await apiClient.get(`/flatmate-conversations/${conversationId}/messages/`));
  return data.map(mapMessage);
}

export async function sendConversationMessage(conversationId, body) {
  const { data } = await apiClient.post(`/flatmate-conversations/${conversationId}/messages/`, {
    body
  });
  return mapMessage(data);
}
