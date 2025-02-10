"use client";

import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HomeMenu from "./components/HomeMenu";
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
  const timing =
    restaurantData?.opentiming + " to " + restaurantData?.closetiming;
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        rest_id={restaurantData?.restaurant_id || ""}
        rest_name={restaurantData?.name || ""}
      />

      <Hero line={restaurantData?.desc} />
      {/* <div className="text-center mt-8 sm:mt-10 lg:my-16">
        <SectionHeader subHeader="Go To" mainHeader="Our Menu" />
        <div className="flex justify-center mt-6">
          <button className="bg-red-600 text-white text-lg font-semibold px-8 py-4 rounded-full border-2 border-red-600 transition-all duration-300 relative overflow-hidden hover:shadow-[0_0_20px_5px_rgba(220,38,38,0.5)]">
            Menu
          </button>
        </div>
      </div> */}

      {restaurantData && (
        <>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mt-8 sm:mt-10 lg:my-16 border border-gray-300 rounded-lg p-6 max-w-5xl mx-auto">
            {/* Left Side - Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src={imgBg}
                alt="Our Story"
                className="max-w-full h-auto rounded-lg"
              />
            </div>

            {/* Right Side - About Us Info */}
            <div className="w-full lg:w-1/2 text-[#333333] flex flex-col gap-4 text-center lg:text-left">
              <SectionHeader subHeader="OUR STORY" mainHeader="About Us" />
              <p className="text-sm sm:text-base inline-flex">
                {restaurantData.about_us}
              </p>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-10 lg:my-16">
            <div className="text-[#333333] max-w-md sm:max-w-xl lg:max-w-4xl mx-auto mt-4 px-4 lg:px-0 flex flex-col gap-4">
              <SectionHeader subHeader="We are open from" mainHeader={timing} />
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
