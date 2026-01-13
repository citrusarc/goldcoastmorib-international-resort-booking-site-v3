import { NextRequest, NextResponse } from "next/server";
import { put, del, list } from "@vercel/blob";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    try {
      const { blobs } = await list({
        prefix: "promo-images/",
      });

      for (const blob of blobs) {
        await del(blob.url);
      }
    } catch (deleteError) {
      console.log(
        "No existing promo image to delete or delete failed:",
        deleteError
      );
    }

    const blob = await put("promo-images/promo-image.jpg", file, {
      access: "public",
      addRandomSuffix: false,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
