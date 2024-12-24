"use client";

import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import SectionHeader from "./SectionHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

interface MenuItemType {
  id: string;
  name: string;
  desc: string;
  price: string;
}

const HomeMenu = () => {
  const [items, setItems] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch All Menu Items
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Fetch menu items (without category filtering)
        const response = await fetch("/api/item");
        if (!response.ok) throw new Error("Failed to fetch menu items");

        const menuData: MenuItemType[] = await response.json();
        setItems(menuData);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleAddToCart = (itemName: string) => {
    toast.success(`${itemName} has been added to the cart`, {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="text-center mb-4">
        <SectionHeader subHeader="CHECKOUT" mainHeader="Menu" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4 mt-10 w-[40rem] mx-auto">
        {items.map((item) => (
          <MenuItem
            key={item.id}
            name={item.name}
            desc={item.desc}
            price={item.price}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default HomeMenu;
