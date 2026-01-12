import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/utils/db/client";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await context.params;

    const bookingResult = await sql`
      SELECT b.*, 
             json_build_object(
               'id', r.id,
               'name', r.name,
               'price', r.price
             ) as rooms
      FROM bookings b
      LEFT JOIN rooms r ON b."roomsId" = r.id
      WHERE b.id = ${id}
      LIMIT 1
    `;

    const booking = bookingResult[0];
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(booking, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown error occurred";
    console.error("Error fetching booking:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
