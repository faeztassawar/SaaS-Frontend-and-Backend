import prisma from "@/lib/connect"
import { NextResponse } from "next/server"


export const GET = async (req: Request, { params }: { params: { email: string } }) => {
    try {
        console.log("SAAS SESSION API HIT")
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
        console.log("CHECK OBJECT: ", check)
        return NextResponse.json(check)
    } catch (err) {
        console.error("Error fetching restaurant:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};