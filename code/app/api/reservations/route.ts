import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/connect";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received reservation data:", body); // Add this line for debugging

    const { restaurant_id, email, name, guestsCount, date, time } = body;

    if (!restaurant_id) {
      console.error("restaurant_id is missing from the request body");
      return NextResponse.json({ error: "restaurant_id is required" }, { status: 400 });
    }

    const reservation = await prisma.reservation.create({
      data: {
        restaurant_id,
        email,
        name,
        guestsCount,
        date,
        time,
        status: "PENDING",
      },
    });

    console.log("Created reservation:", reservation); // Add this line for debugging

    return NextResponse.json(reservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json({ error: "Error creating reservation" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const restaurant_id = searchParams.get("restaurant_id");
  const email = searchParams.get("email");

  if (!restaurant_id && !email) {
    return NextResponse.json({ error: "restaurant_id or email is required" }, { status: 400 });
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: restaurant_id ? { restaurant_id } : { email },
      orderBy: { date: "desc" }, // Changed from createdAt to date
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json({ error: "Error fetching reservations" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "id and status are required" }, { status: 400 });
    }

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