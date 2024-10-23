import React from "react";
import Image, { StaticImageData } from "next/image";
import food from "@/app/template1/images/Soup.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type MealCardProps = {
  name: String;
  desc: String;
  img: string | StaticImport;
  price: number | String;
};

const MealCard = ({ name, desc, img, price }: MealCardProps) => {
  return (
    <div className="flex flex-col items-start py-4 px-8 w-full">

      <div className="flex w-full items-center gap-4 font-chillax">
        <div className="relative w-24 h-24">
          <Image
            className="rounded-lg object-cover"
            src={img}
            fill
            alt="Tomato Soup"
          />
        </div>

        <div className="flex-1 ">
          <h2 className="text-2xl  font-semibold  text-white">{name}</h2>
          <p className="text-gray-400 text-sm mt-2">{desc}</p>
        </div>

        <div className="text-right">
          <span className="text-xl font-semibold text-white">{`$ ${price}`}</span>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
