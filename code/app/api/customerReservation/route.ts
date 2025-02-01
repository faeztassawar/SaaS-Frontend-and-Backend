import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email } = body;

    const customer = await prisma.restaurantCustomer.findUnique({
      where: { email },
      include: {
        Reservations: {
          where: {
            NOT: { status: "Cancelled" }, // Exclude canceled reservations
          },
        },
      },
    });

    if (!customer) {
      return NextResponse.json({ message: "Customer not found" }, { status: 404 });
    }

    const response = {
      firstName: customer.name?.split(" ")[0] || "",
      lastName: customer.name?.split(" ")[1] || "",
      bookings: customer.Reservations.map((res) => ({
        id: res.id,
        date: res.date,
        time: res.time,
        status: res.status,
      })),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
