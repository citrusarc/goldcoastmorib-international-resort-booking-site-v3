import { AccommodationsItem, ItemStatus } from "@/types";
import { Bathroom, Bed, MediaImage } from "iconoir-react";

const defaultStatus: ItemStatus = {
  isDisabled: false,
  isHidden: false,
  isComingSoon: false,
  isPromo: false,
  isRecommended: false,
};

export const accommodations: AccommodationsItem[] = [
  {
    id: "studio-suite",
    name: "Studio Suite",
    src: [
      "/Images/studio-suite-1.jpg",
      "/Images/studio-suite-2.jpg",
      "/Images/studio-suite-3.jpg",
    ],
    alt: "Studio Suite Images",
    description:
      "A cozy retreat with 2 single beds, garden views, and a private balcony — perfect for couples or friends seeking a relaxing escape.",
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
    id: "three-rooms-penthouse",
    name: "3 Rooms Penthouse",
    src: [
      "/Images/three-rooms-penthouse-1.jpg",
      "/Images/three-rooms-penthouse-2.jpg",
      "/Images/three-rooms-penthouse-3.jpg",
    ],
    alt: "3 Rooms Penthouse Images",
    description:
      "Spacious 46 m² apartment featuring a queen bed, shower + bathtub, and a balcony/terrace for a relaxing stay.",
    tag: "Recommended",
    facilities: [
      { icon: Bed, label: "1 Queen Bed" },
      { icon: Bathroom, label: "Rain Shower + Bathtub" },
      { icon: MediaImage, label: "Balcony/terrace" },
    ],
    price: { currency: "RM", current: 180, original: 180 },
    maxGuests: 2,
    totalUnits: 1,
    availableUnits: 1,
    status: { ...defaultStatus },
  },
  {
    id: "four-rooms-penthouse",
    name: "4 Rooms Penthouse",
    src: [
      "/Images/four-rooms-penthouse-1.jpg",
      "/Images/four-rooms-penthouse-2.jpg",
      "/Images/four-rooms-penthouse-3.jpg",
    ],
    alt: "4 Rooms Penthouse Images",
    description:
      "Expansive 177 m² penthouse featuring 1 king and 1 single bed, a shower, sweeping garden views, and an extra-large balcony facing the sea — spacious enough to host private events of up to 50 guests.",
    tag: "Recommended",
    facilities: [
      { icon: Bed, label: "1 Single Bed + 1 King Bed" },
      { icon: Bathroom, label: "Rain Shower" },
      { icon: MediaImage, label: "Garden View" },
    ],
    price: { currency: "RM", current: 350, original: 350 },
    maxGuests: 5,
    totalUnits: 1,
    availableUnits: 1,
    status: { ...defaultStatus },
  },
  {
    id: "two-rooms-apartment",
    name: "2 Rooms Apartment",
    src: [
      "/Images/two-rooms-apartment-1.jpg",
      "/Images/two-rooms-apartment-2.jpg",
      "/Images/two-rooms-apartment-3.jpg",
    ],
    alt: "2 Rooms Apartment Images",
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
    id: "three-rooms-apartment",
    name: "3 Rooms Apartment",
    src: [
      "/Images/three-rooms-apartment-1.jpg",
      "/Images/three-rooms-apartment-2.jpg",
      "/Images/three-rooms-apartment-3.jpg",
    ],
    alt: "3 Rooms Apartment Images",
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
];
