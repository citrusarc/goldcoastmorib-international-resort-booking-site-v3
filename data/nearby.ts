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
    id: "sri-morib-golf-club",
    tag: "~2 KM",
    name: "Sri Morib Golf Club",
    description:
      "A relaxing 9-hole golf course surrounded by greenery, offering a peaceful environment for golfers of all skill levels near the Morib coastline.",
    src: ["/Images/sri-morib-golf-club-1.jpg"],
    alt: "Sri Morib Golf Club",
    status: { ...defaultStatus },
  },
  {
    id: "pantai-morib",
    tag: "~5 KM",
    name: "Pantai Morib",
    description:
      "A popular beach along Selangor’s coast, known for its wide sandy shores, relaxing sea breeze, and family-friendly picnic spots.",
    src: ["/Images/pantai-morib-1.jpg"],
    alt: "Pantai Morib",
    status: { ...defaultStatus },
  },
  {
    id: "batu-laut-sailing-boat",
    tag: "~5 KM",
    name: "Batu Laut Sailing Boat",
    description:
      "A hotspot for sailing and watersports, offering scenic coastal winds ideal for beginners and sailing enthusiasts.",
    src: ["/Images/batu-laut-sailing-boat-1.jpg"],
    alt: "Batu Laut Sailing Boat",
    status: { ...defaultStatus },
  },
  {
    id: "pantai-kelanang",
    tag: "~10 KM",
    name: "Pantai Kelanang",
    description:
      "A calm and lesser-known mangrove-lined beach, perfect for quiet retreats, sunset viewing, and family picnics.",
    src: ["/Images/pantai-kelanang-1.jpg"],
    alt: "Pantai Kelanang",
    status: { ...defaultStatus },
  },
  {
    id: "jugra",
    tag: "~15 KM",
    name: "Jugra",
    description:
      "Hike or drive up Bukit Jugra to visit its iconic lighthouse and enjoy sweeping views of the coastline, river, and countryside.",
    src: ["/Images/jugra-1.jpg", "/Images/jugra-2.jpg", "/Images/jugra-3.jpg"],
    alt: "Jugra",
    status: { ...defaultStatus },
  },
  {
    id: "paramotor",
    tag: "~15 KM",
    name: "Paramotor",
    description:
      "Experience tandem paramotoring at Bukit Jugra, offering stunning aerial views of hills, rivers, and the coastline — ideal for thrill seekers.",
    src: [
      "/Images/paramotor-1.jpg",
      "/Images/paramotor-2.jpg",
      "/Images/paramotor-3.jpg",
    ],
    alt: "Paramotor",
    status: { ...defaultStatus },
  },
  {
    id: "tanjong-sepat-lovers-bridge",
    tag: "~15 KM",
    name: "Tanjong Sepat Lover's Bridge",
    description:
      "A charming seaside walkway offering peaceful sunset views, popular for photography, relaxing strolls, and enjoying the sea breeze.",
    src: ["/Images/tanjong-sepat-lovers-bridge-1.jpg"],
    alt: "Tanjong Sepat Lover's Bridge",
    status: { ...defaultStatus },
  },
  {
    id: "liulishan-medicine-buddha-monastery",
    tag: "~20 KM",
    name: "Liulishan Medicine Buddha Monastery",
    description:
      "A tranquil Buddhist monastery surrounded by nature—known for its peaceful atmosphere and spiritual architecture.",
    src: ["/Images/liulishan-medicine-buddha-monastery-1.jpg"],
    alt: "Liulishan Medicine Buddha Monastery",
    status: { ...defaultStatus },
  },
  {
    id: "fgs-dong-zen-temple",
    tag: "~30 KM",
    name: "FGS Dong Zen Temple",
    description:
      "A renowned Buddhist temple featuring impressive architecture, beautiful gardens, and vibrant lantern displays during festive seasons.",
    src: ["/Images/fgs-dong-zen-temple-1.jpg"],
    alt: "FGS Dong Zen Temple",
    status: { ...defaultStatus },
  },
  {
    id: "mitsui-outlet",
    tag: "~40 KM",
    name: "Mitsui Outlet Park",
    description:
      "A premium outlet mall near KLIA offering branded fashion, dining options, and a spacious, comfortable shopping environment.",
    src: ["/Images/mitsui-outlet-1.jpg"],
    alt: "Mitsui Outlet Park",
    status: { ...defaultStatus },
  },
  {
    id: "klia",
    tag: "~43 KM",
    name: "KLIA",
    description:
      "Malaysia’s main international airport, known for its modern architecture, iconic interior design, and traveler-friendly facilities.",
    src: ["/Images/klia-1.jpg"],
    alt: "KLIA",
    status: { ...defaultStatus },
  },
  {
    id: "klcc",
    tag: "~78 KM",
    name: "KLCC",
    description:
      "The iconic Kuala Lumpur City Centre — home to the Petronas Twin Towers, a world-famous attraction surrounded by a park, shopping mall, and dining hotspots.",
    src: ["/Images/klcc-1.jpg"],
    alt: "KLCC",
    status: { ...defaultStatus },
  },
] satisfies NearbyItem[];
