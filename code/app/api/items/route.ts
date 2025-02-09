import prisma from "@/lib/connect"
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
        const formData = await req.formData()
        const img = formData.get("image") as File;
        const name = formData.get("name") as string;
        const desc = formData.get("desc") as string
        const price = formData.get("price") as string
        const menuId = formData.get("menu") as string
        const priceValue = parseInt(price, 10)
        const buffer = Buffer.from(await img.arrayBuffer());
        console.log("Creating new Item!")

        const category = await prisma.category.findFirst({
            where: {
                name: desc,
                menuId,
            }
        });

        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }




        const item = await prisma.item.create({
            data: {
                name,
                desc,
                price: priceValue, // Add price field
                categoryId: category.id, // Directly use categoryId
                image: buffer
            }
        });


        console.log("Item Created ", item)
        return NextResponse.json(item)
    } catch (err) {
        console.error("Error fetching Item:", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
};

// export const PUT = async (req: Request) => {
//     try {
//       const formData = await req.formData()
//       const id = formData.get("id") as string
//       const name = formData.get("name") as string
//       const desc = formData.get("desc") as string
//       const price = formData.get("price") as string
//       const categoryId = formData.get("categoryId") as string
//       const priceValue = Number.parseInt(price, 10)
//       const img = formData.get("image") as File
//       const buffer = img ? Buffer.from(await img.arrayBuffer()) : undefined
  
//       console.log("Updating Item!")
  
//       const item = await prisma.item.update({
//         where: { id },
//         data: {
//           name,
//           desc,
//           price: priceValue,
//           categoryId,
//           ...(buffer && { image: buffer }),
//         },
//       })
  
//       console.log("Item Updated ", item)
//       return NextResponse.json(item)
//     } catch (err) {
//       console.error("Error updating Item:", err)
//       return NextResponse.json({ message: "Something went wrong!" }, { status: 500 })
//     }
// };