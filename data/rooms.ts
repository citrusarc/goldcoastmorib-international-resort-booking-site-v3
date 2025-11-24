import { RoomsItem, ItemStatus } from "@/types";
import { BreadSlice, Bed, CreditCard } from "iconoir-react";

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
    tag: "Recommended",
    name: "Studio Suite",
    description:
      "A cozy retreat featuring two single beds, a private balcony with seaview and garden views — ideal for couples or friends looking for a relaxing getaway.",
    src: [
      "/Images/studio-suite-1.jpg",
      "/Images/studio-suite-2.jpg",
      "/Images/studio-suite-3.jpg",
      "/Images/studio-suite-4.jpg",
      "/Images/studio-suite-5.jpg",
    ],
    alt: "Studio Suite Images",
    facilities: [
      { icon: Bed, label: "Private Bathroom With Jacuzzi" },
      { icon: BreadSlice, label: "2x Breakfast" },
      { icon: CreditCard, label: "2x Water Theme Park Ticket" },
    ],
    price: { currency: "RM", weekday: 198, weekend: 268 },
    totalUnits: 1,
    availableUnits: 1,
    maxGuests: 2,
    status: { ...defaultStatus },
  },
  {
    id: "two-rooms-apartment",
    tag: "Recommended",
    name: "2 Rooms Apartment",
    description:
      "Comfortable 51 m² unit with 2 single beds, shower with a garden view — perfect for small families.",
    src: [
      "/Images/two-rooms-apartment-1.jpg",
      "/Images/two-rooms-apartment-2.jpg",
      "/Images/two-rooms-apartment-3.jpg",
      "/Images/two-rooms-apartment-4.jpg",
    ],
    alt: "Two Rooms Apartment Images",
    facilities: [
      { icon: Bed, label: "2 Bedroom With Living Hall" },
      { icon: BreadSlice, label: "4x Breakfast" },
      { icon: CreditCard, label: "4x Water Theme Park Ticket" },
    ],
    price: { currency: "RM", weekday: 288, weekend: 388 },
    totalUnits: 1,
    availableUnits: 1,
    maxGuests: 4,
    status: { ...defaultStatus },
  },
  {
    id: "three-rooms-apartment",
    tag: "Recommended",
    name: "3 Rooms Apartment",
    description:
      "Comfortable 79 m² unit with 5 single beds, shower with a garden view — perfect for small families.",
    src: [
      "/Images/three-rooms-apartment-1.jpg",
      "/Images/three-rooms-apartment-2.jpg",
      "/Images/three-rooms-apartment-3.jpg",
      "/Images/three-rooms-apartment-4.jpg",
      "/Images/three-rooms-apartment-5.jpg",
    ],
    alt: "Two Rooms Apartment Images",
    facilities: [
      { icon: Bed, label: "3 Bedroom With Living Hall" },
      { icon: BreadSlice, label: "5x Breakfast" },
      { icon: CreditCard, label: "5x Water Theme Park Ticket" },
    ],
    price: { currency: "RM", weekday: 388, weekend: 488 },
    totalUnits: 1,
    availableUnits: 1,
    maxGuests: 5,
    status: { ...defaultStatus },
  },
  {
    id: "three-rooms-penthouse",
    tag: "Recommended",
    name: "3 Rooms Penthouse",
    description:
      "Large 241 m² apartment with 5 single beds, a shower with seaview — great for groups or big families.",
    src: [
      "/Images/three-rooms-penthouse-1.jpg",
      "/Images/three-rooms-penthouse-2.jpg",
      "/Images/three-rooms-penthouse-3.jpg",
      "/Images/three-rooms-penthouse-4.jpg",
      "/Images/three-rooms-penthouse-5.jpg",
    ],
    alt: "3 Rooms Penthouse Images",
    facilities: [
      { icon: Bed, label: "3 Bedroom With Living Hall" },
      { icon: BreadSlice, label: "6x Breakfast" },
      { icon: CreditCard, label: "6x Water Theme Park Ticket" },
    ],
    price: { currency: "RM", weekday: 588, weekend: 688 },
    totalUnits: 1,
    availableUnits: 1,
    maxGuests: 6,
    status: { ...defaultStatus },
  },
  {
    id: "four-rooms-penthouse",
    tag: "Recommended",
    name: "4 Rooms Penthouse",
    description:
      "Large 241 m² apartment with 8 single beds, a shower with seaview — great for groups or big families.",
    src: [
      "/Images/four-rooms-penthouse-1.jpg",
      "/Images/four-rooms-penthouse-2.jpg",
      "/Images/four-rooms-penthouse-3.jpg",
      "/Images/four-rooms-penthouse-4.jpg",
      "/Images/four-rooms-penthouse-5.jpg",
      "/Images/four-rooms-penthouse-6.jpg",
    ],
    alt: "4 Rooms Penthouse Images",
    facilities: [
      { icon: Bed, label: "4 Bedroom With Living Hall" },
      { icon: BreadSlice, label: "7x Breakfast" },
      { icon: CreditCard, label: "7x Water Theme Park Ticket" },
    ],
    price: { currency: "RM", weekday: 688, weekend: 788 },
    totalUnits: 1,
    availableUnits: 1,
    maxGuests: 7,
    status: { ...defaultStatus },
  },
] satisfies RoomsItem[];
