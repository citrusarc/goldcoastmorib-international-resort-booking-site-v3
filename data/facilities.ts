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
    tag: "Family",
    name: "Skyworld",
    description:
      "Experience Malaysia’s first Skyworld Adventure Playground, a vibrant treetop adventure with colorful net bridges, swings, and playful duck decorations.",
    src: ["/Images/skyworld-1.jpg"],
    alt: "Skyworld",
    details: [
      { icon: Clock, label: "Open Daily" },
      { icon: DoubleCheck, label: "Safety Supervision Available" },
      { icon: Pin, label: "Located Near Skyworld Zone" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "theme-park",
    tag: "Relaxation",
    name: "Theme Park",
    description:
      "Take a peaceful stroll along the scenic shoreline and enjoy breathtaking sunsets over the Straits of Malacca. A serene escape right by the resort.",
    src: [
      "/Images/theme-park-1.jpg",
      "/Images/theme-park-2.jpg",
      "/Images/theme-park-3.jpg",
      "/Images/theme-park-4.jpg",
    ],
    alt: "Theme Park",
    details: [
      { icon: Clock, label: "Best During Sunset Hours" },
      { icon: DoubleCheck, label: "Scenic Coastal Path" },
      { icon: Pin, label: "Accessible from Main Beachfront" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "night-water-theme-park",
    tag: "Relaxation",
    name: "Night Water Theme Park",
    description:
      "Dive into an exciting nighttime water adventure featuring illuminated pools, glowing slides, and a vibrant atmosphere perfect for families and friends.",
    src: [
      "/Images/night-water-theme-park-1.jpg",
      "/Images/night-water-theme-park-2.jpg",
    ],
    alt: "Night Water Theme Park",
    details: [
      { icon: Clock, label: "Best During Night Hours" },
      { icon: DoubleCheck, label: "Night Glow Water Attractions" },
      { icon: Pin, label: "Beside Main Water Park Zone" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "bubble-foam",
    tag: "Family",
    name: "Bubble Foam",
    description:
      "Jump, laugh, and dance in a sea of bubbles at the foam play zone. A safe and lively experience that brings out the inner child in everyone.",
    src: ["/Images/bubble-foam-1.jpg"],
    alt: "Bubble Foam",
    details: [
      { icon: Clock, label: "Weekends & Holidays" },
      { icon: DoubleCheck, label: "Supervised Play Area" },
      { icon: Pin, label: "Outdoor Family Zone" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "seafood-catch",
    tag: "Activity",
    name: "Seafood Catch",
    description:
      "Join this hands-on seaside experience where guests can catch small crabs and fish along the coast. A fun and interactive activity for all ages.",
    src: ["/Images/seafood-catch-1.jpg"],
    alt: "Seafood Catch",
    details: [
      { icon: Clock, label: "Tides & Weather Dependent" },
      { icon: DoubleCheck, label: "Equipment Provided" },
      { icon: Pin, label: "Beachside Activity Area" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "beach-walk",
    tag: "Family",
    name: "Beach Walk",
    description:
      "Make a splash at the lively water park with slides, pools, and fountains. Perfect for cooling off and creating joyful memories with family and friends.",
    src: ["/Images/beach-walk-1.jpg"],
    alt: "Beach Walk",
    details: [
      { icon: Clock, label: "Open Daily" },
      { icon: DoubleCheck, label: "Family-Friendly Lifeguards On Duty" },
      { icon: Pin, label: "Within Resort Grounds" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "high-rope",
    tag: "Adventure",
    name: "High Rope",
    description:
      "Test your balance and courage on this elevated rope challenge featuring swinging bridges and obstacles. Designed for teens and adults seeking excitement.",
    src: ["/Images/high-rope-1.jpg"],
    alt: "High Rope",
    details: [
      { icon: Clock, label: "Open Daily" },
      { icon: DoubleCheck, label: "Safety Harness & Briefing Included" },
      { icon: Pin, label: "Ideal for Teens & Adults" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "flying-fox",
    tag: "Adventure",
    name: "Flying Fox",
    description:
      "Soar high above the resort on the Flying Fox zipline and feel the wind rush past as you glide across the landscape for an unforgettable aerial thrill.",
    src: ["/Images/flying-fox-1.jpg"],
    alt: "Flying Fox",
    details: [
      { icon: Clock, label: "Open Daily" },
      { icon: DoubleCheck, label: "Certified Safety Gear Provided" },
      { icon: Pin, label: "Guided by Trained Instructors" },
    ],
    status: { ...defaultStatus },
  },
] satisfies FacilitiesItem[];
