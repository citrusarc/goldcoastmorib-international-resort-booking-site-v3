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
    id: "beach-walk",
    name: "Beach Walks & Sunset Viewing",
    src: [
      "/Images/dummy-image-1.jpg",
      "/Images/dummy-image-2.jpg",
      "/Images/dummy-image-3.jpg",
    ],
    alt: "People walking on Morib Beach during sunset",
    description:
      "Take a relaxing stroll along Morib Beach and enjoy breathtaking golden-hour sunsets over the Straits of Malacca.",
    tag: "Relaxation",
    details: [
      { icon: Clock, label: "1 Single Bed + 1 King Bed" },
      { icon: DoubleCheck, label: "Rain Shower" },
      { icon: Pin, label: "Garden View" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "atv-beach-ride",
    name: "ATV Beach Ride",
    src: [
      "/Images/dummy-image-1.jpg",
      "/Images/dummy-image-2.jpg",
      "/Images/dummy-image-3.jpg",
    ],
    alt: "ATV riders driving along the beach",
    description:
      "Ride an ATV across the sandy coastline for a thrilling experience perfect for families and groups of friends.",
    tag: "Adventure",
    details: [
      { icon: Clock, label: "2 Single Bed + 1 King Bed" },
      { icon: DoubleCheck, label: "Rain Shower" },
      { icon: Pin, label: "Garden View" },
    ],
    status: { ...defaultStatus },
  },
  {
    id: "banana-boat",
    name: "Banana Boat & Jet Ski",
    src: [
      "/Images/dummy-image-1.jpg",
      "/Images/dummy-image-2.jpg",
      "/Images/dummy-image-3.jpg",
    ],
    alt: "Group riding banana boat on the sea",
    description:
      "Feel the excitement of water sports with banana boat rides and jet skiing right off the Morib coastline.",
    tag: "Water Sports",
    details: [
      { icon: Clock, label: "3 Single Bed + 1 King Bed" },
      { icon: DoubleCheck, label: "Rain Shower" },
      { icon: Pin, label: "Garden View" },
    ],
    status: { ...defaultStatus },
  } satisfies FacilitiesItem,
];
