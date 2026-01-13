"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Xmark } from "iconoir-react";

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [promoImage, setPromoImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    const fetchPromoImage = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/get-promo-image");
        const data = await response.json();
        if (data.url) {
          setPromoImage(data.url);
        }
      } catch (error) {
        console.error("Failed to fetch promo image:", error);
      } finally {
        setIsLoading(false);
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

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const sizePercent = isMobile ? 80 : 40;
  const handleClose = () => setIsOpen(false);

  if (!isOpen || isLoading || !promoImage) return null;

  return (
    <div className="fixed inset-0 z-9999 flex p-4 items-center justify-center">
      <div className="absolute inset-0 z-0 bg-black/50 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 flex items-center justify-center"
        style={{
          maxWidth: `${sizePercent}vw`,
          maxHeight: `${sizePercent}vh`,
          width: `min(${sizePercent}vw, ${sizePercent * ratio}vh)`,
          height: `min(${sizePercent}vh, ${sizePercent / ratio}vw)`,
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-10 text-white bg-black/50 rounded-full cursor-pointer w-10 h-10 flex items-center justify-center hover:bg-black/70 transition"
        >
          <Xmark className="w-8 h-8" />
        </button>
        <div className="relative w-full h-full">
          <Image
            fill
            priority
            src={promoImage}
            alt="Promo Banner"
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
