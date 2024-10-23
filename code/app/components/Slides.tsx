"use client";
import React, { useState, useEffect, useRef } from "react";
import land from "../images/T1L.png";
import menu from "../images/t1M.png";
import res from "../images/T1Res.png";
import dash from "../images/T1Dash.png";
import tland from "../images/T2landing.png";
import tmenu from "../images/T2menu.png";
import tres from "../images/T2Cart.png";
import tdash from "../images/T2Admin.png";
import Image from "next/image";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { motion, useScroll, useTransform } from "framer-motion";

type slideProps = {
  isClass: boolean;
};

const Slides = ({ isClass }: slideProps) => {
  let slides = [{ url: land }, { url: menu }, { url: res }, { url: dash }];

  if (isClass) {
    slides = [{ url: land }, { url: menu }, { url: res }, { url: dash }];
  } else {
    slides = [{ url: tland }, { url: tmenu }, { url: tres }, { url: tdash }];
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true); // Add a fade state

  const prevImage = () => {
    setFade(false); // Start fade-out
    setTimeout(() => {
      const isFirst = currentIndex === 0;
      const newIndex = isFirst ? slides.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
      setFade(true); // Start fade-in
    }, 200); // Set timeout to delay the fade-in until the image change happens
  };

  const nextImage = () => {
    setFade(false); // Start fade-out
    setTimeout(() => {
      const isLast = currentIndex === slides.length - 1;
      const newIndex = isLast ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      setFade(true); // Start fade-in
    }, 200); // Delay fade-in for the transition
  };

  const gotoSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const appImage = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: appImage,
    offset: ["start end", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <div className="max-w-[1400px] max-h-[780px] w-full m-auto py-16 px-4 relative group">
      <div
        className={`w-full h-full rounded-2xl bg-center bg-cover sm: duration-500 transition-opacity relative ${
          fade ? "opacity-100" : "opacity-0"
        }`} // Smooth fade-in/out transition
      >
        <motion.div
          style={{
            opacity: opacity,
            rotateX: rotateX,
            transformPerspective: "800px",
          }}
        >
          <div
            ref={appImage}
            className={`absolute max-h-full  w-full top-0 -bottom-7 ${
              isClass ? "bg-[rgb(193,151,98)]" : "bg-white"
            }  blur-md`}
          ></div>
          <Image
            ref={appImage}
            src={slides[currentIndex].url}
            alt=""
            className="rounded-2xl relative  bg-black"
          />
        </motion.div>
      </div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevImage} size={40} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextImage} size={40} />
      </div>
      <div className="  flex justify-center py-10">
        {slides.map((slide, index) => (
          <div
            key={index}
            onClick={() => {
              gotoSlide(index);
            }}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slides;
