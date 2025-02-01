import { NextResponse } from "next/server";
import prisma from "@/lib/connect";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status } = body;

    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedReservation);
  } catch (error) {
    console.error("Error updating reservation:", error);
    return NextResponse.json({ error: "Error updating reservation" }, { status: 500 });
  }
}

