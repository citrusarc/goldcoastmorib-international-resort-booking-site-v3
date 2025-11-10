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
    id: "atv-beach-ride",
    name: "ATV Coastal Adventure Ride",
    src: [
      "/Images/atv-beach-ride-1.jpg",
      "/Images/atv-beach-ride-2.jpg",
      "/Images/atv-beach-ride-3.jpg",
    ],
    alt: "Guests riding ATVs along the sandy Morib coastline",
    description:
      "Hop on an ATV and explore the coastal sands of Morib for an exciting beach adventure — perfect for families, couples, and thrill seekers.",
    tag: "Adventure",
    status: { ...defaultStatus },
  },
  {
    id: "team-building",
    name: "Outdoor Team Building",
    src: [
      "/Images/team-building-1.jpg",
      "/Images/team-building-2.jpg",
      "/Images/team-building-3.jpg",
    ],
    alt: "Corporate team engaging in outdoor team-building activities by the beach",
    description:
      "Strengthen teamwork and leadership through fun and challenging outdoor activities designed for corporate retreats, schools, and groups.",
    tag: "Corporate",
    status: { ...defaultStatus },
  },
  {
    id: "telematch-games",
    name: "Telematch Beach Games",
    src: [
      "/Images/telematch-games-1.jpg",
      "/Images/telematch-games-2.jpg",
      "/Images/telematch-games-3.jpg",
    ],
    alt: "Groups competing in beach telematch games under the sun",
    description:
      "Enjoy a series of lively and competitive games by the beach that promote teamwork, laughter, and lasting memories for everyone.",
    tag: "Activity",
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
    alt: "Boat gliding through mangroves surrounded by glowing fireflies",
    description:
      "Experience a serene evening boat cruise through mangrove forests illuminated by thousands of magical fireflies — a must-see natural wonder.",
    tag: "Nature",
    status: { ...defaultStatus },
  },
  {
    id: "bukit-jugra-lighthouse",
    name: "Bukit Jugra Lighthouse & Hill Viewpoint",
    src: [
      "/Images/bukit-jugra-lighthouse-1.jpg",
      "/Images/bukit-jugra-lighthouse-2.jpg",
      "/Images/bukit-jugra-lighthouse-3.jpg",
    ],
    alt: "Historic lighthouse on Bukit Jugra hill overlooking the coast",
    description:
      "Hike or drive up Bukit Jugra to visit its iconic lighthouse and enjoy sweeping views of the coastline, the river, and the countryside.",
    tag: "Sightseeing",
    status: { ...defaultStatus },
  },
  {
    id: "paragliding-jugra",
    name: "Paragliding Experience at Bukit Jugra",
    src: [
      "/Images/paragliding-jugra-1.jpg",
      "/Images/paragliding-jugra-2.jpg",
      "/Images/paragliding-jugra-3.jpg",
    ],
    alt: "Paragliders soaring above the scenic hills and coastline of Jugra",
    description:
      "Take flight with a tandem paragliding session at Bukit Jugra and enjoy breathtaking views of the hills, river, and sea below — perfect for adventure seekers.",
    tag: "Adventure",
    status: { ...defaultStatus },
  },
  {
    id: "birthday-party",
    name: "Birthday Party by the Beach",
    src: ["/Images/birthday-party-1.jpg", "/Images/birthday-party-2.jpg"],
    alt: "Beachside birthday party setup with balloons and colorful decorations",
    description:
      "Celebrate your special day with a beachside party featuring custom themes, catering, and decorations — fun for kids, teens, and adults alike.",
    tag: "Event",
    status: { ...defaultStatus },
  },
  {
    id: "wedding-event",
    name: "Beachfront Wedding Celebration",
    src: [
      "/Images/wedding-event-1.jpg",
      "/Images/wedding-event-2.jpg",
      "/Images/wedding-event-3.jpg",
    ],
    alt: "Romantic wedding ceremony setup by the beach with floral arch and seating",
    description:
      "Say ‘I do’ by the sea with a romantic beachfront wedding, complete with stunning decor, catering, and event coordination tailored to your dream day.",
    tag: "Event",
    status: { ...defaultStatus },
  },
  {
    id: "anniversary-celebration",
    name: "Romantic Anniversary Celebration",
    src: [
      "/Images/anniversary-celebration-1.jpg",
      "/Images/anniversary-celebration-2.jpg",
    ],
    alt: "Romantic candlelit dinner setup for couple celebrating anniversary by the beach",
    description:
      "Celebrate your love with an intimate beachfront dinner or private setup under the stars — perfect for couples marking a special milestone.",
    tag: "Event",
    status: { ...defaultStatus },
  },
] satisfies NearbyAttractionsItem[];
