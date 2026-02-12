import { mockDelay } from "../api.js";

const categories = [
  { id: "all", label: "All Services", count: 24 },
  { id: "moving", label: "Moving & Packing", count: 5 },
  { id: "internet", label: "Internet & Cable", count: 3 },
  { id: "maintenance", label: "Home Maintenance", count: 8 },
  { id: "painting", label: "Painting", count: 3 },
  { id: "furniture", label: "Furniture Rental", count: 4 },
  { id: "cleaning", label: "Cleaning", count: 2 }
];

const services = [
  {
    id: "s-1",
    category: "moving",
    title: "Professional Moving & Packing Service",
    vendor: "MoveMasters",
    description:
      "Complete home relocation with packing, loading, transportation, and unpacking services.",
    image:
      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1200",
    rating: 4.8,
    reviews: 1245,
    responseTime: "30 mins",
    price: 3500,
    popular: true,
    verified: true,
    tags: ["Insured", "GPS Tracking", "Professional Packers"],
    features: ["Insured", "GPS Tracking", "Professional Packers", "Same Day Service"]
  },
  {
    id: "s-2",
    category: "internet",
    title: "High-Speed Fiber Internet Installation",
    vendor: "NetConnect",
    description:
      "Fast fiber broadband installation with free router and 24/7 customer support.",
    image:
      "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=1200",
    rating: 4.9,
    reviews: 856,
    responseTime: "2 hours",
    price: 999,
    popular: true,
    verified: true,
    tags: ["100 Mbps", "Free Router", "24/7 Support"],
    features: ["100 Mbps", "Free Router", "24/7 Support", "No Installation Fee"]
  },
  {
    id: "s-3",
    category: "maintenance",
    title: "AC Service & Repair",
    vendor: "CoolCare",
    description:
      "Professional AC servicing, repair, and installation by certified technicians.",
    image:
      "https://www.fixdar.com/wp-content/uploads/2025/04/ac-repair-professional.jpg",
    rating: 4.7,
    reviews: 623,
    responseTime: "1 hour",
    price: 499,
    popular: false,
    verified: true,
    tags: ["Certified Technicians", "Same Day Service", "90 Days Warranty"],
    features: ["Certified Technicians", "Same Day Service", "90 Days Warranty"]
  },
  {
    id: "s-4",
    category: "painting",
    title: "Interior Wall Painting",
    vendor: "ColorCraft",
    description:
      "Expert interior painting services with premium paints and professional finish.",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200",
    rating: 4.6,
    reviews: 432,
    responseTime: "4 hours",
    price: 2500,
    popular: false,
    verified: true,
    tags: ["Premium Paints", "Expert Painters", "Clean Finish"],
    features: ["Premium Paints", "Expert Painters", "Clean Finish"]
  },
  {
    id: "s-5",
    category: "furniture",
    title: "Furniture Rental Package",
    vendor: "FurnishEasy",
    description:
      "Rent quality furniture for your home. Monthly, quarterly, or yearly plans available.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200",
    rating: 4.5,
    reviews: 789,
    responseTime: "1 day",
    price: 2999,
    popular: true,
    verified: true,
    tags: ["Flexible Plans", "Free Delivery", "Easy Returns"],
    features: ["Flexible Plans", "Free Delivery", "Easy Returns"]
  },
  {
    id: "s-6",
    category: "cleaning",
    title: "Deep Home Cleaning Service",
    vendor: "SparkleClean",
    description:
      "Professional deep cleaning for entire home including kitchen, bathrooms, and living areas.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200",
    rating: 4.8,
    reviews: 1123,
    responseTime: "2 hours",
    price: 1499,
    popular: false,
    verified: true,
    tags: ["Eco-friendly Products", "Trained Staff", "Equipment Included"],
    features: ["Eco-friendly Products", "Trained Staff", "Equipment Included"]
  },
  {
    id: "s-7",
    category: "maintenance",
    title: "Plumbing Repair Service",
    vendor: "FixItPro",
    description:
      "Expert plumbing solutions for leaks, installations, and emergency repairs.",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1200",
    rating: 4.7,
    reviews: 945,
    responseTime: "45 mins",
    price: 299,
    popular: false,
    verified: true,
    tags: ["24/7 Emergency", "Licensed Plumbers", "Transparent Pricing"],
    features: ["24/7 Emergency", "Licensed Plumbers", "Transparent Pricing"]
  },
  {
    id: "s-8",
    category: "maintenance",
    title: "Electrical Work & Repairs",
    vendor: "VoltMasters",
    description:
      "Safe and reliable electrical services including wiring, repairs, and installations.",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200",
    rating: 4.9,
    reviews: 712,
    responseTime: "1 hour",
    price: 349,
    popular: true,
    verified: true,
    tags: ["Certified Electricians", "Safety First", "Emergency Service"],
    features: ["Certified Electricians", "Safety First", "Emergency Service"]
  }
];

const serviceOrders = [
  {
    id: "o-101",
    orderId: "SRV-2025-001",
    serviceId: "s-1",
    service: "Professional Moving & Packing Service",
    provider: "MoveMasters",
    package: "Standard Moving",
    image:
      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1200",
    scheduledDate: "2025-01-16",
    scheduledTime: "10:00 AM - 12:00 PM",
    address: "House 45, Gulberg III, Lahore",
    amount: 6687,
    status: "pending",
    bookedOn: "2025-01-12",
    contact: "+92 300 0000000",
    assignedAgent: {
      name: "Faizan Malik",
      phone: "+92 300 1111111"
    }
  },
  {
    id: "o-102",
    orderId: "SRV-2024-114",
    serviceId: "s-2",
    service: "High-Speed Fiber Internet Installation",
    provider: "NetConnect",
    package: "100 Mbps Plan",
    image:
      "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=1200",
    scheduledDate: "2024-12-28",
    scheduledTime: "02:00 PM - 04:00 PM",
    address: "Street 12, F-10, Islamabad",
    amount: 1178,
    status: "completed",
    bookedOn: "2024-12-20",
    completedOn: "2024-12-28",
    contact: "+92 300 2222222",
    assignedAgent: {
      name: "Noor Fatima",
      phone: "+92 300 3333333"
    },
    rated: false
  },
  {
    id: "o-103",
    orderId: "SRV-2024-098",
    serviceId: "s-6",
    service: "Deep Home Cleaning Service",
    provider: "SparkleClean",
    package: "Complete Home Cleaning",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200",
    scheduledDate: "2024-12-15",
    scheduledTime: "08:00 AM - 10:00 AM",
    address: "Sea View Road, Clifton, Karachi",
    amount: 1889,
    status: "completed",
    bookedOn: "2024-12-10",
    completedOn: "2024-12-15",
    contact: "+92 300 4444444",
    assignedAgent: {
      name: "Hina Zahid",
      phone: "+92 300 5555555"
    },
    rated: true,
    rating: 5,
    review: "Excellent service! Very thorough cleaning."
  }
];

export function fetchServiceCategories() {
  return mockDelay(categories, 300);
}

export function fetchServices() {
  return mockDelay(services, 500);
}

export function fetchServiceById(id) {
  return mockDelay(services.find((service) => service.id === id), 400);
}

export function fetchServiceOrders() {
  return mockDelay(serviceOrders, 500);
}

export function fetchServiceOrderById(id) {
  return mockDelay(serviceOrders.find((order) => order.id === id), 400);
}
