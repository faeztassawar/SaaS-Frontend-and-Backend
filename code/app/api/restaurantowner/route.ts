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


//for deleteeeeeeeeeeee request from component clienttt 
export const DELETE = async (req: Request) => {
  try 
  {
    console.log("req came  deleting client")
    const body = await req.json(); 
    const { email } = body; // Extract email from the body???ok
    console.log("deleting client")
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

   
    await prisma.restaurantOwner.delete(
    {
      where: { email } ,
    });

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } 
  catch (error) 
  {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
