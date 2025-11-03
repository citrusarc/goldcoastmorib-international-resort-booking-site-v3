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
      "/Images/dummy-image-1.jpg",
      "/Images/dummy-image-2.jpg",
      "/Images/dummy-image-3.jpg",
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
      "/Images/dummy-image-1.jpg",
      "/Images/dummy-image-2.jpg",
      "/Images/dummy-image-3.jpg",
    ],
    alt: "ATV riders driving along the beach",
    description:
      "Ride an ATV across the sandy coastline for a thrilling experience perfect for families and groups of friends.",
    tag: "Adventure",
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
    status: { ...defaultStatus },
  },
  {
    id: "forest-playground",
    name: "Tree-Top Adventure Net Playground",
    src: [
      "/Images/dummy-image-1.jpg",
      "/Images/dummy-image-2.jpg",
      "/Images/dummy-image-3.jpg",
    ],
    alt: "Colorful tree-top net playground with duck decorations at Morib",
    description:
      "Enjoy a unique tree-top experience on bright net bridges and swings — a fun outdoor spot for kids to climb, play, and explore safely under the shade of tall pine trees.",
    tag: "Family Fun",
    status: { ...defaultStatus },
  },
  {
    id: "local-seafood",
    name: "Local Seafood Dining",
    src: [
      "/Images/dummy-image-1.jpg",
      "/Images/dummy-image-2.jpg",
      "/Images/dummy-image-3.jpg",
    ],
    alt: "Grilled seafood served on table by the sea",
    description:
      "Savor freshly caught seafood at nearby restaurants such as Lover&apos;s Bridge or Tanjung Sepat — a must-try local treat.",
    tag: "Food & Dining",
    status: { ...defaultStatus },
  },
  {
    id: "bukit-jugra-lighthouse",
    name: "Bukit Jugra Lighthouse Visit",
    src: [
      "/Images/dummy-image-1.jpg",
      "/Images/dummy-image-2.jpg",
      "/Images/dummy-image-3.jpg",
    ],
    alt: "Jugra Lighthouse overlooking the coast",
    description:
      "Just a short drive away, Bukit Jugra offers panoramic coastal views, photo ops, and a glimpse of local heritage.",
    tag: "Sightseeing",
    status: { ...defaultStatus },
  },
  {
    id: "paragliding-jugra",
    name: "Paragliding at Bukit Jugra",
    src: [
      "/Images/dummy-image-1.jpg",
      "/Images/dummy-image-2.jpg",
      "/Images/dummy-image-3.jpg",
    ],
    alt: "Paragliding above Jugra hills",
    description:
      "For thrill-seekers, soar above the coastline with tandem paragliding sessions at Bukit Jugra&apos;s scenic cliffs.",
    tag: "Adventure",
    status: { ...defaultStatus },
  },
  {
    id: "eco-agro-farm",
    name: "Kuala Langat Eco Agro Farm",
    src: [
      "/Images/dummy-image-1.jpg",
      "/Images/dummy-image-2.jpg",
      "/Images/dummy-image-3.jpg",
    ],
    alt: "Family feeding animals at Kuala Langat Eco Agro Farm",
    description:
      "Meet friendly animals, feed rabbits and deer, and learn about local agriculture at this family-friendly eco farm.",
    tag: "Family",
    status: { ...defaultStatus },
  },
  {
    id: "fireflies-cruise",
    name: "Fireflies Cruise at Kampung Kuantan",
    src: [
      "/Images/dummy-image-1.jpg",
      "/Images/dummy-image-2.jpg",
      "/Images/dummy-image-3.jpg",
    ],
    alt: "Boat cruise at night surrounded by glowing fireflies",
    description:
      "Take an enchanting night boat ride through mangroves illuminated by thousands of fireflies — a magical sight to remember.",
    tag: "Nature",
    status: { ...defaultStatus },
  },
  {
    id: "sky-mirror",
    name: "Sky Mirror Kuala Selangor",
    src: [
      "/Images/dummy-image-1.jpg",
      "/Images/dummy-image-2.jpg",
      "/Images/dummy-image-3.jpg",
    ],
    alt: "Tourists posing on the reflective sandbar at Sky Mirror",
    description:
      "A short trip from Morib, visit the famous mirror-like sandbar that reflects the sky perfectly during low tide.",
    tag: "Nature",
    status: { ...defaultStatus },
  } satisfies ActivitiesItem,
];
