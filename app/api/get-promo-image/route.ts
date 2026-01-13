import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET() {
  try {
    const { blobs } = await list({
      prefix: "promo-images/",
      limit: 1,
    });

    if (blobs.length > 0) {
      return NextResponse.json({ url: blobs[0].url });
    }

    return NextResponse.json({ url: "/Images/promo-image.jpg" });
  } catch (error) {
    console.error("Failed to fetch promo image:", error);
    return NextResponse.json({ url: "/Images/promo-image.jpg" });
  }
}
