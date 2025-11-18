import { ActivitiesAndEventsItem, ItemStatus } from "@/types";

const defaultStatus: ItemStatus = {
  isDisabled: false,
  isHidden: false,
  isComingSoon: false,
  isPromo: false,
  isRecommended: false,
};

export const activitiesAndEvents: ActivitiesAndEventsItem[] = [
  {
    id: "birthday-party",
    tag: "Event",
    name: "Birthday Party",
    description:
      "Celebrate your special day with a beachside party featuring custom themes, catering, and decorations — fun for kids, teens, and adults alike.",
    src: ["/Images/birthday-party-1.jpg", "/Images/birthday-party-2.jpg"],
    alt: "Birthday Party",
    status: { ...defaultStatus },
  },
  {
    id: "telimatch",
    tag: "Activity",
    name: "Telimatch",
    description:
      "Enjoy a series of lively and competitive games by the beach that promote teamwork, laughter, and lasting memories for everyone.",
    src: [
      "/Images/telimatch-1.jpg",
      "/Images/telimatch-2.jpg",
      "/Images/telimatch-3.jpg",
    ],
    alt: "Telimatch",
    status: { ...defaultStatus },
  },
  {
    id: "team-building",
    tag: "Corporate",
    name: "Team Building",
    description:
      "Strengthen teamwork and leadership through fun and challenging outdoor activities designed for corporate retreats, schools, and groups.",
    src: [
      "/Images/team-building-1.jpg",
      "/Images/team-building-2.jpg",
      "/Images/team-building-3.jpg",
    ],
    alt: "Team Building",
    status: { ...defaultStatus },
  },
  {
    id: "maraton",
    tag: "Event",
    name: "Maraton",
    description:
      "Join an exciting beachside marathon designed for runners of all levels — enjoy scenic views, refreshing sea breeze, and a fun, energetic atmosphere.",
    src: ["/Images/maraton-1.jpg"],
    alt: "Maraton",
    status: { ...defaultStatus },
  },
  {
    id: "wedding",
    tag: "Event",
    name: "Wedding",
    description:
      "Say ‘I do’ by the sea with a romantic beachfront wedding, complete with stunning decor, catering, and event coordination tailored to your dream day.",
    src: [
      "/Images/wedding-1.jpg",
      "/Images/wedding-2.jpg",
      "/Images/wedding-3.jpg",
    ],
    alt: "Wedding",
    status: { ...defaultStatus },
  },
  {
    id: "anniversary",
    tag: "Event",
    name: "Anniversary",
    description:
      "Celebrate your love with an intimate beachfront dinner or private setup under the stars — perfect for couples marking a special milestone.",
    src: [
      "/Images/anniversary-1.jpg",
      "/Images/anniversary-2.jpg",
      "/Images/anniversary-3.jpg",
    ],
    alt: "Anniversary",
    status: { ...defaultStatus },
  },
] satisfies ActivitiesAndEventsItem[];
