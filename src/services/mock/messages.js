import { mockDelay } from "../api.js";

const conversations = [
  {
    id: "c-1",
    userId: "f-2",
    name: "Sana Malik",
    role: "Product Manager",
    lastMessage: "Can we discuss the rent split?",
    time: "10:42 AM",
    unread: 2,
    online: true,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900"
  },
  {
    id: "c-2",
    userId: "f-1",
    name: "Zain Ahmed",
    role: "Software Engineer",
    lastMessage: "Sounds good. When can we meet?",
    time: "9:15 AM",
    unread: 0,
    online: true,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900"
  },
  {
    id: "c-3",
    userId: "f-3",
    name: "Hamza Tariq",
    role: "Data Analyst",
    lastMessage: "The apartment looks great.",
    time: "Yesterday",
    unread: 1,
    online: false,
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=900"
  },
  {
    id: "c-4",
    userId: "f-4",
    name: "Ayesha Noor",
    role: "Marketing Specialist",
    lastMessage: "I prefer Gulberg or DHA areas.",
    time: "Mon",
    unread: 0,
    online: false,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900"
  }
];

const messages = {
  "c-1": [
    { id: "m-1", sender: "them", text: "Hi! I saw your listing for a flatmate.", time: "10:30 AM" },
    { id: "m-2", sender: "me", text: "Hello Sana! Glad you reached out.", time: "10:31 AM" },
    { id: "m-3", sender: "them", text: "Can we discuss the rent split?", time: "10:42 AM" }
  ],
  "c-2": [
    { id: "m-1", sender: "them", text: "Hey! I can visit the place this weekend.", time: "9:00 AM" },
    { id: "m-2", sender: "me", text: "Sure, Saturday morning works.", time: "9:10 AM" },
    { id: "m-3", sender: "them", text: "Sounds good. When can we meet?", time: "9:15 AM" }
  ],
  "c-3": [
    { id: "m-1", sender: "them", text: "The apartment looks great.", time: "Yesterday" },
    { id: "m-2", sender: "me", text: "Happy to hear that!", time: "Yesterday" }
  ],
  "c-4": [
    { id: "m-1", sender: "them", text: "I prefer Gulberg or DHA areas.", time: "Mon" },
    { id: "m-2", sender: "me", text: "That works for me too.", time: "Mon" }
  ]
};

export function fetchConversations() {
  return mockDelay(conversations, 400);
}

export function fetchMessagesByConversation(id) {
  return mockDelay(messages[id] || [], 300);
}
