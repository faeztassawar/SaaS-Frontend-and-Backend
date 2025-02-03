import prisma from "@/lib/connect"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { bookingId } = body;

    // Find the reservation first
    const reservation = await prisma.reservation.findUnique({
      where: { id: bookingId },
    });

    if (!reservation) {
      return NextResponse.json({ message: "Reservation not found" }, { status: 404 });
    }

    // Check if the reservation status is eligible for cancellation
    const eligibleStatuses = ["ACCEPTED", "DECLINED", "PENDING" , "CANCELLED"];
    if (!eligibleStatuses.includes(reservation.status)) {
      return NextResponse.json({ message: "Reservation cannot be cancelled" }, { status: 400 });
    }

    // Update the reservation status to "cancelled"
    const updatedReservation = await prisma.reservation.update({
      where: { id: bookingId },
      data: { status: "CANCELLED" },
    });

    // Respond with a success message
    return NextResponse.json({ message: 'Booking cancelled successfully', reservation: updatedReservation }, { status: 200 });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};