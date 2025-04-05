import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/connect";

export async function POST(req: Request) {
    try {
        console.log("ORDER FOR ORDER")
        const bodyText = await req.text();
        const body = JSON.parse(bodyText || "{}");

        const { restaurant_id, email, name, city, address, phno, items, totalPrice } = body;

        // ✅ Validation
        if (!restaurant_id || !email || !name || !city || !phno || !address || !items || !totalPrice) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // ✅ Get restaurantCustomer
        const customer = await prisma.restaurantCustomer.findFirst({
            where: { email }
        });

        if (!customer) {
            return NextResponse.json({ error: "Customer not found" }, { status: 404 });
        }

        // ✅ Create order
        const order = await prisma.order.create({
            data: {
                restaurant: { connect: { restaurant_id } },
                restaurantCustomer: { connect: { id: customer.id } },
                name,
                phno,
                city,
                email,
                address,
                items, // This is a string[]
                totalPrice, // Stored as string
                status: "PENDING",
            },
        });

        console.log("✅ Order created:", order);
        return NextResponse.json(order);
    } catch (error) {
        console.error("❌ Error creating order:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
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