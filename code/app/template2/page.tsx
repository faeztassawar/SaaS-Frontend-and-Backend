"use client";

import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HomeMenu from "./components/HomeMenu";
import SectionHeader from "./components/SectionHeader";
import Footer from "./components/Footer";
import { Restaurant } from "@prisma/client";
import { useSession } from "next-auth/react";

type RestaurantProps = {
  restaurant_id: string;
};

export default function Home({ restaurant_id }: RestaurantProps) {
  const { data, status } = useSession();
  
    const [restaurantData, setRestaurantData] = useState<Restaurant>();
    useEffect(() => {
      const fetchRestaurant = async () => {
        console.log("USER PROFILE RESTAURANT ID: ", restaurant_id);
        const res = await fetch(`/api/restaurant/${restaurant_id}`);
        if (res.ok) {
          const data = await res.json();
          setRestaurantData(data);
          console.log("RESTAURANT FETCHED: ", restaurantData);
        } else {
          console.log("NO RESTAURANT!");
        }
      };
      fetchRestaurant();
    }, [restaurantData, restaurant_id, status]);
    console.log("EMAIL: ", data?.user?.email);
    if (typeof window !== "undefined") {
      document.cookie = `id=${restaurant_id};path=/; SameSite=Lax `;
    }
    console.log("RESTAURANT: ", restaurant_id);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        rest_id={restaurantData?.restaurant_id || ""}
        rest_name={restaurantData?.name || ""}
      />

      <Hero />

      <HomeMenu />

      {restaurantData && (
        <>
          <div className="text-center mt-8 sm:mt-10 lg:my-16">
            <SectionHeader subHeader="OUR STORY" mainHeader="About Us" />
            <div className="text-[#333333] max-w-md sm:max-w-xl lg:max-w-4xl mx-auto mt-4 px-4 lg:px-0 flex flex-col gap-4">
              <p className="text-sm sm:text-base">{restaurantData.about_us}</p>
              <p className="text-sm sm:text-base">{restaurantData.desc}</p>
            </div>
          </div>

          <div className="text-center mt-10 sm:mt-20 mb-8">
            <SectionHeader subHeader="DON'T HESITATE" mainHeader="Contact Us" />
            <div className="mt-8 text-[#333333]">
              <a
                className="text-2xl sm:text-3xl lg:text-4xl text-[#333333]"
                href={`tel:${restaurantData.phone}`}
              >
                {restaurantData.phone}
              </a>
            </div>
          </div>
        </>
      )}

      <div className="bg-[#232324]">
        <Footer />
      </div>
    </div>
  );
}