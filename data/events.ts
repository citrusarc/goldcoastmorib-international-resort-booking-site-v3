import { EventsItem, ItemStatus } from "@/types";

const defaultStatus: ItemStatus = {
  isDisabled: false,
  isHidden: false,
  isComingSoon: false,
  isPromo: false,
  isRecommended: false,
};

export const events: EventsItem[] = [
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
    date: "2025-11-15",
    startTime: "17:30",
    endTime: "19:00",
    location: "Morib Beach, Selangor",
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
    date: "2025-11-15",
    startTime: "17:30",
    endTime: "19:00",
    location: "Morib Beach, Selangor",
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
    date: "2025-11-15",
    startTime: "17:30",
    endTime: "19:00",
    location: "Morib Beach, Selangor",
    status: { ...defaultStatus },
  } satisfies EventsItem,
];
