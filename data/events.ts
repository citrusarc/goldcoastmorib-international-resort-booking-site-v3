import { SlideItem } from "@/types";

export const events: SlideItem[] = [
  {
    src: "/Images/dummy-image-1.jpg",
    alt: "Hero Banner 1",
  },
  {
    src: "/Images/dummy-image-2.jpg",
    alt: "Hero Banner 2",
  },
  {
    src: "/Images/dummy-image-3.jpg",
    alt: "Hero Banner 3",
  } satisfies SlideItem,
];
