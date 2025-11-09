// app/api/payments/chip/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Example payload from frontend
    // {
    //   email: "test@test.com",
    //   productName: "Deluxe Room",
    //   price: 1000, // in cents (MYR 10.00)
    //   brandId: "409eb80e-3782-4b1d-afa8-b779759266a5"
    // } tetst

    const res = await fetch("https://gate.chip-in.asia/api/v1/purchases/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CHIP_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client: {
          email: body.email,
        },
        purchase: {
          products: [
            {
              name: body.productName,
              price: body.price, // in cents
            },
          ],
        },
        brand_id: body.brandId,
        success_redirect: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
        failure_redirect: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed`,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/chip/callback`,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to create CHIP purchase");
    }

    // return the checkout URL to frontend
    return NextResponse.json({ checkoutUrl: data.data.checkout_url });
  } catch (error) {
    console.error("CHIP Purchase error:", error);
    return NextResponse.json(
      { error: "Failed to create purchase" },
      { status: 500 }
    );
  }
}
