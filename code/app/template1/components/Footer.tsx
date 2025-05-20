"use client"
import React, { useEffect, useState } from "react";
import { Restaurant } from "@prisma/client";

const Footer = ({ restaurant_id }: { restaurant_id: string }) => {
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!restaurant_id) return;

      try {
        const res = await fetch(`/api/restaurant/${restaurant_id}`);
        if (res.ok) {
          const data = await res.json();
          setRestaurantData(data);
        } else {
          console.log("No restaurant found!");
        }
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    fetchRestaurant();
  }, [restaurant_id]); // ✅ Fetch restaurant only when `restaurant_id` changes

  return (
    <footer className="bg-[#050505] text-white py-6 border-t-2 border-gray-700 mt-20">
      <div className="container mx-auto flex flex-wrap items-center pb-4 border-b bg-[#050505] px-6">
        <div className="text-3xl font-bold">
          {restaurantData?.name || "Lezzetli"}
        </div>

        <div className="ml-7 space-y-1 text-sm">
          <div>Phone: {restaurantData?.phone || "123-456-56"}</div>
          <div>Email: {restaurantData?.owner_email || "abc@gmail.com"}</div>
          <div>
            Address:{" "}
            {restaurantData?.address ||
              "G11, Basement, Al-Khair Arcade, G-11/1, Islamabad."}
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 pt-4">
        2025 © Powered by Shahid Farid
      </div>
    </footer>
  );
};

export default Footer;
