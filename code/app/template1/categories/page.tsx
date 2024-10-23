"use client"; // Ensures this file is treated as a client component

import { motion, useTransform, useScroll } from "framer-motion";
import CategoryCard from "@/app/template1/components/CategoryCard";
import burger from "@/app/template1/images/burger.png";
import pancake from "@/app/template1/images/pancakes.png";
import salad from "@/app/template1/images/salad.png";
import chai from "@/app/template1/images/chai.png";
import honey from "@/app/template1/images/honey.png";
import { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import Link from "next/link";

const Example = () => {
  return (
    <div className="bg-neutral-800">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const cards = [
    {
      url: pancake,

      name: "Breakfast",

      desc: "Fresh Breakfast",
    },

    {
      url: burger,

      name: "Burgers",

      desc: "Vegan Burgers",
    },

    {
      url: salad,

      name: "Salad",

      desc: "Italian Salad",
    },

    {
      url: chai,

      name: "Tea",

      desc: "Hot Chai and Coffee",
    },

    {
      url: honey,

      name: "Dessert",

      desc: "Natural Honey from Our Gardens",
    },
  ];

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Function to check window width and update state
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768); // Adjust the width as necessary for your breakpoints
    };

    handleResize(); // Check on initial mount

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isLargeScreen ? ["0%", "-39%"] : ["0%", "0%"]
  );

  return (
    <section
      ref={targetRef}
      className=" relative h-[500vh] w-screen bg-neutral-900 font-chillax"
    >
      <div className="relative md:sticky top-0 flex flex-col md:flex-row h-screen w-screen items-center">
        <motion.div
          style={{ x }}
          className="flex md:flex-row flex-col md:w-auto w-screen"
        >
          {cards.map((item) => {
            return (
              <Link key="" href={`/template1/menu/${item.name}`}>
                <CategoryCard
                  img={item.url}
                  name={item.name}
                  desc={item.desc}
                />
              </Link>
            );
          })}
        </motion.div>
        <div className="fixed z-10 bottom-0 w-screen text-center">
          <div className="flex items-center justify-center mb-8">
            <NavBar />
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
