"use client"; // // add client directive

import { useEffect, useState } from "react"; // // import hooks
import Image from "next/image";

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false); // // local state for modal

  useEffect(() => {
    // // show modal once on load (no localStorage persistence)
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false); // // close on click
  };

  if (!isOpen) return null; // // hide when closed

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 cursor-pointer"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative w-64 aspect-square shrink-0">
        <Image
          fill
          src="/Images/dummy-image.png"
          alt="Promo Banner"
          className="object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
