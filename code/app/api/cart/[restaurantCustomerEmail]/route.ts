import prisma from "@/lib/connect"
import { Item } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server"


export const GET = async (req: Request, { params }: { params: { restaurantCustomerEmail: string } }) => {
  try {
    const { restaurantCustomerEmail } = params;
    console.log("HEEREEEEE! : ", restaurantCustomerEmail)

    if (!restaurantCustomerEmail) {
      return NextResponse.json({ message: "Customer ID is required" }, { status: 400 });
    }

    const cart = await prisma.cart.findFirst({
      where: { email: restaurantCustomerEmail as string },
    });

    console.log("NOW FETCHING Cart: ", cart)

    if (!cart) {
      return NextResponse.json({ message: "Restaurant not found!" }, { status: 404 });
    }

    return NextResponse.json(cart);
  } catch (err) {
    console.error("Error fetching restaurant:", err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
};


export const POST = async (req: Request, { params }: { params: { restaurantCustomerEmail: string } }) => {
  try {
    const { restaurantCustomerEmail } = params;
    console.log("Cart of:", restaurantCustomerEmail);

    if (!restaurantCustomerEmail) {
      console.log("Email Issue");
      return NextResponse.json({ message: "Customer Email is required" }, { status: 400 });
    }

    const customer = await prisma.restaurantCustomer.findUnique({
      where: {
        email: restaurantCustomerEmail
      }
    })

    const body = await req.json();
    if (!body.item_id) {
      return NextResponse.json({ message: "Item ID is required" }, { status: 400 });
    }

    // Find existing cart
    const existingCart = await prisma.cart.findUnique({
      where: { email: customer?.email },
      select: { items: true } // Fetch existing items
    });

    let cartItems: string[] = [];

    // Check if items exist and are valid JSON before parsing
    if (existingCart?.items && typeof existingCart.items === "string") {
      try {
        cartItems = JSON.parse(existingCart.items);
        if (!Array.isArray(cartItems)) {
          cartItems = []; // Ensure it’s an array
        }
      } catch (error) {
        console.error("Error parsing cart items:", error);
        cartItems = []; // Reset to empty array on parsing failure
      }
    }

    // Add new item(s) to cart (DUPLICATES ALLOWED)
    if (Array.isArray(body.item_id)) {
      cartItems.push(...body.item_id); // Allow duplicates
    } else {
      cartItems.push(body.item_id);
    }

    // Update the cart in Prisma
    const updatedCart = await prisma.cart.upsert({
      where: { email: restaurantCustomerEmail },
      update: {
        items: JSON.stringify(cartItems),
      },
      create: {
        email: restaurantCustomerEmail,
        name: customer?.name as string, // Replace with real data
        restaurantCustomerId: customer?.id, // Must be a valid ObjectId string
        items: JSON.stringify(cartItems),
      },
    });

    console.log("CART UPDATED!", updatedCart);

    return NextResponse.json(updatedCart);
  } catch (err) {
    console.error("Error updating cart:", err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { restaurantCustomerEmail: string } }) => {
  try {
    const { restaurantCustomerEmail } = params;
    console.log("Removing cart of:", restaurantCustomerEmail);

    if (!restaurantCustomerEmail) {
      console.log("Email Issue");
      return NextResponse.json({ message: "Customer Email is required" }, { status: 400 });
    }


    // Find existing cart
    const deleteCart = await prisma.cart.delete({
      where: { email: restaurantCustomerEmail },
    });


    return NextResponse.json({ message: "Cart Deleted Successfully" }, { status: 200 });
  } catch (err) {
    console.error("Error deleting item from cart:", err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
};
