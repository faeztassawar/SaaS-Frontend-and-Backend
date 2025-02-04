import prisma from "@/lib/connect"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { restaurant_id: string } }) {
  try {
    const { restaurant_id } = params

    if (!restaurant_id) {
      return NextResponse.json({ message: "Restaurant ID is required" }, { status: 400 })
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: { restaurant_id },
      select: { about_us: true },
    })

    if (!restaurant) {
      return NextResponse.json({ message: "Restaurant not found!" }, { status: 404 })
    }

    return NextResponse.json(restaurant)
  } catch (err) {
    console.error("Error fetching about us:", err)
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 })
  }
}

export async function POST(req: NextRequest, { params }: { params: { restaurant_id: string } }) {
  try {
    const { restaurant_id } = params
    const body = await req.json()

    if (!restaurant_id) {
      return NextResponse.json({ message: "Restaurant ID is required" }, { status: 400 })
    }

    const restaurant = await prisma.restaurant.update({
      where: { restaurant_id },
      data: {
        about_us: body.about_us,
      },
    })

    if (!restaurant) {
      return NextResponse.json({ message: "Restaurant not found!" }, { status: 404 })
    }

    return NextResponse.json(restaurant)
  } catch (err) {
    console.error("Error updating about us:", err)
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 })
  }
}

