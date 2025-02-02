"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import bgImage from "@/app/template1/images/menubg 1.png";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CategoryComponent from "../components/Category"; // Correct import
import { useSession } from "next-auth/react";
import { Category } from "@prisma/client";

interface MenuProps {
  restaurant_id: string;
  id: string;
}

const MenuPage = ({ id, restaurant_id }: MenuProps) => {
  const { status } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/categories/${id}`);
        const jsonData: Category[] = await response.json();
        setCategories(jsonData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchCategories();
    }
  }, [id, status]);

  console.log("CATS and Items: ", categories);

  return (
    <div className="md:flex h-screen w-screen bg-[#050505] font-chillax">
      {/* Left Section with Background Image */}
      <div className="relative h-24 md:h-full md:w-1/2 w-full flex items-center justify-center overflow-hidden">
        <Image
          className="absolute z-0 top-0 left-0 object-cover brightness-50 sharpen"
          src={bgImage}
          fill
          alt="Background"
          priority
        />
        <div className="flex z-10 gap-12 items-center h-full flex-col justify-between py-10">
          <h1 className="text-white text-xl md:text-4xl">lezzetli.</h1>
          <div className="text-white flex gap-4 flex-col justify-between items-center">
            <h2 className="text-3xl md:text-5xl font-rose text-[#face8d]">
              Check Out
            </h2>
            <h1 className="text-5xl md:text-7xl font-[900] font-chillax">
              Our Menu
            </h1>
          </div>
          <div className="hidden md:block scale-75 lg:scale-90 xl:scale-100">
            <NavBar rest_id={restaurant_id} />
          </div>
        </div>
      </div>

      {/* Right Section with Menu Items */}
      <div className="md:ml-1/2 h-screen z-10 w-full md:w-1/2 text-2xl flex flex-col gap-4 font-chillax text-white bg-[#010000] overflow-y-auto">
        {/* Sticky Header */}
        <div className="flex justify-center gap-12 text-lg sticky top-0 bg-black w-full z-40 p-4">
          <h1 className="text-4xl py-8 font-bold">Our Categories</h1>
        </div>

        {/* Categories and Items */}
        {loading ? (
          <p className="text-center text-white">Loading categories...</p>
        ) : (
          categories.map((category) => (
            <>
              {!category.isArchive ? (
                <CategoryComponent
                  key={category.id}
                  cat_id={category.id}
                  cat_name={category.name}
                />
              ) : (
                <></>
              )}
            </>
          ))
        )}

        {/* Footer */}
        <div className="flex items-center justify-center md:hidden">
          <NavBar rest_id={restaurant_id} />
        </div>
        <div className="m-4">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
