"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import ficon from "@/app/images/react.png";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const Feature = ({ title, desc }: { title: string; desc: string }) => {
  const offsetX = useMotionValue(-100);
  const offsetY = useMotionValue(-100);
  const maskImage = useMotionTemplate`radial-gradient(100px 100px at ${offsetX}px ${offsetY}px,black,transparent)`;
  const border = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const rect = border.current?.getBoundingClientRect();
      if (!rect) return;
      offsetX.set(e.x - rect.x);
      offsetY.set(e.y - rect.y);
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div
      className="basis-1/3 h-full text-white rounded-xl flex flex-col px-5 py-14
   items-center gap-10 justify-center flex-1 border border-white/30 relative"
    >
      <motion.div
        className="absolute rounded-xl inset-0 border-2 border-purple-400"
        style={{
          WebkitMaskImage: maskImage,
          maskImage,
        }}
        ref={border}
      ></motion.div>
      <div className="relative h-14 w-14 bg-black">
        <div className="absolute w-full top-2 bottom-2 bg-white blur-md"></div>
        <Image src={ficon} alt="" className="bg-black" />
      </div>
      <h1 className="text-center text-2xl font-bold">{title}</h1>
      <p className="text-center text-white/70 text-md px-5">{desc}</p>
    </div>
  );
};

export default Feature;
