import prisma from "@/lib/connect"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb";

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