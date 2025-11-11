import { NearbyItem, ItemStatus } from "@/types";

const defaultStatus: ItemStatus = {
  isDisabled: false,
  isHidden: false,
  isComingSoon: false,
  isPromo: false,
  isRecommended: false,
};

export const nearby: NearbyItem[] = [
  {
    id: "atv",
    name: "ATV",
    src: ["/Images/atv-1.jpg", "/Images/atv-2.jpg", "/Images/atv-3.jpg"],
    alt: "ATV",
    // //
    description:
      "Hop on an ATV and explore the coastal sands of Morib for an exciting beach adventure — perfect for families, couples, and thrill seekers.",
    tag: "Adventure",
    status: { ...defaultStatus },
  },
  {
    id: "firefly",
    name: "Firefly",
    src: [
      "/Images/firefly-1.jpg",
      "/Images/firefly-2.jpg",
      "/Images/firefly-3.jpg",
    ],
    alt: "Firefly",
    // //
    description:
      "Experience a serene evening boat cruise through mangrove forests illuminated by thousands of magical fireflies — a must-see natural wonder.",
    tag: "Nature",
    status: { ...defaultStatus },
  },
  {
    id: "jugra",
    name: "Jugra",
    src: ["/Images/jugra-1.jpg", "/Images/jugra-2.jpg", "/Images/jugra-3.jpg"],
    alt: "Jugra",
    // //
    description:
      "Hike or drive up Bukit Jugra to visit its iconic lighthouse and enjoy sweeping views of the coastline, the river, and the countryside.",
    tag: "Sightseeing",
    status: { ...defaultStatus },
  },
  {
    id: "paramotor",
    name: "Paramotor",
    src: [
      "/Images/paramotor-1.jpg",
      "/Images/paramotor-2.jpg",
      "/Images/paramotor-3.jpg",
    ],
    alt: "Paramotor",
    // //
    description:
      "Take flight with a tandem paragliding session at Bukit Jugra and enjoy breathtaking views of the hills, river, and sea below — perfect for adventure seekers.",
    tag: "Adventure",
    status: { ...defaultStatus },
  },
] satisfies NearbyItem[];
