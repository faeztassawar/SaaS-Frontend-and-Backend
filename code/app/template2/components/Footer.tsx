import React, { useEffect, useState } from "react";
import { Restaurant } from "@prisma/client";

interface FooterProps {
  restaurant_id: string;
}

const Footer = ({ restaurant_id }: FooterProps) => {
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
  }, [restaurant_id]);

  return (
    <footer className="bg-[#050505] text-white py-6 border-t-2 border-gray-700 mt-20 w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between pb-4 border-b border-gray-700 px-5">
        <div className="text-3xl font-bold mb-4 md:mb-0">
          {restaurantData?.name || "Lezzetli"}
        </div>

        {/* Contact Information */}
        <div className="text-sm space-y-1 text-center md:text-left">
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
