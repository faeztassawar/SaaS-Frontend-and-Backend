import prisma from "@/lib/connect"; 
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    
    const restaurantOwners = await prisma.restaurantOwner.findMany();

    if (!restaurantOwners || restaurantOwners.length === 0) {
      return NextResponse.json({ message: "No restaurant owners found" }, { status: 404 });
    }
    
    return NextResponse.json(restaurantOwners, { status: 200 });
  } catch (error) {
    console.error("Error fetching restaurant owners:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
