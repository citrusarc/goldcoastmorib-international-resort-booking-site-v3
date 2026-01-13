import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET() {
  try {
    const { blobs } = await list({
      prefix: "promo-images/",
    });

    if (blobs.length > 0) {
      // Get the most recent upload
      const sortedBlobs = blobs.sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      );

      return NextResponse.json({ url: sortedBlobs[0].url });
    }

    // Fallback to default
    return NextResponse.json({ url: "/Images/promo-image.jpg" });
  } catch (error) {
    console.error("Failed to fetch promo image:", error);
    return NextResponse.json({ url: "/Images/promo-image.jpg" });
  }
}
