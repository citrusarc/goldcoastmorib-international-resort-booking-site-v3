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
  {
    id: "fgs-dong-zen-temple",
    tag: "Cultural",
    name: "FGS Dong Zen Temple",
    description:
      "A peaceful Buddhist temple known for its stunning architecture, tranquil gardens, and beautiful lantern displays during festive seasons.",
    src: ["/Images/fgs-dong-zen-temple-1.jpg"],
    alt: "FGS Dong Zen Temple",
    status: { ...defaultStatus },
  },
  {
    id: "pantai-kelanang",
    tag: "Nature",
    name: "Pantai Kelanang",
    description:
      "A quiet coastal beach surrounded by mangroves — perfect for picnics, sunset views, and peaceful seaside strolls.",
    src: ["/Images/pantai-kelanang-1.jpg"],
    alt: "Pantai Kelanang",
    status: { ...defaultStatus },
  },
  {
    id: "batu-laut-sailing-boat",
    tag: "Adventure",
    name: "Batu Laut Sailing Boat",
    description:
      "A popular spot for sailing and watersports, offering scenic coastal views and fun activities for outdoor enthusiasts.",
    src: ["/Images/batu-laut-sailing-boat-1.jpg"],
    alt: "Batu Laut Sailing Boat",
    status: { ...defaultStatus },
  },
  {
    id: "tanjong-sepat-lovers-bridge",
    tag: "Scenic",
    name: "Tanjong Sepat Lover's Bridge",
    description:
      "A beloved landmark offering charming seaside views, ideal for sunset walks, photography, and relaxing by the sea.",
    src: ["/Images/tanjong-sepat-lovers-bridge-1.jpg"],
    alt: "Tanjong Sepat Lover's Bridge",
    status: { ...defaultStatus },
  },
] satisfies NearbyItem[];
