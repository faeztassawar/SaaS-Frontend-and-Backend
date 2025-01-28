import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { menu_id: string } }) => {
  try {
    const { menu_id } = params;

    if (!menu_id) {
      return NextResponse.json({ message: "Menu ID is required" }, { status: 400 });
    }

    // Optional: Validate if menu_id is a valid ObjectId
    if (menu_id.length !== 24) {
      return NextResponse.json({ message: "Invalid menu ID format" }, { status: 400 });
    }

    const categories = await prisma.category.findMany({
      where: {
        menuId: menu_id,
      },
    });

    if (!categories || categories.length === 0) {
      return NextResponse.json({ message: "Categories not found!" }, { status: 404 });
    }

    return NextResponse.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
};