import { NearbyAttractionsItem, ItemStatus } from "@/types";

const defaultStatus: ItemStatus = {
  isDisabled: false,
  isHidden: false,
  isComingSoon: false,
  isPromo: false,
  isRecommended: false,
};

export const nearbyAttractions: NearbyAttractionsItem[] = [
  {
    id: "beach-walk",
    name: "Beach Walks & Sunset Viewing",
    src: [
      "/Images/beach-walk-1.jpg",
      "/Images/beach-walk-2.jpg",
      "/Images/beach-walk-3.jpg",
    ],
    alt: "People walking on Morib Beach during sunset",
    description:
      "Take a relaxing stroll along Morib Beach and enjoy breathtaking golden-hour sunsets over the Straits of Malacca.",
    tag: "Relaxation",
    status: { ...defaultStatus },
  },
  {
    id: "atv-beach-ride",
    name: "ATV Beach Ride",
    src: [
      "/Images/atv-beach-ride-1.jpg",
      "/Images/atv-beach-ride-2.jpg",
      "/Images/atv-beach-ride-3.jpg",
    ],
    alt: "ATV riders driving along the beach",
    description:
      "Ride an ATV across the sandy coastline for a thrilling beach adventure — perfect for families and groups of friends.",
    tag: "Adventure",
    status: { ...defaultStatus },
  },

  {
    id: "birthday-party",
    name: "Birthday Party Celebration",
    src: ["/Images/birthday-party-1.jpg", "/Images/birthday-party-2.jpg"],
    alt: "Beachside birthday celebration setup",
    description:
      "Celebrate birthdays in style with customizable packages, decorations, and catering for unforgettable moments by the beach.",
    tag: "Event",
    status: { ...defaultStatus },
  },
  {
    id: "fireflies-cruise",
    name: "Fireflies Cruise at Kampung Kuantan",
    src: [
      "/Images/fireflies-cruise-1.jpg",
      "/Images/fireflies-cruise-2.jpg",
      "/Images/fireflies-cruise-3.jpg",
    ],
    alt: "Boat cruise at night surrounded by glowing fireflies",
    description:
      "Take an enchanting night boat ride through mangroves illuminated by thousands of fireflies — a magical sight to remember.",
    tag: "Nature",
    status: { ...defaultStatus },
  },
  {
    id: "bukit-jugra-lighthouse",
    name: "Bukit Jugra Lighthouse Visit",
    src: [
      "/Images/bukit-jugra-lighthouse-1.jpg",
      "/Images/bukit-jugra-lighthouse-2.jpg",
      "/Images/bukit-jugra-lighthouse-3.jpg",
    ],
    alt: "Jugra Lighthouse overlooking the coast",
    description:
      "Visit Bukit Jugra Lighthouse for panoramic coastal views, photo opportunities, and a glimpse of local heritage.",
    tag: "Sightseeing",
    status: { ...defaultStatus },
  },
  {
    id: "paragliding-jugra",
    name: "Paragliding at Bukit Jugra",
    src: [
      "/Images/paragliding-jugra-1.jpg",
      "/Images/paragliding-jugra-2.jpg",
      "/Images/paragliding-jugra-3.jpg",
    ],
    alt: "Paragliding above Jugra hills",
    description:
      "Soar above the coastline with tandem paragliding sessions at Bukit Jugra’s scenic cliffs — an unforgettable thrill for adventure seekers.",
    tag: "Adventure",
    status: { ...defaultStatus },
  },
] satisfies NearbyAttractionsItem[];
