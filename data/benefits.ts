import { BenefitsItem } from "@/types";

export const benefits: BenefitsItem[] = [
  {
    name: "Best Rate",
    description:
      "Get the lowest price guaranteed when you book direct, no hidden fees.",
    src: "/Images/dummy-image.png",
    alt: "Benefits Image 1",
  },
  {
    name: "Family-Friendly",
    description: "Water park access, playgrounds, and kid-friendly dining.",
    src: "/Images/dummy-image.png",
    alt: "Benefits Image 2",
  },
  {
    name: "Local Deals",
    description: "Enjoy on-site offers, exclusive deals and special add-ons.",
    src: "/Images/dummy-image.png",
    alt: "Benefits Image 3",
  } satisfies BenefitsItem,
];
