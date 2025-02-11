import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/connect";

export async function POST(req: Request) {
    try {
        const bodyText = await req.text();
        console.log("Raw request body:", bodyText);

        const body = JSON.parse(bodyText || "{}");
        console.log("Parsed order data:", body);

        // Destructure fields
        const { restaurant_id, email, name, city, address, phno } = body;

        // Validate all required fields
        if (!restaurant_id || !email || !name || !city || !phno || !address) {
            console.error("Missing required fields:", { restaurant_id, email, name, address, phno, city });
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // First, find the RestaurantCustomer
        const customer = await prisma.restaurantCustomer.findFirst({
            where: { email }
        });

        if (!customer) {
            return NextResponse.json({ error: "Customer not found" }, { status: 404 });
        }

        // Debug Prisma data before insertion
        const orderData = {
            restaurant: { connect: { restaurant_id } }, // Proper relation mapping
            restaurantCustomer: { connect: { id: customer.id } }, // Correct relation mapping
            name,
            phno,
            city,
            email,
            address,
            status: "PENDING",
            item: {},
        };

        const order = await prisma.order.create({
            data: orderData,
        });


        console.log("Created order:", order);
        return NextResponse.json(order);
    } catch (error) {
        console.error("Error creating order:", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ error: "Error creating order" }, { status: 500 });
    }
}




export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const restaurant_id = searchParams.get("restaurant_id");
        const email = searchParams.get("email");

        if (!restaurant_id && !email) {
            return NextResponse.json({ error: "restaurant_id or email is required" }, { status: 400 });
        }

        const where = restaurant_id
            ? { restaurant_id }
            : email
                ? { email }
                : undefined;

        const order = await prisma.order.findMany({
            where,
            orderBy: { status: "desc" },
        });

        console.log("Fetched order:", order);
        return NextResponse.json(order);
    } catch (error) {
        console.error("Error fetching reservations:", error);
        return NextResponse.json({ error: "Error fetching reservations" }, { status: 500 });
    }
}


export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json()
        const { id, status } = body

        if (!id || !status) {
            return NextResponse.json({ error: "id and status are required" }, { status: 400 })
        }

        const updatedorder = await prisma.order.update({
            where: { id },
            data: { status },
        })

        console.log("Updated order:", updatedorder)
        return NextResponse.json(updatedorder)
    } catch (error) {
        console.error("Error updating order:", error)
        return NextResponse.json({ error: "Error updating order" }, { status: 500 })
    }
}