import { AccomodationsItem, ItemStatus } from "@/types";

const defaultStatus: ItemStatus = {
  isDisabled: false,
  isHidden: false,
  isComingSoon: false,
  isPromo: false,
};

export const accomodations: AccomodationsItem[] = [
  {
    id: "studio-suite",
    name: "Studio Suite",
    src: "/Images/studio-overview-banner.jpg",
    alt: "Accommodations Image 1",
    description: "Lorem ipsum",
    label: "Recommended",
    price: { currency: "RM", current: 120, original: 120 },
    status: { ...defaultStatus },
  },
  {
    id: "two-rooms-apartment",
    name: "2 Rooms Apartment",
    src: "/Images/apartment-2-rooms-overview-banner.jpg",
    alt: "Accommodations Image 3",
    description: "Lorem ipsum",
    label: "Recommended",
    price: { currency: "RM", current: 120, original: 120 },
    status: { ...defaultStatus },
  },
  {
    id: "three-rooms-apartment",
    name: "3 Rooms Apartment",
    src: "/Images/apartment-3-rooms-overview-banner.jpg",
    alt: "Accommodations Image 4",
    description: "Lorem ipsum",
    label: "Recommended",
    price: { currency: "RM", current: 120, original: 120 },
    status: { ...defaultStatus },
  } satisfies AccomodationsItem,
];
