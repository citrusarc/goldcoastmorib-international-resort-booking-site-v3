import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ItemStatus = {
  isDisabled?: boolean;
  isHidden?: boolean;
  isComingSoon?: boolean;
  isPromo?: boolean;
  isRecommended: boolean;
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

export type SlideItem = { src: string; alt: string };

export type BenefitsItem = {
  name: string;
  description?: string;
  src: string;
  alt: string;
};

export type PriceItem = {
  currency: string;
  original: number;
  current: number;
};

export type IconProps = {
  icon?: React.FC<IconSvgProps>;
  label?: string;
};

export type AccommodationsItem = {
  id: string;
  name: string;
  src: string | string[];
  alt: string;
  description?: string;
  label?: string;
  facilities?: IconProps[];
  price: PriceItem;
  maxGuests: number;
  totalUnits?: number;
  availableUnits?: number;
  status?: ItemStatus;
};

export type ActivitiesItem = {
  id: string;
  name: string;
  src: string;
  alt: string;
  description?: string;
  label?: string;
  status?: ItemStatus;
};

// export type BookingForms = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   earlyCheckIn?: string;
//   remarks?: string;
// };

export type BookingEmailTemplateProps = {
  bookingNumber: string;
  firstName: string;
  accommodationsName: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  earlyCheckIn?: string | null;
  remarks?: string | null;
  currency: string;
  totalPrice: number;
  createdAt: string;
};

export type ModalProps = {
  title?: string;
  message?: string;
  href?: string;
  CTA?: string;
  isOpen: boolean;
  onClose: () => void;
};
