import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        console.log("Fetching all items!");
        const items = await prisma.item.findMany();
        return NextResponse.json(items);
    } catch (err) {
        console.error("Error fetching items:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};