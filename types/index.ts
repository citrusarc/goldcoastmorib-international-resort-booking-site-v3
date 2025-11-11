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

export type PriceItem = {
  currency: string;
  original: number;
  current: number;
};

export type IconProps = {
  icon?: React.FC<IconSvgProps>;
  label?: string;
};

export type SlideItem = { src: string; alt: string };

export type BenefitsItem = {
  name: string;
  description?: string;
  src: string;
  alt: string;
};

export type RoomsItem = {
  id: string;
  name: string;
  src: string | string[];
  alt: string;
  description?: string;
  tag?: string;
  facilities?: IconProps[];
  price: PriceItem;
  maxGuests: number;
  totalUnits?: number;
  availableUnits?: number;
  status?: ItemStatus;
};

export type FacilitiesItem = {
  id: string;
  name: string;
  src: string | string[];
  alt: string;
  description?: string;
  tag?: string;
  details?: IconProps[];
  status?: ItemStatus;
};

export type ActivitiesAndEventsItem = {
  id: string;
  name: string;
  src: string | string[];
  alt: string;
  description?: string;
  tag?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  status?: ItemStatus;
};

export type NearbyItem = {
  id: string;
  name: string;
  src: string | string[];
  alt: string;
  description?: string;
  tag?: string;
  status?: ItemStatus;
};

export type BookingItem = {
  id: string;
  roomsId: string;
  status: "confirmed" | "cancelled" | string;
  checkInDate: string;
  checkOutDate: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  adults?: number;
  children?: number;
  earlyCheckIn?: string | null;
  remarks?: string | null;
};

export type BookingEmailTemplateProps = {
  bookingNumber: string;
  firstName: string;
  roomsName: string;
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
