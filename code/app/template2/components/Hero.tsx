import React from "react";
import PizzaImg from "@/app/template2/images/pizza.png";
import Image from "next/image";
import { FiArrowRightCircle } from "react-icons/fi";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex justify-evenly items-center py-8 px-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold leading-12">
          Everything
          <br />
          is better
          <br />
          with a&nbsp;
          <span className="text-primaryTem2 font-bold">Pizza</span>
        </h1>
        <p className="text-gray-500 text-sm">
          We can offer you the best pizza you ever tried on this planet.
        </p>
        <Link href="/template2/menu">
          <button className="mt-4 uppercase bg-primaryTem2 text-center text-white flex gap-2 px-3 py-3 rounded-full items-center self-start">
            Order Now
            <FiArrowRightCircle />
          </button>
        </Link>
      </div>

      <div className="relative">
        <Image
          src={PizzaImg}
          alt="Pizza"
          width={250}
          height={250}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;
