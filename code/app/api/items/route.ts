import prisma from "@/lib/connect"
import { cookies } from "next/headers";
import { NextResponse } from "next/server"


export const DELETE = async (req: Request) => {
    try {
        const body = await req.json()
        console.log("Ready to Delete!")
        const item = await prisma.item.deleteMany({
            where: {
                id: body.id,
                categoryId: body.categoryId
            }
        })


        console.log("Item Deleted ", item)
        return NextResponse.json(item)
    } catch (err) {
        console.error("Error fetching Item:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};


export const POST = async (req: Request) => {
    try {
        const body = await req.json()
        console.log("Creating new Item!")

        const category = await prisma.category.findFirst({
            where: { name: body.desc } // Correctly match category by id
        });

        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        const item = await prisma.item.create({
            data: {
                name: body.name,
                desc: body.desc,
                price: body.price, // Add price field
                categoryId: category.id, // Directly use categoryId
                image: body.image || null
            }
        });


        console.log("Item Created ", item)
        return NextResponse.json(item)
    } catch (err) {
        console.error("Error fetching Item:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};