import {
  BedIcon,
  BeachBallIcon,
  CalendarDotsIcon,
  ForkKnifeIcon,
  LockersIcon,
} from "@phosphor-icons/react";

import { ItemStatus, NavItem } from "@/types";

export type SiteConfig = typeof siteConfig;

const defaultStatus: ItemStatus = {
  isDisabled: false,
  isHidden: false,
  isComingSoon: false,
  isPromo: false,
  isRecommended: false,
};

export const siteConfig = {
  navItems: [
    {
      id: "accommodations",
      name: "Accommodations",
      href: "/accommodations",
      icon: BedIcon,
      status: { ...defaultStatus },
    },
    {
      id: "experiences",
      name: "Experiences",
      href: "/experiences",
      icon: LockersIcon,
      status: { ...defaultStatus },
    },
    {
      id: "nearby-attractions",
      name: "Nearby Attractions",
      href: "/nearby-attractions",
      icon: BeachBallIcon,
      status: { ...defaultStatus },
    },
    {
      id: "events",
      name: "Events",
      href: "/events",
      icon: CalendarDotsIcon,
      status: { ...defaultStatus },
    },
  ] satisfies NavItem[],
};
