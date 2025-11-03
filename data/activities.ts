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
    src: ["/Images/dummy-image.png"],
    alt: "People walking on Morib Beach during sunset",
    description:
      "Take a relaxing stroll along Morib Beach and enjoy breathtaking golden-hour sunsets over the Straits of Malacca.",
    label: "Relaxation",
    status: { ...defaultStatus },
  },
  {
    id: "atv-beach-ride",
    name: "ATV Beach Ride",
    src: ["/Images/dummy-image.png"],
    alt: "ATV riders driving along the beach",
    description:
      "Ride an ATV across the sandy coastline for a thrilling experience perfect for families and groups of friends.",
    label: "Adventure",
    status: { ...defaultStatus },
  },
  {
    id: "banana-boat",
    name: "Banana Boat & Jet Ski",
    src: ["/Images/activities/banana-boat.jpg"],
    alt: "Group riding banana boat on the sea",
    description:
      "Feel the excitement of water sports with banana boat rides and jet skiing right off the Morib coastline.",
    label: "Water Sports",
    status: { ...defaultStatus },
  },
  {
    id: "forest-playground",
    name: "Tree-Top Adventure Net Playground",
    src: ["/Images/activities/forest-playground.jpg"],
    alt: "Colorful tree-top net playground with duck decorations at Morib",
    description:
      "Enjoy a unique tree-top experience on bright net bridges and swings — a fun outdoor spot for kids to climb, play, and explore safely under the shade of tall pine trees.",
    label: "Family Fun",
    status: { ...defaultStatus },
  },
  {
    id: "local-seafood",
    name: "Local Seafood Dining",
    src: ["/Images/activities/seafood-dining.jpg"],
    alt: "Grilled seafood served on table by the sea",
    description:
      "Savor freshly caught seafood at nearby restaurants such as Lover&apos;s Bridge or Tanjung Sepat — a must-try local treat.",
    label: "Food & Dining",
    status: { ...defaultStatus },
  },
  {
    id: "bukit-jugra-lighthouse",
    name: "Bukit Jugra Lighthouse Visit",
    src: ["/Images/activities/lighthouse.jpg"],
    alt: "Jugra Lighthouse overlooking the coast",
    description:
      "Just a short drive away, Bukit Jugra offers panoramic coastal views, photo ops, and a glimpse of local heritage.",
    label: "Sightseeing",
    status: { ...defaultStatus },
  },
  {
    id: "paragliding-jugra",
    name: "Paragliding at Bukit Jugra",
    src: ["/Images/activities/paragliding.jpg"],
    alt: "Paragliding above Jugra hills",
    description:
      "For thrill-seekers, soar above the coastline with tandem paragliding sessions at Bukit Jugra&apos;s scenic cliffs.",
    label: "Adventure",
    status: { ...defaultStatus },
  },
  {
    id: "eco-agro-farm",
    name: "Kuala Langat Eco Agro Farm",
    src: ["/Images/activities/eco-farm.jpg"],
    alt: "Family feeding animals at Kuala Langat Eco Agro Farm",
    description:
      "Meet friendly animals, feed rabbits and deer, and learn about local agriculture at this family-friendly eco farm.",
    label: "Family",
    status: { ...defaultStatus },
  },
  {
    id: "fireflies-cruise",
    name: "Fireflies Cruise at Kampung Kuantan",
    src: ["/Images/activities/fireflies-cruise.jpg"],
    alt: "Boat cruise at night surrounded by glowing fireflies",
    description:
      "Take an enchanting night boat ride through mangroves illuminated by thousands of fireflies — a magical sight to remember.",
    label: "Nature",
    status: { ...defaultStatus },
  },
  {
    id: "sky-mirror",
    name: "Sky Mirror Kuala Selangor",
    src: ["/Images/activities/sky-mirror.jpg"],
    alt: "Tourists posing on the reflective sandbar at Sky Mirror",
    description:
      "A short trip from Morib, visit the famous mirror-like sandbar that reflects the sky perfectly during low tide.",
    label: "Nature",
    status: { ...defaultStatus },
  } satisfies ActivitiesItem,
];
