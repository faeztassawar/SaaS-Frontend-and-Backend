import prisma from "@/lib/connect";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

type RouteParams = {
  params: {
    email: string;
  };
};

export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
    try {
      console.log("RESTAURANT SESSION API HIT");
      
      // Await the params resolution
      const resolvedParams = await Promise.resolve(params);
      const email = resolvedParams.email;
  
      console.log("EMAIL: ", email);
  
      if (!email) {
        return NextResponse.json({ message: "Email is required" }, { status: 400 });
      }
  
      // Find the restaurant customer in the database
      const check = await prisma.restaurantCustomer.findFirst({
        where: {
          email,
        },
      });
  
      if (check && check.email == null) {
        check.email = email;
      }
  
      console.log("CHECK OBJECT: ", check);
      return NextResponse.json(check);
    } catch (err) {
      console.error("Error fetching restaurant:", err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
  }