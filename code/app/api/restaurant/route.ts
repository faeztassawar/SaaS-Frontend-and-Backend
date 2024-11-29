import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/connect"
import { NextResponse } from "next/server"



export const GET = async (req: Request, { searchParams }: { searchParams: any }) => {
    try {
        const { restaurant_id } = searchParams
        const restaurant = await prisma.restaurant.findUnique({
            where: { restaurant_id: restaurant_id },
        });

        if (!restaurant) {
            return new NextResponse(JSON.stringify({ message: "restaurant not found!" }));
        }

        return new NextResponse(JSON.stringify(restaurant));
    } catch (err) {
        console.error(err); // More informative error logging
        return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
    }
};


export const POST = async (req: Request) => {

    const sess = await getAuthSession()
    if (!sess) {
        return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }))
    }

    try {
        const body = await req.json()
        console.log("Request Body to Prisma:", body);

        const restaurant = await prisma.restaurant.create({
            data: {
                owner_email: body.owner_email,
                name: body.name,
                about_us: body.about_us,
                desc: 'Great ambiance and friendly staff.',
                cuisine: "Italy",
                timing: '9am - 9pm',
                tempModel: body.tempModel,
            }
        })

        return new NextResponse(JSON.stringify(restaurant))


    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({ message: "Something Went Wrong!" }))
    }
}