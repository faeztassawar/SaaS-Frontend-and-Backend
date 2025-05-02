import prisma from "@/lib/connect"
import { NextResponse } from "next/server"


export const PUT = async (req: Request) => {
    try {
        const body = await req.json();
        console.log("📥 Received request body:", body);

        // Validate request body
        if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
            console.error("❌ Invalid request: items must be a non-empty array.");
            return NextResponse.json({ message: "Invalid request: items should be a non-empty array." }, { status: 400 });
        }

        // Convert item IDs to proper MongoDB ObjectId format if needed
        const itemIds = body.items.map(id => id.toString());

        console.log("🔍 Fetching items with IDs:", itemIds);

        // Fetch items from the database
        const uniqueItems = await prisma.item.findMany({
            where: {
                id: { in: itemIds }, // Ensure IDs exist in DB
            },
        });

        if (uniqueItems.length === 0) {
            console.error("❌ No matching items found in DB for IDs:", itemIds);
            return NextResponse.json({ message: "No items found for the given IDs." }, { status: 404 });
        }

        console.log("✅ Found items in DB:", uniqueItems);

        // Count occurrences of each item for quantity tracking
        const itemCounts: Record<string, number> = itemIds.reduce((acc: Record<string, number>, id: string) => {
            acc[id] = (acc[id] || 0) + 1;
            return acc;
        }, {});

        console.log("📊 Item counts:", itemCounts);

        // Attach quantity to items
        const cartItems = uniqueItems.map(item => ({
            ...item,
            quantity: itemCounts[item.id] || 1, // Default to 1 if not found
        }));

        console.log("🛒 Final Cart Items:", cartItems);
        return NextResponse.json(cartItems);
    } catch (err) {
        console.error("❌ Error fetching items:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}; // ✅ This closing brace was missing
