import prisma from "@/lib/connect"
import { NextResponse } from "next/server"


export const GET = async (req: Request, { params }: { params: { restaurant_id: string } }) => {
    try {
        const { restaurant_id } = params;

        if (!restaurant_id) {
            return NextResponse.json({ message: "Restaurant ID is required" }, { status: 400 });
        }

        // Optional: Validate if restaurant_id is a valid ObjectId
        if (restaurant_id.length !== 24) {
            return NextResponse.json({ message: "Invalid restaurant ID format" }, { status: 400 });
        }

        const order = await prisma.order.findMany({
            where: { restaurant_id },
        });

        if (!order) {
            return NextResponse.json({ message: "order not found!" }, { status: 404 });
        }

        return NextResponse.json(order);
    } catch (err) {
        console.error("Error fetching order:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};