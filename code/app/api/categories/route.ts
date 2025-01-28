import prisma from "@/lib/connect"
import { cookies } from "next/headers";
import { NextResponse } from "next/server"


export const DELETE = async (req: Request) => {
    try {
        const body = await req.json()
        console.log("Ready to Delete!")
        const items = await prisma.item.deleteMany({
            where: {
                categoryId: body.id
            }
        })
        const cat = await prisma.category.delete({
            where: {
                id: body.id,
                menuId: body.menuId
            }
        })

        console.log("Category Deleted ", cat)
        return NextResponse.json(cat)
    } catch (err) {
        console.error("Error fetching category:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};



export const POST = async (req: Request) => {
    try {
        const body = await req.json()
        console.log("Creating new Category!")



        const cat = await prisma.category.create({
            data: {
                name: body.name,
                image: body.image || null,
                menuId: body.menuId
            }
        });


        console.log("Category Created ", cat)
        return NextResponse.json(cat)
    } catch (err) {
        console.error("Error fetching Item:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};