import prisma from "@/lib/connect"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { bookingId } = body;

    // Find the order first
    const order = await prisma.order.findUnique({
      where: { id: bookingId },
    });

    if (!order) {
      return NextResponse.json({ message: "order not found" }, { status: 404 });
    }

    // Check if the order status is eligible for cancellation
    const eligibleStatuses = ["ACCEPTED", "IN PROGRESS", "PENDING" , "CANCELLED"];
    if (!eligibleStatuses.includes(order.status)) {
      return NextResponse.json({ message: "order cannot be cancelled" }, { status: 400 });
    }

    // Update the reservation status to "cancelled"
    const updatedorder = await prisma.order.update({
      where: { id: bookingId },
      data: { status: "CANCELLED" },
    });

    // Respond with a success message
    return NextResponse.json({ message: 'Order cancelled successfully', order: updatedorder }, { status: 200 });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};

