import { Clock, DoubleCheck, Pin } from "iconoir-react";

import { ExperiencesItem, ItemStatus } from "@/types";

const defaultStatus: ItemStatus = {
  isDisabled: false,
  isHidden: false,
  isComingSoon: false,
  isPromo: false,
  isRecommended: false,
};

export const experiences: ExperiencesItem[] = [
  {
    id: "skyworld-playground",
    name: "Skyworld Adventure Playground",
    src: ["/Images/skyworld-playground-1.jpg"],
    alt: "Tree-top net playground surrounded by pine trees at Morib Resort",
    description:
      "Experience a vibrant treetop adventure with colorful net bridges, swings, and playful duck decorations. Perfect for kids to climb, play, and explore under the shady pines.",
    tag: "Family",
    details: [
      { icon: Clock, label: "Open Daily" },
      { icon: DoubleCheck, label: "Safety Supervision Available" },
      { icon: Pin, label: "Located Near Skyworld Zone" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "beach-walk",
    name: "Beach Walk & Sunset Viewpoint",
    src: ["/Images/beach-walk-1.jpg"],
    alt: "Visitors strolling along Morib Beach during a golden sunset",
    description:
      "Take a peaceful stroll along the scenic shoreline and enjoy breathtaking sunsets over the Straits of Malacca. A serene escape right by the resort.",
    tag: "Relaxation",
    details: [
      { icon: Clock, label: "Best During Sunset Hours" },
      { icon: DoubleCheck, label: "Scenic Coastal Path" },
      { icon: Pin, label: "Accessible from Main Beachfront" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "seafood-catch",
    name: "Seaside Seafood Catch Experience",
    src: ["/Images/seafood-catch-1.jpg"],
    alt: "Guests catching small crabs and fish by the beach shore",
    description:
      "Join this hands-on seaside experience where guests can catch small crabs and fish along the coast. A fun and interactive activity for all ages.",
    tag: "Activity",
    details: [
      { icon: Clock, label: "Tides & Weather Dependent" },
      { icon: DoubleCheck, label: "Equipment Provided" },
      { icon: Pin, label: "Beachside Activity Area" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "flying-fox",
    name: "Flying Fox Zipline",
    src: ["/Images/flying-fox-1.jpg"],
    alt: "Guest soaring through the air on a zipline above the resort grounds",
    description:
      "Soar high above the resort on the Flying Fox zipline and feel the wind rush past as you glide across the landscape for an unforgettable aerial thrill.",
    tag: "Adventure",
    details: [
      { icon: Clock, label: "Open Daily" },
      { icon: DoubleCheck, label: "Certified Safety Gear Provided" },
      { icon: Pin, label: "Guided by Trained Instructors" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "high-rope-course",
    name: "High Rope Challenge Course",
    src: ["/Images/high-rope-1.jpg"],
    alt: "Guest balancing across rope bridges on elevated high rope course",
    description:
      "Test your balance and courage on this elevated rope challenge featuring swinging bridges and obstacles. Designed for teens and adults seeking excitement.",
    tag: "Adventure",
    details: [
      { icon: Clock, label: "Open Daily" },
      { icon: DoubleCheck, label: "Safety Harness & Briefing Included" },
      { icon: Pin, label: "Ideal for Teens & Adults" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "water-theme-park",
    name: "Water Theme Park",
    src: ["/Images/water-theme-park-1.jpg"],
    alt: "Families enjoying colorful water slides and splash pools",
    description:
      "Make a splash at the lively water park with slides, pools, and fountains. Perfect for cooling off and creating joyful memories with family and friends.",
    tag: "Family",
    details: [
      { icon: Clock, label: "Open Daily" },
      { icon: DoubleCheck, label: "Family-Friendly Lifeguards On Duty" },
      { icon: Pin, label: "Within Resort Grounds" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "bubble-foam-play",
    name: "Bubble & Foam Party Zone",
    src: ["/Images/bubble-foam-play-1.jpg"],
    alt: "Children playing joyfully in a foam and bubble area outdoors",
    description:
      "Jump, laugh, and dance in a sea of bubbles at the foam play zone. A safe and lively experience that brings out the inner child in everyone.",
    tag: "Family",
    details: [
      { icon: Clock, label: "Weekends & Holidays" },
      { icon: DoubleCheck, label: "Supervised Play Area" },
      { icon: Pin, label: "Outdoor Family Zone" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "restaurants-cafe",
    name: "Resort Restaurants & Café",
    src: ["/Images/restaurants-cafe-1.jpg"],
    alt: "Cozy dining area serving local and international cuisine",
    description:
      "Savor a variety of delicious local and international cuisines at the resort’s restaurants and café. Perfect for family meals or romantic dinners.",
    tag: "Dining",
    details: [
      { icon: Clock, label: "Open from Breakfast to Dinner" },
      { icon: DoubleCheck, label: "Vegetarian & Kids’ Menu Options" },
      { icon: Pin, label: "Indoor and Outdoor Seating Available" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "spa-wellness",
    name: "Spa & Wellness Retreat",
    src: ["/Images/spa-wellness-1.jpg"],
    alt: "Spa guests receiving relaxing massages in a tranquil setting",
    description:
      "Rejuvenate your body and mind at the Spa & Wellness Retreat with massages, facials, and aromatherapy in a peaceful and serene atmosphere.",
    tag: "Wellness",
    details: [
      { icon: Clock, label: "By Appointment Only" },
      { icon: DoubleCheck, label: "Experienced Professional Therapists" },
      { icon: Pin, label: "Indoor Serenity Rooms" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "fitness-center",
    name: "Fitness & Training Center",
    src: ["/Images/fitness-center-1.jpg"],
    alt: "Modern gym with cardio and strength training equipment",
    description:
      "Stay active at the fully equipped fitness center featuring modern cardio machines, free weights, and personal training support.",
    tag: "Wellness",
    details: [
      { icon: Clock, label: "24/7 Access" },
      { icon: DoubleCheck, label: "Modern Equipment & Free Weights" },
      { icon: Pin, label: "Located Near Lobby Wing" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "game-room",
    name: "Indoor Game & Recreation Room",
    src: ["/Images/game-room-1.jpg"],
    alt: "Guests enjoying arcade and billiard games indoors",
    description:
      "Challenge friends or unwind with family in the indoor recreation space featuring arcade machines, billiards, and board games.",
    tag: "Entertainment",
    details: [
      { icon: Clock, label: "Open Daily" },
      { icon: DoubleCheck, label: "Wide Range of Games" },
      { icon: Pin, label: "Located Next to Lobby" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "free-parking",
    name: "Complimentary Guest Parking",
    src: ["/Images/free-parking-1.jpg"],
    alt: "Spacious outdoor parking area for resort guests",
    description:
      "Enjoy convenient parking with ample space and round-the-clock security, complimentary for all resort guests.",
    tag: "Service",
    details: [
      { icon: Clock, label: "24/7 Access" },
      { icon: DoubleCheck, label: "Secure & Well-Lit Area" },
      { icon: Pin, label: "Near Main Entrance" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "business-center",
    name: "Business & Meeting Center",
    src: ["/Images/business-center-1.jpg"],
    alt: "Professional business lounge with computers and meeting space",
    description:
      "Work efficiently with high-speed internet, printing facilities, and private meeting rooms. Ideal for business travelers and remote work.",
    tag: "Business",
    details: [
      { icon: Clock, label: "24/7 Access" },
      { icon: DoubleCheck, label: "High-Speed Wi-Fi & Printing" },
      { icon: Pin, label: "Located in Main Building" },
    ],
    status: { ...defaultStatus },
  },
] satisfies ExperiencesItem[];
