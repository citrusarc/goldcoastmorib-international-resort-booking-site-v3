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
    name: "Birthday Party",
    src: ["/Images/birthday-party-1.jpg", "/Images/birthday-party-2.jpg"],
    alt: "Birthday Party",
    // //
    description:
      "Celebrate your special day with a beachside party featuring custom themes, catering, and decorations — fun for kids, teens, and adults alike.",
    tag: "Event",
    status: { ...defaultStatus },
  },
  {
    id: "telimatch",
    name: "Telimatch",
    src: [
      "/Images/telimatch-1.jpg",
      "/Images/telimatch-2.jpg",
      "/Images/telimatch-3.jpg",
    ],
    alt: "Telimatch",
    // //
    description:
      "Enjoy a series of lively and competitive games by the beach that promote teamwork, laughter, and lasting memories for everyone.",
    tag: "Activity",
    status: { ...defaultStatus },
  },
  {
    id: "team-building",
    name: "Team Building",
    src: [
      "/Images/team-building-1.jpg",
      "/Images/team-building-2.jpg",
      "/Images/team-building-3.jpg",
    ],
    alt: "Team Building",
    // //
    description:
      "Strengthen teamwork and leadership through fun and challenging outdoor activities designed for corporate retreats, schools, and groups.",
    tag: "Corporate",
    status: { ...defaultStatus },
  },
  {
    id: "wedding",
    name: "Wedding",
    src: [
      "/Images/wedding-1.jpg",
      "/Images/wedding-2.jpg",
      "/Images/wedding-3.jpg",
    ],
    alt: "Wedding",
    // //
    description:
      "Say ‘I do’ by the sea with a romantic beachfront wedding, complete with stunning decor, catering, and event coordination tailored to your dream day.",
    tag: "Event",
    status: { ...defaultStatus },
  },
  {
    id: "anniversary",
    name: "Anniversary",
    src: [
      "/Images/anniversary-1.jpg",
      "/Images/anniversary-2.jpg",
      "/Images/anniversary-3.jpg",
    ],
    alt: "Anniversary",
    // //
    description:
      "Celebrate your love with an intimate beachfront dinner or private setup under the stars — perfect for couples marking a special milestone.",
    tag: "Event",
    status: { ...defaultStatus },
  },
] satisfies ActivitiesAndEventsItem[];
