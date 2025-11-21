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
import { Modal } from "@/components/ui/Modal";
import OTPModal from "@/components/ui/OTPModal";

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
  const [ratio, setRatio] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setUploading(true);

      const file = values.image[0];

      const filePath = "promo/promo-image.jpg";

      const { error } = await supabase.storage
        .from("promo-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) throw error;

      // Get public URL and append a cache-busting query param
      const { data } = supabase.storage
        .from("promo-images")
        .getPublicUrl(filePath);
      const publicUrl = `${data.publicUrl}?v=${Date.now()}`;

      setImagePreview(publicUrl);
      setSuccessMessage("Promo image uploaded successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <section className="relative flex p-4 sm:p-8 items-center justify-center text-neutral-600">
      {!isUnlocked && (
        <OTPModal
          correctPassword="gcr025"
          onUnlock={() => setIsUnlocked(true)}
        />
      )}
      <div className="flex flex-col gap-8 sm:gap-16 w-full max-w-2xl">
        <div className="relative w-screen h-96 sm:h-[560px] -mt-36 sm:-mt-48 rounded-b-[32px] sm:rounded-b-[64px] left-1/2 -translate-x-1/2 overflow-hidden">
          <Image
            fill
            src="/Images/promo-image.jpg"
            alt="Gold Coast Morib International Resort Booking Hero Banner"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute inset-0 flex flex-col gap-4 pb-24 items-center justify-end text-white">
            <h1 className="text-lg sm:text-xl">
              {" "}
              Gold Coast Morib International Resort
            </h1>
            <p
              className={`block leading-none text-[40px] sm:text-[72px] text-center ${cormorantGaramond.className}`}
            >
              Book Your Stay <br />
              Experience Luxury
            </p>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-8 p-4 sm:p-8 rounded-2xl sm:rounded-4xl backdrop-blur-sm shadow-xl border border-white/30 bg-white/10">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Upload Promo Image
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => {
                  const file = field.value?.[0];
                  return (
                    <FormItem className="flex-1">
                      <FormLabel className="text-neutral-400">
                        Promo Image (.jpg, .png, .webp)
                      </FormLabel>

                      <FormControl>
                        {!file ? (
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const fileList = e.target.files;
                              field.onChange(fileList);

                              if (fileList && fileList[0]) {
                                const file = fileList[0];

                                const url = URL.createObjectURL(file);
                                setImagePreview(url);

                                const img = new window.Image();
                                img.src = url;
                                img.onload = () => {
                                  setRatio(
                                    img.naturalWidth / img.naturalHeight
                                  );
                                };
                              } else {
                                setImagePreview(null);
                                setRatio(1);
                              }
                            }}
                            className="flex h-10 w-full -px-4 cursor-pointer shadow-none border-transparent text-neutral-400"
                          />
                        ) : (
                          <div className="flex h-10 items-center gap-2">
                            <span className="truncate max-w-[200px] text-neutral-400">
                              {file.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                field.onChange(null);
                                setImagePreview(null);
                                setRatio(1);
                              }}
                              className="cursor-pointer text-sm text-red-500 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </FormControl>
                      {imagePreview && (
                        <div
                          style={{
                            paddingBottom: `${100 / ratio}%`,
                          }}
                          className="relative w-full rounded-xl overflow-hidden bg-black/10"
                        >
                          <Image
                            fill
                            src={imagePreview}
                            alt="Image Preview"
                            className="object-contain"
                          />
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button
                type="submit"
                disabled={uploading}
                className="p-6 w-full rounded-full cursor-pointer text-white bg-amber-500 hover:bg-amber-600"
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <Modal
        title="Success!"
        message={successMessage ?? ""}
        CTA="Done"
        isOpen={!!successMessage}
        onClose={() => {
          setSuccessMessage(null);
          setImagePreview(null);
          form.reset();
        }}
      />
      <Modal
        title="Upload Failed"
        message={errorMessage ?? ""}
        CTA="Try Again"
        isOpen={!!errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </section>
  );
}
