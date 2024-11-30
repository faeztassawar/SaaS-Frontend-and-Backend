import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/connect"
import { NextResponse } from "next/server"


export const GET = async (req: Request, { params }: { params: { email: string } }) => {
    try {
        console.log("API HIT")
        const { email } = params;
        console.log("EMAIL: ", email)

        const check = await prisma.restaurantOwner.findFirst({
            where: {
                email
            }
        })
        if (check) {
            if (check.email == null)
                check.email = email
        }

        return NextResponse.json(check ?? null)
    } catch (err) {
        console.error("Error fetching restaurant:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};