import { NextResponse } from "next/server";

export async function GET() {
  try {
    const brandId = process.env.CHIP_BRAND_ID;
    const currency = "MYR";

    const res = await fetch(
      `https://gate.chip-in.asia/api/v1/payment_methods/?brand_id=${brandId}&currency=${currency}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.CHIP_TEST_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Chip API error:", data);
      return NextResponse.json(
        { error: "Failed to fetch payment methods", details: data },
        { status: res.status }
      );
    }

    const availableMethods = (data.available_payment_methods || []).map(
      (method: string) => ({ code: method, name: method.toUpperCase() })
    );

    console.log(availableMethods);
    return NextResponse.json({
      success: true,
      payment_methods: availableMethods,
    });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Something went wrong while fetching payment methods" },
      { status: 500 }
    );
  }
}
