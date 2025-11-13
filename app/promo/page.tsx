"use client";

import Image from "next/image";
import { useState } from "react";
import { supabase } from "@/utils/supabase/client";

import { cormorantGaramond } from "@/config/fonts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PromoPage() {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image first");

    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `promo-image-${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("promo-images")
        .upload(fileName, file, { upsert: true });

      if (error) throw error;

      alert("Promo image uploaded successfully!");
    } catch (err: any) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  return (
    <section className="flex p-4 sm:p-8 items-center justify-center text-neutral-600">
      <div className="flex flex-col gap-8 sm:gap-16 w-full max-w-6xl">
        <div className="relative w-screen h-96 sm:h-[560px] -mt-36 sm:-mt-48 rounded-b-[32px] sm:rounded-b-[64px] left-1/2 -translate-x-1/2 overflow-hidden">
          <Image
            fill
            src="/Images/activities-and-events-hero-banner.jpg"
            alt="Gold Coast Morib International Resort Booking Hero Banner"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute inset-0 flex flex-col gap-4 pb-24 items-center justify-end text-white">
            <h1 className="text-lg sm:text-xl">Happenings You’ll Love</h1>
            <p
              className={`block leading-none text-[40px] sm:text-[72px] text-center ${cormorantGaramond.className}`}
            >
              Celebrate, Connect <br />
              Enjoy Every Occasion
            </p>
          </div>
        </div>

        {/* Upload */}
        <div className="flex flex-col items-center gap-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full sm:w-80"
          />
          <Button onClick={handleUpload} disabled={!file || uploading}>
            {uploading ? "Uploading..." : "Upload Image"}
          </Button>
        </div>
      </div>
    </section>
  );
}
