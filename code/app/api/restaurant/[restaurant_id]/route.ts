import prisma from "@/lib/connect";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Ensure MongoDB ObjectId validation

type RouteParams = {
  params: {
    restaurant_id: string;
  };
};

// ✅ GET Restaurant Details
export async function GET(req: NextRequest, context: RouteParams) {
    try {
      // ✅ Ensure params are resolved correctly
      const params = await context.params;
      const restaurant_id = params?.restaurant_id;
  
      console.log("Received Restaurant ID:", restaurant_id);
  
      if (!restaurant_id) {
        return NextResponse.json({ message: "Restaurant ID is required" }, { status: 400 });
      }
  
      // ✅ Validate if restaurant_id is a valid MongoDB ObjectId
      if (!ObjectId.isValid(restaurant_id)) {
        return NextResponse.json({ message: "Invalid restaurant ID format" }, { status: 400 });
      }
  
      const restaurant = await prisma.restaurant.findUnique({
        where: { restaurant_id },
      });
  
      if (!restaurant) {
        return NextResponse.json({ message: "Restaurant not found!" }, { status: 404 });
      }
  
      return NextResponse.json(restaurant);
    } catch (error) {
      console.error("Error fetching restaurant:", error);
      return NextResponse.json(
        { message: "An error occurred while fetching restaurant information" },
        { status: 500 }
      );
    }
  }
  
// ✅ UPDATE Restaurant Details
export async function POST(req: NextRequest, context: RouteParams) {
  try {
    const { restaurant_id } = context.params;
    const body = await req.json();

    console.log("Updating Restaurant ID:", restaurant_id);

    if (!restaurant_id) {
      return NextResponse.json({ message: "Restaurant ID is required" }, { status: 400 });
    }

    // ✅ Validate restaurant_id format
    if (!ObjectId.isValid(restaurant_id)) {
      return NextResponse.json({ message: "Invalid restaurant ID format" }, { status: 400 });
    }

    const updatedRestaurant = await prisma.restaurant.update({
      where: { restaurant_id },
      data: {
        name: body.name,
        about_us: body.about_us,
        desc: body.desc,
      },
    });

    if (!updatedRestaurant) {
      return NextResponse.json({ message: "Restaurant not found!" }, { status: 404 });
    }

    return NextResponse.json(updatedRestaurant);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    return NextResponse.json(
      { message: "An error occurred while updating restaurant information" },
      { status: 500 }
    );
  }
}
