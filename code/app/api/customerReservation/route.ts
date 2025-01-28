import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email } = body; // Extract email from the body

    console.log("EMAIL IN APIIIIIIIIIIIIIIIIIII:", email);

    const customer = await prisma.restaurantCustomer.findUnique({
      where: { email },
      include: {
        Reservations: true,
      },
    });

    if (!customer) {
      return NextResponse.json({ message: "Customer not found" }, { status: 404 });
    }

    const response = {
      firstName: customer.name?.split(" ")[0] || "", // Assuming name is in "First Last" format
      lastName: customer.name?.split(" ")[1] || "",  // If needed, split the name
      email: customer.email,
      bookings: customer.Reservations.map((reservation) => ({
        date: reservation.date.toISOString(),
        time: reservation.time,
      })),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching customer profile:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};
