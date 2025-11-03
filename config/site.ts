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
      id: "facilities",
      name: "Facilities",
      href: "/facilities",
      icon: LockersIcon,
      status: { ...defaultStatus },
    },
    {
      id: "activities",
      name: "Activities",
      href: "/activities",
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
