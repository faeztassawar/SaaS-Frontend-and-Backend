import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { email: string } }) => {
  try {
    const { email } = params;

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const userProfile = await prisma.user.findUnique({
      where: { email },
    });

    if (!userProfile) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userProfile);
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
