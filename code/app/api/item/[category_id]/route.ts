import prisma from "@/lib/connect"
import { NextResponse } from "next/server"


export const GET = async (req: Request, { params }: { params: { category_id: string } }) => {
    try {
        const { category_id } = params;

        if (!category_id) {
            return NextResponse.json({ message: "Restaurant ID is required" }, { status: 400 });
        }

        // Optional: Validate if category_id is a valid ObjectId
        if (category_id.length !== 24) {
            return NextResponse.json({ message: "Invalid restaurant ID format" }, { status: 400 });
        }

        const items = await prisma.item.findMany({
            where: {
                categoryId: category_id
            },
        });

        if (!items) {
            return NextResponse.json({ message: "items not found!" }, { status: 404 });
        }

        return NextResponse.json(items);
    } catch (err) {
        console.error("Error fetching items:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};