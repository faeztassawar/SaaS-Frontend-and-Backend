import React from "react";
import Image from "next/image";
import food from "@/app/template1/images/Soup.png";

type MealCardProps = {
  name: string; // Changed "String" to "string" for consistency with TypeScript conventions
  desc: string;
  price: number | string;
  img: string;
};

const MealCard = ({ name, desc, price, img }: MealCardProps) => {
  return (
    <div className="flex flex-col items-start py-4 px-8 w-full">
      <div className="flex w-full items-center gap-4 font-chillax">
        {/* Image Section */}
        <div className="relative w-24 h-24">
          <Image
            className="rounded-lg object-cover"
            src={img ? img : food}
            fill
            alt={`${name} image`} // Dynamically set alt text for better accessibility
          />
        </div>

        {/* Name and Description Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-white">{name}</h2>
          <p className="text-gray-400 text-sm mt-2">{desc}</p>
        </div>

        {/* Price Section */}
        <div className="text-right">
          <span className="text-xl font-semibold text-white">{`$${price}`}</span>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
