import prisma from "@/lib/connect"
import { NextResponse } from "next/server"

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ message: "Item ID is required" }, { status: 400 })
    }

    const item = await prisma.item.findUnique({
      where: {
        id: id,
      },
    })

    if (!item) {
      return NextResponse.json({ message: "Item not found!" }, { status: 404 })
    }

    return NextResponse.json(item)
  } catch (err) {
    console.error("Error fetching item:", err)
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 })
  }
}
