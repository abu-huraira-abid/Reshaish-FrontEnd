import { mockDelay } from "../api.js";

const flatmates = [
  {
    id: "f-1",
    name: "Zain Ahmed",
    age: 28,
    role: "Software Engineer",
    location: "Gulberg, Lahore",
    locations: ["Gulberg", "DHA"],
    budget: "PKR 15,000-20,000",
    rating: 4.8,
    reviews: 14,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900"
  },
  {
    id: "f-2",
    name: "Sana Malik",
    age: 25,
    role: "Product Manager",
    location: "F-10, Islamabad",
    locations: ["F-10", "Blue Area"],
    budget: "PKR 18,000-25,000",
    rating: 4.9,
    reviews: 11,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900"
  },
  {
    id: "f-3",
    name: "Hamza Tariq",
    age: 30,
    role: "Data Analyst",
    location: "Clifton, Karachi",
    locations: ["Clifton", "PECHS"],
    budget: "PKR 16,000-22,000",
    rating: 4.7,
    reviews: 9,
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=900"
  },
  {
    id: "f-4",
    name: "Ayesha Noor",
    age: 26,
    role: "Marketing Specialist",
    location: "Johar Town, Lahore",
    locations: ["Johar Town", "Wapda Town"],
    budget: "PKR 17,000-24,000",
    rating: 4.6,
    reviews: 8,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900"
  },
  {
    id: "f-5",
    name: "Bilal Raza",
    age: 29,
    role: "UI/UX Designer",
    location: "G-11, Islamabad",
    locations: ["G-11", "E-11"],
    budget: "PKR 20,000-27,000",
    rating: 4.8,
    reviews: 10,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop"
  },
  {
    id: "f-6",
    name: "Hina Aslam",
    age: 24,
    role: "Content Strategist",
    location: "Gulshan-e-Iqbal, Karachi",
    locations: ["Gulshan-e-Iqbal", "Shahrah-e-Faisal"],
    budget: "PKR 14,000-19,000",
    rating: 4.5,
    reviews: 7,
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900"
  }
];

export function fetchFlatmates() {
  return mockDelay(flatmates, 400);
}
