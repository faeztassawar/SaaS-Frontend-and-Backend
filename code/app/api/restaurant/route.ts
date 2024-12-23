import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/connect"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {

    // Ensure the user is authenticated
    const sess = await getAuthSession()
    if (!sess) {
        return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }))
    }

    try {
        // Parse the request body
        const body = await req.json()
        console.log("Request Body to Prisma:", body);

        // Create the restaurant first (without the menu)
        const restaurant = await prisma.restaurant.create({
            data: {
                owner_email: body.owner_email,
                name: body.name,
                about_us: body.about_us,
                desc: 'Great ambiance and friendly staff.',
                cuisine: "Pakistan",
                timing: '9am - 9pm',
                phone: body.phone,
                tempModel: body.tempModel,
            }
        })

        const user = await prisma.restaurantOwner.findUnique({
            where: {
                email: body.owner_email
            },
        })
        if (user?.restaurant_id == '') {
            const profile = await prisma.restaurantOwner.update({
                where: {
                    email: body.owner_email
                },
                data: {
                    restaurant_id: restaurant.restaurant_id
                }
            })
        } else {
            console.log("This user already has a restaurant")
            return new NextResponse(JSON.stringify({ message: "Already!" }), { status: 500, statusText: "Already!" })
        }


        // Fetch the categories that should be assigned to the new menu
        const fetchedCats = await prisma.category.findMany({
            where: {
                menuId: body.menuId
            }
        })


        console.log("DUMMY CATS FETCHED: ", fetchedCats)

        // Create a new menu for the restaurant
        const menu = await prisma.menu.create({
            data: {
                restaurant_id: restaurant.restaurant_id,
                // Use connect to associate the existing categories with the new menu
                categories: {
                    connect: fetchedCats.map(cat => ({ id: cat.id })) // assuming `id` is the unique identifier for categories
                }
            }
        })

        console.log("MENU CREATED BABY!!!!: ", menu)

        // Update the restaurant with the created menu
        const updatedRestaurant = await prisma.restaurant.update({
            where: { restaurant_id: restaurant.restaurant_id },
            data: {
                Menu: {
                    connect: { id: menu.id }
                }
            }
        })

        const menuCreated = await prisma.menu.findFirst({
            where: {
                restaurant_id: updatedRestaurant.restaurant_id
            }
        })

        const catsCreated = await prisma.category.findFirst({
            where: {
                menuId: menuCreated?.id
            }
        })

        console.log("NEW MENU ADDED: ", menuCreated)
        console.log("NEW CATEGORIS ADDED: ", catsCreated)

        // Return the created restaurant data with the associated menu
        return new NextResponse(JSON.stringify(updatedRestaurant))

    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({ message: "Something Went Wrong!" }), { status: 500 })
    }
}
