import { iconoirMap } from "@/lib/iconoirMap";
import { AccommodationsItem, PriceItem } from "@/types";

function normalizePrice(price: unknown): PriceItem {
  if (typeof price === "string") {
    try {
      return JSON.parse(price) as PriceItem;
    } catch {
      return {
        currency: "RM",
        current: Number(price),
        original: Number(price),
      };
    }
  }
  if (typeof price === "number") {
    return { currency: "RM", current: price, original: price };
  }

  if (typeof price === "object" && price !== null) {
    const p = price as Partial<PriceItem>;
    return {
      currency: p.currency ?? "RM",
      current: Number(p.current ?? 0),
      original: Number(p.original ?? p.current ?? 0),
    };
  }

  return { currency: "RM", current: 0, original: 0 };
}

export function mapAccommodationsData(
  raw: Record<string, unknown>
): AccommodationsItem {
  return {
    id: raw.id as string,
    name: raw.name as string,
    src: (raw.src as string) || (raw.image as string) || "",
    alt: (raw.alt as string) || "Accommodation Image",
    description: raw.description as string,
    label: (raw.label as string) || undefined,
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
