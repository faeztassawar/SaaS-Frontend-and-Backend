// app -> api -> cancelReservation.js
import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { bookingId } = body;

    // Delete the reservation by ID
    const deletedReservation = await prisma.reservation.delete({
      where: { id: bookingId },
    });

    // Respond with a success message
    return NextResponse.json({ message: 'Booking cancelled and deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};
