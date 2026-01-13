import { iconoirMap } from "@/lib/iconoirMap";
import { RoomsItem, PriceItem } from "@/types";

function normalizePrice(price: unknown): PriceItem {
  if (typeof price === "string") {
    try {
      return JSON.parse(price) as PriceItem;
    } catch {
      return {
        currency: "RM",
        weekday: Number(price),
        weekend: Number(price),
      };
    }
  }
  if (typeof price === "number") {
    return { currency: "RM", weekday: price, weekend: price };
  }
  if (typeof price === "object" && price !== null) {
    const p = price as Partial<PriceItem>;
    return {
      currency: p.currency ?? "RM",
      weekday: Number(p.weekday ?? 0),
      weekend: Number(p.weekend ?? p.weekday ?? 0),
    };
  }
  return { currency: "RM", weekday: 0, weekend: 0 };
}

function parseSrc(src: unknown): string[] {
  if (Array.isArray(src)) {
    return src as string[];
  }

  if (typeof src === "string") {
    try {
      const parsed = JSON.parse(src);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [parsed];
    } catch {
      return [src];
    }
  }
  return [];
}

export function mapRoomsData(raw: Record<string, unknown>): RoomsItem {
  return {
    id: raw.id as string,
    name: raw.name as string,
    src: parseSrc(raw.src),
    alt: (raw.alt as string) || "Room Image",
    description: raw.description as string,
    tag: (raw.tag as string) || undefined,
    facilities: Array.isArray(raw.facilities)
      ? raw.facilities.map((f: { label: string; icon?: string }) => ({
          label: f.label,
          icon: f.icon
            ? iconoirMap[f.icon as keyof typeof iconoirMap]
            : undefined,
        }))
      : typeof raw.facilities === "string"
      ? JSON.parse(raw.facilities).map(
          (f: { label: string; icon?: string }) => ({
            label: f.label,
            icon: f.icon
              ? iconoirMap[f.icon as keyof typeof iconoirMap]
              : undefined,
          })
        )
      : [],
    price: normalizePrice(raw.price),
    maxGuests: raw.maxGuests ? Number(raw.maxGuests) : 1,
    totalUnits: raw.totalUnits ? Number(raw.totalUnits) : 1,
    availableUnits: raw.availableUnits ? Number(raw.availableUnits) : 1,
    status:
      typeof raw.status === "string"
        ? JSON.parse(raw.status)
        : (raw.status as Record<string, boolean>) || {
            isDisabled: false,
            isHidden: false,
            isComingSoon: false,
            isPromo: false,
            isRecommended: false,
          },
  };
}
