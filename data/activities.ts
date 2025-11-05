import { ActivitiesItem, ItemStatus } from "@/types";

const defaultStatus: ItemStatus = {
  isDisabled: false,
  isHidden: false,
  isComingSoon: false,
  isPromo: false,
  isRecommended: false,
};

export const activities: ActivitiesItem[] = [
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
      "Ride an ATV across the sandy coastline for a thrilling experience perfect for families and groups of friends.",
    tag: "Adventure",
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
      "Just a short drive away, Bukit Jugra offers panoramic coastal views, photo ops, and a glimpse of local heritage.",
    tag: "Sightseeing",
    status: { ...defaultStatus },
  },
  {
    id: "forest-playground",
    name: "Tree-Top Adventure Net Playground",
    src: [
      "/Images/forest-playground-1.jpg",
      "/Images/forest-playground-2.jpg",
      "/Images/forest-playground-3.jpg",
    ],
    alt: "Colorful tree-top net playground with duck decorations at Morib",
    description:
      "Enjoy a unique tree-top experience on bright net bridges and swings — a fun outdoor spot for kids to climb, play, and explore safely under the shade of tall pine trees.",
    tag: "Family Fun",
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
      "For thrill-seekers, soar above the coastline with tandem paragliding sessions at Bukit Jugra’s scenic cliffs.",
    tag: "Adventure",
    status: { ...defaultStatus },
  } satisfies ActivitiesItem,
];
