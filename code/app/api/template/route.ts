import { NextResponse } from "next/server";
import prisma from "@/lib/connect"; // Adjust path to your Prisma connection

export const GET = async () => {
  try {
    const templates = await prisma.template.findMany();

    return NextResponse.json(templates, { status: 200 });
  } 
  catch (error) 
  {
    console.error("Error fetching templates:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
