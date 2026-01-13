import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET() {
  try {
    const { blobs } = await list({
      prefix: "promo-images/",
    });

    if (blobs.length > 0) {
      const sortedBlobs = blobs.sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      );

      return NextResponse.json({ url: sortedBlobs[0].url });
    }

    return NextResponse.json({ url: null }, { status: 404 });
  } catch (error) {
    console.error("Failed to fetch promo image:", error);
    return NextResponse.json({ url: null }, { status: 500 });
  }
}
