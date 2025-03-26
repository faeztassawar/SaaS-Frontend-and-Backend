"use client";

import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SectionHeader from "./components/SectionHeader";
import Footer from "./components/Footer";
import { Restaurant } from "@prisma/client";
import { useSession } from "next-auth/react";
import imgBg from "@/app/template2/images/t2.png";
import Image from "next/image";

type RestaurantProps = {
  restaurant_id: string;
};

export default function Home({ restaurant_id }: RestaurantProps) {
  const { data, status } = useSession();
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await fetch(`/api/restaurant/${restaurant_id}`);
        if (res.ok) {
          const data = await res.json();
          setRestaurantData(data);
        } else {
          console.log("No restaurant found.");
        }
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    if (restaurant_id) {
      fetchRestaurant();
    }
  }, [restaurant_id]); // ✅ Correct dependency array

  // Set cookie for restaurant_id
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.cookie = `rest_id=${restaurant_id};path=/;SameSite=Lax`;
    }
  }, [restaurant_id]);

  const timing = restaurantData
    ? `${restaurantData.opentiming || "9:00 AM"} to ${restaurantData.closetiming || "10:00 PM"}`
    : "Opening Hours Not Available";

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <Header rest_id={restaurantData?.restaurant_id || ""} rest_name={restaurantData?.name || ""} />

      {/* Hero Section */}
      <Hero line={restaurantData?.desc || "Welcome to our restaurant!"} />

      {/* About Us Section */}
      {restaurantData && (
        <>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mt-8 sm:mt-10 lg:my-16 border border-gray-300 rounded-lg p-6 max-w-5xl mx-auto shadow-lg bg-white">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image src={imgBg} alt="Our Story" className="max-w-full h-auto rounded-lg shadow-md" />
            </div>

            {/* About Us Content */}
            <div className="w-full lg:w-1/2 text-gray-700 flex flex-col gap-4 text-center lg:text-left">
              <SectionHeader subHeader="OUR STORY" mainHeader="About Us" />
              <p className="text-base">{restaurantData.about_us || "We serve the best food with love and quality!"}</p>
            </div>
          </div>

          {/* Opening Hours Section */}
          <div className="text-center mt-8 sm:mt-10 lg:my-16">
            <div className="text-gray-800 max-w-md sm:max-w-xl lg:max-w-4xl mx-auto mt-4 px-4 lg:px-0 flex flex-col gap-4">
              <SectionHeader subHeader="We are open from" mainHeader={timing} />
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center mt-10 sm:mt-20 mb-8">
            <SectionHeader subHeader="DON'T HESITATE" mainHeader="Contact Us" />
            <div className="mt-8">
              <a href={`tel:${restaurantData.phone}`} className="text-2xl sm:text-3xl lg:text-4xl text-gray-800 hover:underline">
                {restaurantData.phone || "Contact number not available"}
              </a>
            </div>
          </div>
        </>
      )}

      {/* Footer Section */}
      <div className="bg-[#232324]">
        <Footer restaurant_id={restaurant_id} />
      </div>
    </div>
  );
}