import prisma from "@/lib/connect"
import { cookies } from "next/headers";
import { NextResponse } from "next/server"


export const DELETE = async (req: Request) => {
    try {
        const body = await req.json()

        const customer = await prisma.restaurantCustomer.delete({
            where: {
                restaurant_id: body.restaurant_id,
                id: body.id
            }
        })

        console.log("User Deleted ", customer)
        return NextResponse.json(customer)
    } catch (err) {
        console.error("Error fetching restaurant:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};
export const POST = async (req: Request) => {
    const cookiesData = await cookies()
    const adminValue = cookiesData.get("admin")?.value
    console.log("ADMIN VALUE: ", adminValue)
    try {
        const body = await req.json()

        const customer = await prisma.restaurantCustomer.update({
            where: {
                restaurant_id: body.restaurant_id,
                id: body.id
            }, data: {
                isAdmin: adminValue == "true" ? true : false
            }
        })
        cookiesData.delete("admin")
        console.log("User Updated ", customer)
        return NextResponse.json(customer)
    } catch (err) {
        console.error("Error fetching restaurant:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};