import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, type, value } = body;

    if (!email || !type || !value) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    let updatedData: any = {};

    
    if (type === "firstName") {
      updatedData = { name: `${value} ${value.split(" ")[1] || ""}` };
    }
   
    else if (type === "lastName") {
      const firstName = (await prisma.restaurantCustomer.findUnique({ where: { email } }))?.name?.split(" ")[0] || "";
      updatedData = { name: `${firstName} ${value}` };
    }
   
    else if (type === "city") {
      updatedData = { city: value };
    }
 
    else if (type === "phone") {
      updatedData = { phone: value };
    }
   
    else if (type === "address") {
      updatedData = { address: value };
    }

    // Perform the update on the customer record
    const updatedCustomer = await prisma.restaurantCustomer.update({
      where: { email },
      data: updatedData,
    });

    return NextResponse.json({ message: "Customer updated successfully", customer: updatedCustomer });
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
