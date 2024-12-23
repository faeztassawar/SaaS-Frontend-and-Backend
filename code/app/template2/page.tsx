"use client";

import React, { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HomeMenu from "./components/HomeMenu";
import SectionHeader from "./components/SectionHeader";
import Footer from "./components/Footer";

interface Restaurant {
  restaurant_id: string;
  name: string;
  about_us: string;
  cuisine: string;
  desc: string;
  phone: string;
}

export default function Home({
  restaurant,
}: {
  restaurant?: Restaurant;
}) {
  useEffect(() => {
    if (restaurant?.restaurant_id) {
      document.cookie = `id=${restaurant.restaurant_id}`;
    }
  }, [restaurant?.restaurant_id]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        rest_id={restaurant?.restaurant_id || ""}
        rest_name={restaurant?.name || ""}
      />

      <Hero />

      <HomeMenu />

      {restaurant && (
        <>
          <div className="text-center mt-8 sm:mt-10 lg:my-16">
            <SectionHeader subHeader="OUR STORY" mainHeader="About Us" />
            <div className="text-[#333333] max-w-md sm:max-w-xl lg:max-w-4xl mx-auto mt-4 px-4 lg:px-0 flex flex-col gap-4">
              <p className="text-sm sm:text-base">{restaurant.about_us}</p>
              <p className="text-sm sm:text-base">{restaurant.desc}</p>
            </div>
          </div>

          <div className="text-center mt-10 sm:mt-20 mb-8">
            <SectionHeader subHeader="DON'T HESITATE" mainHeader="Contact Us" />
            <div className="mt-8 text-[#333333]">
              <a
                className="text-2xl sm:text-3xl lg:text-4xl text-[#333333]"
                href={`tel:${restaurant.phone}`}
              >
                {restaurant.phone}
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