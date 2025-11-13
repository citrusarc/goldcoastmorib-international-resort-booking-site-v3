"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/utils/supabase/client";

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [promoImage, setPromoImage] = useState("/Images/promo-image.jpg");

  useEffect(() => {
    const fetchPromoImage = async () => {
      // List files in the bucket and get the latest uploaded
      const { data: list } = await supabase.storage
        .from("promo-images")
        .list("", {
          sortBy: { column: "created_at", order: "desc" },
          limit: 1,
        });

      if (list?.[0]) {
        const { data: publicUrl } = supabase.storage
          .from("promo-images")
          .getPublicUrl(list[0].name);
        if (publicUrl?.publicUrl) setPromoImage(publicUrl.publicUrl);
      }
    };

    fetchPromoImage();

    const isViewed = sessionStorage.getItem("promoViewed");
    if (!isViewed) {
      setIsOpen(true);
      sessionStorage.setItem("promoViewed", "true");
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-64 sm:w-96 aspect-square shrink-0"
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-10 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 cursor-pointer transition"
        >
          ✕
        </button>
        <Image
          fill
          src={promoImage}
          alt="Promo Banner"
          className="object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
