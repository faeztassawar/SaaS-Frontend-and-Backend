import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/connect"
import { NextResponse } from "next/server"


export const GET = async (req: Request, { params }: { params: { email: string } }) => {
    try {
        const { email } = params;

        if (!email) {
            return NextResponse.json({ message: "Restaurant ID is required" }, { status: 400 });
        }


        const check = await prisma.restaurantOwner.findFirst({
            where: {
                email: email
            }
        })
        return NextResponse.json(check);
    } catch (err) {
        console.error("Error fetching restaurant:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};