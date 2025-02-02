import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/connect";

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    console.log("Raw request body:", bodyText);

    const body = JSON.parse(bodyText || "{}");
    console.log("Parsed reservation data:", body);

    // Destructure fields
    const { restaurant_id, email, name, guestsCount, date, time } = body;

    // Validate all required fields
    if (!restaurant_id || !email || !name || !guestsCount || !date || !time) {
      console.error("Missing required fields:", { restaurant_id, email, name, guestsCount, date, time });
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // First, find the RestaurantCustomer
    const customer = await prisma.restaurantCustomer.findFirst({
      where: { email }
    });

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    // Debug Prisma data before insertion
    const reservationData = {
      restaurant_id,
      email,
      name,
      guestsCount: Number(guestsCount),
      date: new Date(date),
      time,
      status: "PENDING",
      customerId: customer.id,
    };
    console.log("Creating reservation with data:", reservationData);

    // Insert into database
    const reservation = await prisma.reservation.create({
      data: reservationData,
    });

    console.log("Created reservation:", reservation);
    return NextResponse.json(reservation);
  } catch (error) {
    console.error("Error creating reservation:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Error creating reservation" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const restaurant_id = searchParams.get("restaurant_id");
    const email = searchParams.get("email");

    if (!restaurant_id && !email) {
      return NextResponse.json({ error: "restaurant_id or email is required" }, { status: 400 });
    }

    const where = restaurant_id
      ? { restaurant_id }
      : email
        ? { email }
        : undefined;

    const reservations = await prisma.reservation.findMany({
      where,
      orderBy: { date: "desc" },
    });

    console.log("Fetched reservations:", reservations);
    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json({ error: "Error fetching reservations" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ error: "id and status are required" }, { status: 400 })
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data: { status },
    })

    console.log("Updated reservation:", updatedReservation)
    return NextResponse.json(updatedReservation)
  } catch (error) {
    console.error("Error updating reservation:", error)
    return NextResponse.json({ error: "Error updating reservation" }, { status: 500 })
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const restaurant_id = searchParams.get("restaurant_id");
    const email = searchParams.get("email");

    if (!restaurant_id && !email) {
      return NextResponse.json({ error: "restaurant_id or email is required" }, { status: 400 });
    }


    const today = new Date();
    today.setHours(0, 0, 0, 0); // 2025-02-01T00:00:00.000Z
    const reservations = await prisma.reservation.deleteMany({
      where: {
        date: { lt: today }
      }
    });

    console.log("Fetched reservations:", reservations);
    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json({ error: "Error fetching reservations" }, { status: 500 });
  }
}