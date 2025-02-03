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
        console.log("Creating new Category!")
        const formData = await req.formData()
        const img = formData.get("image") as File;
        const name = formData.get("name") as string;
        const menu = formData.get("menuId") as string
        const buffer = Buffer.from(await img.arrayBuffer());

        const cat = await prisma.category.create({
            data: {
                name,
                image: buffer,
                isArchive: false,
                menuId: menu
            }
        });


        console.log("Category Created ", cat)
        return NextResponse.json(cat)
    } catch (err) {
        console.error("Error fetching Item:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};

export const PUT = async (req: Request) => {
    try {
        const body = await req.json()
        console.log("Updating Category!")


        const cat = await prisma.category.findUnique({
            where: {
                menuId: body.menuId,
                id: body.id
            }
        });
        const catUpdate = await prisma.category.update({
            where: {
                menuId: body.menuId,
                id: body.id
            }, data: {
                isArchive: !cat?.isArchive
            }
        });


        console.log("Category Updated ", catUpdate)
        return NextResponse.json(catUpdate)
    } catch (err) {
        console.error("Error fetching Item:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};