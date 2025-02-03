"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import CategoryCard from "@/app/template1/components/CategoryCard";
import { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import Link from "next/link";
import { Category } from "@prisma/client";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";

interface MenuProps {
  restaurant_id: string;
  id: string;
  restaurantName: string;
}

const Example = ({ id, restaurant_id, restaurantName }: MenuProps) => {
  return (
    <div className="bg-neutral-800">
      <HorizontalScrollCarousel
        id={id}
        restaurant_id={restaurant_id}
        restaurantName={restaurantName}
      />
    </div>
  );
};

const HorizontalScrollCarousel = ({
  id,
  restaurant_id,
  restaurantName,
}: MenuProps) => {
  const { status } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/categories/${id}`);
        if (!response.ok) throw new Error("Failed to fetch categories.");
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

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [id, status]);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isLargeScreen ? ["0%", "-39%"] : ["0%", "0%"]
  );
  const pathName = `/restaurants/${restaurant_id}/menu`;
  return (
    <section
      ref={targetRef}
      className="relative h-[500vh] w-screen bg-neutral-900 font-chillax"
    >
      <div className="relative md:sticky top-0 flex flex-col md:flex-row h-screen w-screen items-center">
        <motion.div
          style={{ x }}
          className="flex md:flex-row flex-col md:w-auto w-screen"
        >
          {!loading ? (
            categories.map((category) => {
              let image = category.image;

              // Convert object-like Uint8Array into a valid Base64 string
              if (image && typeof image === "object" && !("type" in image)) {
                const byteArray = Object.values(image);
                image = `data:image/jpeg;base64,${Buffer.from(
                  byteArray
                ).toString("base64")}`;
              }
              if (!category.isArchive) {
                return (
                  <Link
                    onClick={() => {
                      Cookies.set("cat", category.id as string);
                    }}
                    key={category.id}
                    href={pathName}
                  >
                    <CategoryCard img={image} name={category.name} />
                  </Link>
                );
              }
            })
          ) : (
            <div className="text-white text-2xl">Loading categories...</div>
          )}
        </motion.div>
        <div className="fixed z-10 bottom-0 w-screen text-center">
          <div className="flex items-center justify-center mb-8">
            <NavBar rest_id={restaurant_id} />
          </div>
        </div>
        <div className="fixed z-10 top-0 w-screen text-center">
          <div className="flex items-center justify-center py-14">
            <h1 className="text-white text-4xl">{restaurantName}</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Example;
