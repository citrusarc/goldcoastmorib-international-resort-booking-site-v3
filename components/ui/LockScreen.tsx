"use client";

import { useEffect } from "react";

export default function LockScreen() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener("keydown", handleKeyDown, true);

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center select-none touch-none">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />
      <div className="relative z-10 flex flex-col gap-4 p-6 w-full sm:w-96 text-center rounded-2xl text-neutral-600 bg-white">
        <h2 className="text-xl sm:text-2xl font-semibold text-amber-500">
          Locked
        </h2>
        <p>This screen is locked. You cannot interact with the page.</p>
      </div>
    </div>
  );
}
