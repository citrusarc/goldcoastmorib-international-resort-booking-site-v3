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
    id: "jugra",
    tag: "Sightseeing",
    name: "Jugra",
    description:
      "Hike or drive up Bukit Jugra to visit its iconic lighthouse and enjoy sweeping views of the coastline, the river, and the countryside.",
    src: ["/Images/jugra-1.jpg", "/Images/jugra-2.jpg", "/Images/jugra-3.jpg"],
    alt: "Jugra",
    status: { ...defaultStatus },
  },
  {
    id: "paramotor",
    tag: "Adventure",
    name: "Paramotor",
    description:
      "Take flight with a tandem paragliding session at Bukit Jugra and enjoy breathtaking views of the hills, river, and sea below — perfect for adventure seekers.",
    src: [
      "/Images/paramotor-1.jpg",
      "/Images/paramotor-2.jpg",
      "/Images/paramotor-3.jpg",
    ],
    alt: "Paramotor",
    status: { ...defaultStatus },
  },
] satisfies NearbyItem[];
