import { Clock, DoubleCheck, Pin } from "iconoir-react";

import { FacilitiesItem, ItemStatus } from "@/types";

const defaultStatus: ItemStatus = {
  isDisabled: false,
  isHidden: false,
  isComingSoon: false,
  isPromo: false,
  isRecommended: false,
};

export const facilities: FacilitiesItem[] = [
  {
    id: "business-center",
    name: "Business Center",
    src: ["/Images/business-center-1.jpg"],
    alt: "Business center with computers and meeting spaces",
    description:
      "Work efficiently with our fully equipped business center, offering computers, printers, and meeting rooms.",
    tag: "Work",
    details: [
      { icon: Clock, label: "24/7 Access" },
      { icon: DoubleCheck, label: "High-Speed Internet" },
      { icon: Pin, label: "Private Workstations" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "restaurants-cafe",
    name: "Restaurants & Café",
    src: ["/Images/restaurants-cafe-1.jpg"],
    alt: "Dining area with tables and delicious food",
    description:
      "Enjoy a variety of local and international cuisines at our on-site restaurants and cozy café.",
    tag: "Food",
    details: [
      { icon: Clock, label: "Breakfast to Dinner" },
      { icon: DoubleCheck, label: "Vegetarian Options" },
      { icon: Pin, label: "Indoor & Outdoor Seating" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "free-parking",
    name: "Free Parking",
    src: ["/Images/free-parking-1.jpg"],
    alt: "Spacious parking area for guests",
    description:
      "Convenient and secure parking available for all guests at no extra charge.",
    tag: "Convenience",
    details: [
      { icon: Clock, label: "24/7 Access" },
      { icon: DoubleCheck, label: "Ample Space" },
      { icon: Pin, label: "Close to Main Entrance" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "water-theme-park",
    name: "Water Theme Park",
    src: ["/Images/water-theme-park-1.jpg"],
    alt: "Guests enjoying water slides and pools",
    description:
      "Splash into fun at our thrilling water theme park featuring slides, pools, and water attractions for all ages.",
    tag: "Fun",
    details: [
      { icon: Clock, label: "Open Daily" },
      { icon: DoubleCheck, label: "Family-Friendly" },
      { icon: Pin, label: "Safety Lifeguards" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "spa-wellness",
    name: "Spa & Wellness Center",
    src: ["/Images/spa-wellness-1.jpg"],
    alt: "Guests relaxing in spa with massage services",
    description:
      "Relax and rejuvenate with a variety of treatments at our spa and wellness center, including massages and facials.",
    tag: "Relaxation",
    details: [
      { icon: Clock, label: "Appointments Required" },
      { icon: DoubleCheck, label: "Professional Therapists" },
      { icon: Pin, label: "Indoor Serenity Rooms" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "fitness-center",
    name: "Fitness Center",
    src: ["/Images/fitness-center-1.jpg"],
    alt: "Modern gym equipment in fitness center",
    description:
      "Stay active during your stay with our fully equipped fitness center, featuring cardio and weight training equipment.",
    tag: "Wellness",
    details: [
      { icon: Clock, label: "24/7 Access" },
      { icon: DoubleCheck, label: "Modern Equipment" },
      { icon: Pin, label: "Personal Training Available" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "game-room",
    name: "Game Room",
    src: ["/Images/game-room-1.jpg"],
    alt: "Guests playing games in the game room",
    description:
      "Have fun with friends and family in our game room, featuring arcade games, billiards, and more.",
    tag: "Entertainment",
    details: [
      { icon: Clock, label: "Open Daily" },
      { icon: DoubleCheck, label: "Variety of Games" },
      { icon: Pin, label: "Indoor Activities" },
    ],
    status: { ...defaultStatus },
  } satisfies FacilitiesItem,
];
