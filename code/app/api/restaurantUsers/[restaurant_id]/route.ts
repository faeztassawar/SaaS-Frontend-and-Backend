import prisma from "@/lib/connect"
import { NextResponse } from "next/server"


export const GET = async (req: Request, { params }: { params: { restaurant_id: string } }) => {
    try {
        console.log("Fetching Users********************")
        const { restaurant_id } = params;
        console.log("Restaurant ID HERRRREEEEE!: ", restaurant_id)

        const Customers = await prisma.restaurantCustomer.findMany({
            where: {
                restaurant_id: restaurant_id
            }
        })

        console.log("USERSSSSS OBJECT: ", Customers)
        return NextResponse.json(Customers)
    } catch (err) {
        console.error("Error fetching restaurant:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};