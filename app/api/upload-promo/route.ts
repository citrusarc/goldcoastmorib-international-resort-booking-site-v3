import { NextRequest, NextResponse } from "next/server";
import { put, del, list } from "@vercel/blob";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // // Upload with timestamp - always succeeds
    const timestamp = Date.now();
    const blob = await put(`promo-images/promo-${timestamp}.jpg`, file, {
      access: "public",
    });

    // // Cleanup: Keep only last 5 uploads (optional)
    try {
      const { blobs } = await list({
        prefix: "promo-images/",
      });

      // Sort by upload date, newest first
      const sortedBlobs = blobs.sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      );

      // Delete older ones (keep 5 most recent)
      if (sortedBlobs.length > 5) {
        const toDelete = sortedBlobs.slice(5);
        for (const oldBlob of toDelete) {
          await del(oldBlob.url);
          console.log("Cleaned up old image:", oldBlob.url);
        }
      }
    } catch (cleanupError) {
      console.log("Cleanup warning (non-critical):", cleanupError);
      // Don't fail the upload if cleanup fails
    }

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
