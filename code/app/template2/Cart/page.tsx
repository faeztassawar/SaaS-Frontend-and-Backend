"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import CartItem from "../components/CartItem";
import UserForm from "../components/UserForm";
import { useSession } from "next-auth/react";
import { Cart, Item } from "@prisma/client";
type CartProps = {
  restaurant_id: string;
};

const CartPage = ({ restaurant_id }: CartProps) => {
  const { data, status } = useSession();
  const [cart, setCart] = useState<Cart>();
  const [cartItems, setCartItems] = useState<Item[]>();
  const [totalPrice, setTotalPrice] = useState<number>(0); // ✅ Add total price state

  useEffect(() => {
    // ✅ Calculate total price whenever cartItems change
    const calculatedTotal = cartItems?.reduce(
      (sum, item) => sum + item.price,
      0
    );
    setTotalPrice(calculatedTotal ?? 0);
  }, [cartItems]);

  const getCart = async (restaurantCustomerId: string) => {
    if (!restaurantCustomerId) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/cart/${restaurantCustomerId}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const cartData = await res.json();
      setCart(cartData);
      console.log("🛒 Cart Data:", cartData.items);

      const parsedItems =
        typeof cartData.items === "string"
          ? JSON.parse(cartData.items)
          : cartData.items;

      if (!parsedItems || !Array.isArray(parsedItems)) {
        console.error("❌ Invalid items format:", parsedItems);
        return;
      }

      // 🔹 Count occurrences of each item
      const itemCounts: Record<string, number> = parsedItems.reduce(
        (acc: Record<string, number>, id: string) => {
          acc[id] = (acc[id] || 0) + 1;
          return acc;
        },
        {}
      );

      console.log("🛒 Item Counts:", itemCounts);

      // 🔹 Fetch unique items from DB
      const allItemsRes = await fetch(`/api/items`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: Object.keys(itemCounts) }), // Send only unique IDs
      });

      if (!allItemsRes.ok) {
        throw new Error(`Failed to fetch items: ${allItemsRes.statusText}`);
      }

      const uniqueItems: Item[] = await allItemsRes.json();
      console.log("✅ Unique Items from DB:", uniqueItems);

      // 🔹 Duplicate items based on quantity
      const finalCartItems: Item[] = uniqueItems.flatMap(
        (item) => Array(itemCounts[item.id]).fill(item) // Create multiple instances of the same item
      );

      console.log("🛒 Final Cart Items:", finalCartItems);

      setCartItems(finalCartItems); // ✅ Now contains duplicates based on quantity
    } catch (error) {
      console.error("❌ Error fetching cart:", error);
    }
  };
  // ✅ Log after state update
  useEffect(() => {
    console.log("🛒 Updated Cart Items:", cartItems);
  }, [cartItems]);
  useEffect(() => {
    console.log("Restauarnt Id: ", restaurant_id);
    document.cookie = `id=${restaurant_id}; path=/; SameSite=Lax;`;
    getCart(data?.user?.email ?? "");
  }, []);
  return (
    <div className="min-h-screen">
      <Header rest_id={restaurant_id} rest_name="Cart" />
      <div className="text-center mt-8 mb-12 bg-gray-50">
        <SectionHeader mainHeader="Cart" subHeader="Here is Your" />
      </div>

      {/* Grid with 2 columns */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column for Pizza Items */}
        <div className="px-4">
          {cartItems?.map((item) => (
            <>
              <CartItem
                id={item.id}
                name={item.name}
                price={item.price}
                cart={cart?.id as string}
                item={item.id}
              />
            </>
          ))}
          <div className="py-2 text-right pr-12 flex justify-center mt-6 items-center">
            <span className="text-gray-500">Total:</span>
            <span className="font-bold text-lg pl-2">$ {totalPrice}</span>
          </div>
        </div>

        {/* Right Column with form */}
        <div className="bg-gray-100 p-6 rounded-2xl mx-3 lg:mx-8 shadow-2xl">
          <UserForm />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
