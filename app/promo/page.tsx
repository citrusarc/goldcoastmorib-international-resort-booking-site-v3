"use client";

import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { supabase } from "@/utils/supabase/client";
import { cormorantGaramond } from "@/config/fonts";

const formSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.length === 1, "Please select one image.")
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/webp"].includes(file?.[0]?.type),
      "Only .jpg, .png, .webp allowed"
    ),
});

export default function PromoPage() {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setUploading(true);

      const file = values.image[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `promo-${Date.now()}.${fileExt}`;
      const filePath = `promo/${fileName}`;

      const { error } = await supabase.storage
        .from("promo-images") // // Bucket name
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) throw error;

      const { data } = supabase.storage
        .from("promo-images")
        .getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      setUploadedUrl(publicUrl);
      localStorage.setItem("promoImageUrl", publicUrl); // // Save for PromoModal
      alert("Promo image uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }

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

        {/* START HERE */}
        <div className="p-6 rounded-lg bg-white shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Upload Promo Image</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promo Image (JPG, PNG, WEBP)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Image"}
              </Button>
            </form>
          </Form>
          {uploadedUrl && (
            <div className="mt-4">
              <p className="text-sm text-neutral-500">Preview:</p>
              <div className="relative w-64 h-64 mt-2 rounded-lg overflow-hidden">
                <Image
                  src={uploadedUrl}
                  alt="Uploaded Promo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
