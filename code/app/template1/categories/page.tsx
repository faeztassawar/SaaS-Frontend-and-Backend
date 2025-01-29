"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import CategoryCard from "@/app/template1/components/CategoryCard";
import { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import Link from "next/link";
import { Category } from "@prisma/client";
import { useSession } from "next-auth/react";

interface MenuProps {
  restaurant_id: string;
  id: string;
}

const Example = ({ id, restaurant_id}: MenuProps) => {
  return (
    <div className="bg-neutral-800">
      <HorizontalScrollCarousel id={id} restaurant_id={restaurant_id} />
    </div>
  );
};

const HorizontalScrollCarousel = ({ id, restaurant_id}: MenuProps) => {
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
            categories.map((category) => (
              <Link key={category.id} href="">
                <CategoryCard
                  img={category.image || "@/app/template1/images/react.png"}
                  name={category.name}
                />
              </Link>
            ))
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
          <div className="flex items-center justify-center mt-8">
            <h1 className="text-white text-4xl">lezzetli.</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Example;