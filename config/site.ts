import {
  BedIcon,
  BeachBallIcon,
  LockersIcon,
  TreePalmIcon,
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
      id: "rooms",
      name: "Rooms",
      href: "/rooms",
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
      id: "activities-and-events",
      name: "Activities & Events",
      href: "/activities-and-events",
      icon: BeachBallIcon,
      status: { ...defaultStatus },
    },
    {
      id: "nearby",
      name: "Nearby",
      href: "/nearby",
      icon: TreePalmIcon,
      status: { ...defaultStatus },
    },
  ] satisfies NavItem[],
};
