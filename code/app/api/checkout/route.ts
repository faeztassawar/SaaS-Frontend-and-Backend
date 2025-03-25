import { NextResponse } from "next/server";
import { createCheckoutLink, createCustomerIfNull } from "@/lib/billing";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const customerId = await createCustomerIfNull();
    if (!customerId) {
      return NextResponse.json({ error: "Customer not found" }, { status: 400 });
    }

    const checkoutUrl = await createCheckoutLink(customerId);
    if (!checkoutUrl) {
      return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
