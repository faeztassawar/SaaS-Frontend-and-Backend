import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/connect";

// GET: Fetch user's cart
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ message: "User ID is required" }, { status: 400 });

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { Item: true } } },
    });
    return NextResponse.json(cart || { items: [] });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching cart", error }, { status: 500 });
  }
}

// POST: Add item to cart
export async function POST(req: NextRequest) {
  const { userId, itemId, quantity } = await req.json();

  if (!userId || !itemId) return NextResponse.json({ message: "Missing required fields" }, { status: 400 });

  try {
    let cart = await prisma.cart.findUnique({ where: { userId }, include: { items: true } });

    if (!cart) cart = await prisma.cart.create({ data: { userId } });

    const existingItem = await prisma.cartItem.findFirst({ where: { cartId: cart.id, itemId } });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + (quantity || 1) },
      });
    } else {
      await prisma.cartItem.create({ data: { cartId: cart.id, itemId, quantity: quantity || 1 } });
    }

    return NextResponse.json({ message: "Item added to cart" });
  } catch (error) {
    return NextResponse.json({ message: "Error adding to cart", error }, { status: 500 });
  }
}

// PUT: Update cart item quantity
export async function PUT(req: NextRequest) {
  const { cartItemId, quantity } = await req.json();

  if (!cartItemId || quantity < 1) return NextResponse.json({ message: "Invalid data" }, { status: 400 });

  try {
    await prisma.cartItem.update({ where: { id: cartItemId }, data: { quantity } });
    return NextResponse.json({ message: "Cart item updated" });
  } catch (error) {
    return NextResponse.json({ message: "Error updating cart item", error }, { status: 500 });
  }
}

// DELETE: Remove item from cart
export async function DELETE(req: NextRequest) {
  const { cartItemId } = await req.json();

  if (!cartItemId) return NextResponse.json({ message: "Cart Item ID is required" }, { status: 400 });

  try {
    await prisma.cartItem.delete({ where: { id: cartItemId } });
    return NextResponse.json({ message: "Item removed from cart" });
  } catch (error) {
    return NextResponse.json({ message: "Error removing cart item", error }, { status: 500 });
  }
}