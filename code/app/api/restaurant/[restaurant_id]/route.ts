import prisma from "@/lib/connect"
import { type NextRequest,NextResponse } from "next/server"


export const GET = async (req: Request, { params }: { params: { restaurant_id: string } }) => {
    try {
        const { restaurant_id } = params;
        console.log("HEEREEEEE! : ", restaurant_id)

        if (!restaurant_id) {
            return NextResponse.json({ message: "Restaurant ID is required" }, { status: 400 });
        }

        // Optional: Validate if restaurant_id is a valid ObjectId
        if (restaurant_id.length !== 24) {
            return NextResponse.json({ message: "Invalid restaurant ID format" }, { status: 400 });
        }

        const restaurant = await prisma.restaurant.findUnique({
            where: { restaurant_id: restaurant_id },
        });

        console.log("NOW FETCHING: ", restaurant)

        if (!restaurant) {
            return NextResponse.json({ message: "Restaurant not found!" }, { status: 404 });
        }

        return NextResponse.json(restaurant);
    } catch (err) {
        console.error("Error fetching restaurant:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};


export const POST = async (req: Request, { params }: { params: { restaurant_id: string } }) => {
    try {
        const { restaurant_id } = params;
        console.log("HEEREEEEE! : ", restaurant_id)

        if (!restaurant_id) {
            return NextResponse.json({ message: "Restaurant ID is required" }, { status: 400 });
        }

        const body = await req.json()
        // Optional: Validate if restaurant_id is a valid ObjectId
        if (restaurant_id.length !== 24) {
            return NextResponse.json({ message: "Invalid restaurant ID format" }, { status: 400 });
        }

        const restaurant = await prisma.restaurant.update({
            where: { restaurant_id }, data: {
                name: body.name,
                about_us: body.about_us,
                desc: body.desc,
                cuisine: body.cuisine,
                address: body.address,
                phone: body.phone,
                opentiming: body.opentiming,
                closetiming: body.closetiming
            }
        });

        console.log("RESTAURANT UPDATED!", restaurant)

        if (!restaurant) {
            return NextResponse.json({ message: "Restaurant not found!" }, { status: 404 });
        }

        return NextResponse.json(restaurant);
    } catch (err) {
        console.error("Error fetching restaurant:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};

