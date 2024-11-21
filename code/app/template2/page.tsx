"use client";

import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HomeMenu from "./components/HomeMenu";
import SectionHeader from "./components/SectionHeader";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header isAdmin={true} />

      <Hero />

      <HomeMenu />

      <div className="text-center mt-8 sm:mt-10 lg:my-16">
        <SectionHeader subHeader="OUR STORY" mainHeader="About Us" />
        <div className="text-[#333333] max-w-md sm:max-w-xl lg:max-w-4xl mx-auto mt-4 px-4 lg:px-0 flex flex-col gap-4">
          <p className="text-sm sm:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            soluta quasi exercitationem dignissimos temporibus tempore molestiae
            harum asperiores quisquam. Itaque, sunt consectetur dolorem
            laboriosam at officia voluptatibus quam voluptas odit!
          </p>
          <p className="text-sm sm:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            ipsum a cum, distinctio aspernatur modi maxime minima, facilis
            recusandae doloremque molestiae veniam necessitatibus esse
            voluptatem eveniet tempora facere iste laudantium! Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Iste quam voluptate placeat
            temporibus aspernatur commodi qui soluta vero iure? Animi, sapiente
            quidem. Earum laboriosam dolorum optio excepturi soluta eius
            adipisci.
          </p>
        </div>
      </div>

      <div className="text-center mt-10 sm:mt-20 mb-8">
        <SectionHeader subHeader="DON'T HESITATE" mainHeader="Contact Us" />
        <div className="mt-8 text-[#333333]">
          <a
            className="text-2xl sm:text-3xl lg:text-4xl text-[#333333]"
            href="tel:+923332760526"
          >
            +92 333 2760526
          </a>
        </div>
      </div>

      <div className="bg-[#232324]">
        <Footer />
      </div>
    </div>
  );
}
