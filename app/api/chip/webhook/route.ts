import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import { supabase } from "@/utils/supabase/client";
import { transporter } from "@/utils/email";
import { bookingEmailTemplate } from "@/utils/email/bookingEmailTemplate";
import { formatDate } from "@/utils/formatDate";

export async function POST(req: NextRequest) {
  try {
    const payloadString = await req.text();
    const signature = req.headers.get("x-chip-signature");

    if (!signature) {
      console.error("Missing CHIP signature");
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify signature using CHIP public key
    const publicKey = process.env.CHIP_PUBLIC_KEY!;
    const verifier = crypto.createVerify("SHA256");
    verifier.update(payloadString);
    verifier.end();
    const isValid = verifier.verify(publicKey, signature, "base64");

    if (!isValid) {
      console.error("Invalid CHIP webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    const payload = JSON.parse(payloadString);

    console.log("CHIP Webhook Received:", payload);
    const { id: chipPurchaseId, reference, status } = payload;

    if (!reference) {
      console.error("Missing CHIP reference");
      return NextResponse.json(
        { error: "Missing booking reference" },
        { status: 400 }
      );
    }

    // 1. Find order by bookingNumber
    const { data: booking, error } = await supabase
      .from("bookings")
      .select("*, rooms(*)")
      .eq("bookingNumber", reference)
      .single();

    if (error || !booking) {
      console.error("Booking not found for reference:", reference);
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // 2. Handle payment statuses
    if (status === "paid") {
      console.log("Payment successful, updating order...");
      await supabase
        .from("bookings")
        .update({
          paymentMethod:
            payload.transaction_data?.payment_method ||
            payload.transaction_data?.attempts?.[0]?.payment_method ||
            null,
          paymentStatus: "paid",
          bookingStatus: "confirmed",
          chipPurchaseId,
        })
        .eq("id", booking.id);

      // Send confirmation email
      try {
        await transporter.sendMail({
          from: `"Gold Coast Morib International Resort" <${process.env.EMAIL_USER}>`,
          to: booking.email,
          bcc: process.env.ADMIN_EMAIL,
          subject: "Booking Confirmation",
          html: bookingEmailTemplate({
            bookingNumber: booking.bookingNumber,
            firstName: booking.firstName,
            roomsName: booking.rooms?.name || "Room",
            checkInDate: formatDate(new Date(booking.checkInDate)),
            checkOutDate: formatDate(new Date(booking.checkOutDate)),
            adults: booking.adults,
            children: booking.children,
            earlyCheckIn: booking.earlyCheckIn,
            remarks: booking.remarks,
            currency: booking.currency,
            totalPrice: booking.totalPrice,
            createdAt: formatDate(new Date(booking.createdAt)),
          }),
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    }

    // FAILED / CANCELLED
    else if (status === "failed" || status === "cancelled") {
      await supabase
        .from("bookings")
        .update({
          bookingStatus: "cancelled_due_to_payment",
          paymentStatus: "failed",
        })
        .eq("id", booking.id);
    }

    // STILL PENDING (FPX not finished)
    else if (status === "pending") {
      console.log("Payment still pending...");

      await supabase
        .from("bookings")
        .update({
          bookingStatus: "pending",
          paymentStatus: "awaiting_payment",
        })
        .eq("id", booking.id);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
