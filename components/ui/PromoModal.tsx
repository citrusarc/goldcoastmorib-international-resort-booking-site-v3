"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-9999 flex items-center justify-center p-4"
    >
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
          src="/Images/promo-image.jpg"
          alt="Promo Banner"
          className="object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
