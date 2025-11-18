import { Bed, BreadSlice, CreditCard } from "iconoir-react";

export const iconoirMap = {
  Bed,
  BreadSlice,
  CreditCard,
} as const;

export type IconoirName = keyof typeof iconoirMap;
