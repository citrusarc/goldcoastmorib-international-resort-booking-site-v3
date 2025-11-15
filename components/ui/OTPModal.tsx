"use client";

import { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OTPModalProps {
  correctPassword: string;
  onUnlock: () => void;
}

export default function OTPModal({ correctPassword, onUnlock }: OTPModalProps) {
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isUnlock, setIsUnlock] = useState(false);

  useEffect(() => {
    const unlockedSession = sessionStorage.getItem("promo-unlocked");
    if (!unlockedSession) setIsUnlock(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isUnlock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isUnlock]);

  const handleUnlock = () => {
    if (otpInput === correctPassword) {
      sessionStorage.setItem("promo-unlocked", "true");
      setIsUnlock(false);
      setOtpError("");
      onUnlock();
    } else {
      setOtpError("Incorrect password");
    }
  };

  if (!isUnlock) return null;

  return (
    <div className="fixed inset-0 z-50 flex p-4 items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative flex flex-col gap-4 p-4 w-full sm:w-96 rounded-2xl bg-white">
        <h2 className="text-xl sm:text-2xl font-semibold text-amber-500">
          Enter Password
        </h2>
        <InputOTP
          maxLength={6}
          type="password"
          placeholder="Enter password"
          value={otpInput}
          onChange={(value: string) => setOtpInput(value)}
          inputMode="text"
          pattern=".*"
          className="w-full"
        >
          <InputOTPGroup className="flex justify-between w-full">
            <InputOTPSlot index={0} className="flex-1 h-12 text-center" />
            <InputOTPSlot index={1} className="flex-1 h-12 text-center" />
            <InputOTPSlot index={2} className="flex-1 h-12 text-center" />
          </InputOTPGroup>
          <InputOTPSeparator className="my-2" />
          <InputOTPGroup className="flex justify-between w-full">
            <InputOTPSlot index={3} className="flex-1 h-12 text-center" />
            <InputOTPSlot index={4} className="flex-1 h-12 text-center" />
            <InputOTPSlot index={5} className="flex-1 h-12 text-center" />
          </InputOTPGroup>
        </InputOTP>
        {otpError && <p className="text-red-500">{otpError}</p>}
        <button
          onClick={handleUnlock}
          className="flex p-3 w-full items-center justify-center rounded-full border text-white hover:text-amber-600 border-transparent hover:border-amber-600 bg-amber-500 hover:bg-white"
        >
          Unlock
        </button>
      </div>
    </div>
  );
}
