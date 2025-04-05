"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import CartItem from "../components/CartItem";
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

  useEffect(() => {
    console.log("🛒 Updated Cart Items:", cartItems);
  }, [cartItems]);

  useEffect(() => {
    console.log("Restaurant Id: ", restaurant_id);
    document.cookie = `id=${restaurant_id}; path=/; SameSite=Lax;`;
    getCart(data?.user?.email ?? "");
  }, [restaurant_id, data?.user?.email]);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data?.user?.email || !data?.user?.name) {
      alert("User information is missing. Please login.");
      return;
    }

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const phno = formData.get("phone") as string;
    const address = formData.get("street") as string;
    const city = formData.get("city") as string;

    if (!cart || !cart.items || !cartItems || cartItems.length === 0) {
      alert("Cart is empty or not loaded.");
      return;
    }

    const parsedItems =
      typeof cart.items === "string" ? JSON.parse(cart.items) : cart.items;

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.user.name,
        email: data.user.email,
        city,
        address,
        phno,
        restaurant_id,
        items: parsedItems ?? [],
        totalPrice: totalPrice.toString(), // Ensure totalPrice is a string
      }),
    });

    // Log the raw response text
    const text = await res.text();
    console.log("Raw response:", text);

    // Attempt to parse the JSON
    let orderData;
    try {
      orderData = JSON.parse(text);
    } catch (error) {
      console.error("Failed to parse response as JSON:", error);
      console.error("Raw response:", text);
      return;
    }

    if (!res.ok) {
      console.error("Order submission failed:", orderData);
      return;
    }

    console.log("Order response data:", orderData);

    if (!res.ok) {
      const err = await res.json();
      console.error("❌ Order failed:", err);
      alert("Order creation failed!");
      return;
    }

    // Clear user's cart
    await fetch(`/api/cart/${data.user.email}`, {
      method: "DELETE",
    });

    alert("Order placed successfully!");
    setCart(undefined);
    setCartItems([]);
    setTotalPrice(0);
  };

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
          {cartItems?.map((item) => {
            const getImageUrl = () => {
              if (typeof item.image === "object" && item.image !== null) {
                if (!("type" in item.image)) {
                  const byteArray = Object.values(item.image);
                  const buffer = Buffer.from(byteArray);
                  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
                }
                if (item.image.type === "Buffer") {
                  return `data:image/jpeg;base64,${Buffer.from(
                    item.image.data
                  ).toString("base64")}`;
                }
              }
              if (item.image instanceof Uint8Array) {
                return `data:image/jpeg;base64,${Buffer.from(
                  item.image
                ).toString("base64")}`;
              }
              if (typeof item.image === "string") return item.image;
            };

            const imageUrl = getImageUrl();

            return (
              <CartItem
                id={item.id}
                name={item.name}
                price={item.price}
                cart={cart?.id as string}
                item={item.id}
                img={imageUrl as string}
              />
            );
          })}
          <div className="py-2 text-right pr-12 flex justify-center mt-6 items-center">
            <span className="text-gray-500">Total:</span>
            <span className="font-bold text-lg pl-2">$ {totalPrice}</span>
          </div>
        </div>

        {/* Right Column with form */}
        <div className="bg-gray-100 p-6 rounded-2xl mx-3 lg:mx-8 shadow-2xl">
          <div>
            <form className="space-y-4" onSubmit={handleOrder}>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Phone number"
                />
              </div>

              <div>
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Street address"
                />
              </div>

              <div className="flex space-x-4">
                <div className="w-full">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-3"
                    placeholder="City"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full p-3 bg-[#800000] text-white font-semibold rounded-lg mb-2"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer restaurant_id={restaurant_id} />
    </div>
  );
};

export default CartPage;
