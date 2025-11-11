import { RoomsItem, ItemStatus } from "@/types";
import { Bathroom, Bed, MediaImage } from "iconoir-react";

const defaultStatus: ItemStatus = {
  isDisabled: false,
  isHidden: false,
  isComingSoon: false,
  isPromo: false,
  isRecommended: false,
};

export const rooms: RoomsItem[] = [
  {
    id: "studio-suite",
    name: "Studio Suite",
    src: [
      "/Images/studio-suite-1.jpg",
      "/Images/studio-suite-2.jpg",
      "/Images/studio-suite-3.jpg",
      "/Images/studio-suite-4.jpg",
      "/Images/studio-suite-5.jpg",
    ],
    alt: "Studio Suite Images",
    // //
    description:
      "A cozy retreat featuring two single beds, a private balcony, and tranquil garden views — ideal for couples or friends looking for a relaxing getaway.",
    tag: "Recommended",
    facilities: [
      { icon: Bed, label: "2 Single Beds" },
      { icon: Bathroom, label: "Rain Shower" },
      { icon: MediaImage, label: "Garden View" },
    ],
    price: { currency: "RM", current: 120, original: 120 },
    maxGuests: 2,
    totalUnits: 1,
    availableUnits: 1,
    status: { ...defaultStatus },
  },
  {
    id: "apartment",
    name: "Apartment",
    src: [
      "/Images/apartment-1.jpg",
      "/Images/apartment-2.jpg",
      "/Images/apartment-3.jpg",
      "/Images/apartment-4.jpg",
      "/Images/apartment-5.jpg",
    ],
    alt: "Apartment Images",
    // //
    description:
      "Comfortable 51 m² unit with 2 single beds, shower, and a garden view — perfect for small families.",
    tag: "Recommended",
    facilities: [
      { icon: Bed, label: "2 Single Beds" },
      { icon: Bathroom, label: "Rain Shower" },
      { icon: MediaImage, label: "Garden View" },
    ],
    price: { currency: "RM", current: 250, original: 250 },
    maxGuests: 3,
    totalUnits: 1,
    availableUnits: 1,
    status: { ...defaultStatus },
  },
  {
    id: "penthouse",
    name: "Penthouse",
    src: [
      "/Images/penthouse-1.jpg",
      "/Images/penthouse-2.jpg",
      "/Images/penthouse-3.jpg",
      "/Images/penthouse-4.jpg",
      "/Images/penthouse-5.jpg",
    ],
    alt: "Penthouse Images",
    // //
    description:
      "Large 68 m² apartment with 5 single beds, a shower, and garden views — great for groups or big families.",
    tag: "Recommended",
    facilities: [
      { icon: Bed, label: "5 Single Beds" },
      { icon: Bathroom, label: "Rain Shower" },
      { icon: MediaImage, label: "Garden View" },
    ],
    price: { currency: "RM", current: 280, original: 280 },
    maxGuests: 5,
    totalUnits: 1,
    availableUnits: 1,
    status: { ...defaultStatus },
  },
] satisfies RoomsItem[];
