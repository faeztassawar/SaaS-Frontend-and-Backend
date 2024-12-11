import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/connect"
import { NextResponse } from "next/server"
import { cookies } from 'next/headers'


export const GET = async (req: Request, { params }: { params: { email: string } }) => {
    try {
        console.log("RESTAURANT SESSION API HIT")
        const { email } = params;
        console.log("EMAIL: ", email)
        const cookiesData = await cookies();
        const restaurantId = cookiesData.get("id")?.value
        cookiesData.delete("id")
        const check = await prisma.restaurantCustomer.findFirst({
            where: {
                email,
                restaurant_id: restaurantId
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