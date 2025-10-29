export type ItemStatus = {
  isDisabled?: boolean;
  isHidden?: boolean;
  isComingSoon?: boolean;
  isPromo?: boolean;
};

export type NavItem = {
  id: string;
  icon?: React.ElementType;
  name: string;
  href?: string;
  target?: string;
  rel?: string;
  status?: ItemStatus;
};

export type PriceItem = {
  currency: string;
  original: number;
  current: number;
};

export type AccomodationsItem = {
  id: string;
  name: string;
  src: string;
  alt: string;
  description?: string;
  label?: string;
  price: PriceItem;
  status?: ItemStatus;
};

export type SlideItem = { src: string; alt: string };
