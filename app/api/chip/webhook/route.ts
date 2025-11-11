import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";
import { transporter } from "@/utils/email";
import { bookingEmailTemplate } from "@/utils/email/bookingEmailTemplate";
import { formatDate } from "@/utils/formatDate";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { id: chipPurchaseId, reference, status } = payload;

    if (!reference) {
      return NextResponse.json(
        { error: "Missing booking reference" },
        { status: 400 }
      );
    }

    // Find booking in Supabase
    const { data: booking, error } = await supabase
      .from("bookings")
      .select("*, rooms(*)")
      .eq("bookingNumber", reference)
      .single();

    if (error || !booking) {
      console.error("Booking not found for reference:", reference);
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (status === "paid") {
      // Update booking status
      await supabase
        .from("bookings")
        .update({
          status: "confirmed",
          paymentStatus: "paid",
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
            createdAt: formatDate(new Date()),
          }),
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    } else if (status === "failed" || status === "cancelled") {
      await supabase
        .from("bookings")
        .update({
          status: "cancelled",
          paymentStatus: "failed",
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
