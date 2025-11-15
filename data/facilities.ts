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
    id: "skyworld",
    name: "Skyworld",
    src: ["/Images/skyworld-1.jpg"],
    alt: "Skyworld",
    description:
      "Experience Malaysia’s first Skyworld Adventure Playground, a vibrant treetop adventure with colorful net bridges, swings, and playful duck decorations.",
    tag: "Family",
    details: [
      { icon: Clock, label: "Open Daily" },
      { icon: DoubleCheck, label: "Safety Supervision Available" },
      { icon: Pin, label: "Located Near Skyworld Zone" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "theme-park",
    name: "Theme Park",
    src: [
      "/Images/theme-park-1.jpg",
      "/Images/theme-park-2.jpg",
      "/Images/theme-park-3.jpg",
      "/Images/theme-park-4.jpg",
    ],
    alt: "Theme Park",
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
    id: "night-water-theme-park",
    name: "Night Water Theme Park",
    src: [
      "/Images/night-water-theme-park-1.jpg",
      "/Images/night-water-theme-park-2.jpg",
    ],
    alt: "Night Water Theme Park",
    description:
      "Dive into an exciting nighttime water adventure featuring illuminated pools, glowing slides, and a vibrant atmosphere perfect for families and friends.",
    tag: "Relaxation",
    details: [
      { icon: Clock, label: "Best During Night Hours" },
      { icon: DoubleCheck, label: "Night Glow Water Attractions" },
      { icon: Pin, label: "Beside Main Water Park Zone" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "bubble-foam",
    name: "Bubble Foam",
    src: ["/Images/bubble-foam-1.jpg"],
    alt: "Bubble Foam",
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
    id: "seafood-catch",
    name: "Seafood Catch",
    src: ["/Images/seafood-catch-1.jpg"],
    alt: "Seafood Catch",
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
    id: "beach-walk",
    name: "Beach Walk",
    src: ["/Images/beach-walk-1.jpg"],
    alt: "Beach Walk",
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
    id: "high-rope",
    name: "High Rope",
    src: ["/Images/high-rope-1.jpg"],
    alt: "High Rope",
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
    id: "flying-fox",
    name: "Flying Fox",
    src: ["/Images/flying-fox-1.jpg"],
    alt: "Flying Fox",
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
] satisfies FacilitiesItem[];
