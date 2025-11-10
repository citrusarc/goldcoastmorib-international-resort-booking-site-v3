import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, accommodation, price, paymentMethod } =
      body; // //

    if (!firstName || !lastName || !email || !price) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, or price." },
        { status: 400 }
      );
    }

    const clientName = `${firstName} ${lastName}`;
    const products = [
      {
        name: accommodation?.name || "Accommodation Booking",
        price: price * 100,
      },
    ];

    const payload = {
      client: { email, full_name: clientName },
      purchase: {
        products,
        success_redirect: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        failure_redirect: `${process.env.NEXT_PUBLIC_BASE_URL}/failure`,
      },
      brand_id: "320857ae-da86-44fb-b20d-d461b0e6a8cf",
      ...(paymentMethod
        ? { payment_method_whitelist: [paymentMethod] } // //
        : {}), // //
    };

    const response = await fetch(
      "https://gate.chip-in.asia/api/v1/purchases/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CHIP_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Chip API error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to create Chip purchase." },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      checkout_url: data.checkout_url,
      purchase_id: data.id,
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Something went wrong while processing the request." },
      { status: 500 }
    );
  }
}
