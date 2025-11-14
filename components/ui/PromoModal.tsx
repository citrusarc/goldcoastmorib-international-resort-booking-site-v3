"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Xmark } from "iconoir-react";

import { supabase } from "@/utils/supabase/client";

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [promoImage, setPromoImage] = useState("/Images/promo-image.jpg");
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    const { data } = supabase.storage
      .from("promo-images")
      .getPublicUrl("promo/promo-image.jpg");

    const publicUrl = `${data.publicUrl}?v=${Date.now()}`;
    setPromoImage(publicUrl);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex items-center justify-center"
        style={{
          maxWidth: "50vw",
          maxHeight: "50vh",
          width: `min(50vw, ${50 * ratio}vh)`,
          height: `min(50vh, ${50 / ratio}vw)`,
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-10 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition"
        >
          <Xmark className="w-8 h-8" />
        </button>

        <div className="relative w-full h-full">
          <Image
            src={promoImage}
            alt="Promo Banner"
            fill
            onLoadingComplete={(img) => {
              setRatio(img.naturalWidth / img.naturalHeight);
            }}
            className="object-contain rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
