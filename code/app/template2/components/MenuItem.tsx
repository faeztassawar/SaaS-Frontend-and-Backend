import React from "react";
import Image from "next/image";
import PizzaImg from "@/app/template2/images/pizza.png";

type MenuItemProp = {
  name: string;
  desc: string;
  price: number | string;
  onClick?: () => void;
  onAddToCart?: (itemName:string) => void;
};


const MenuItem = ({ name, desc, price,onClick, onAddToCart}: MenuItemProp) => {
  return (
    <div className=" p-3 rounded-lg text-center flex flex-col items-center max-w-[15rem] mx-auto hover:bg-white hover:shadow-2xl hover:shadow-black/30 transition-all"
    onClick={onClick}>
      <div className="text-center">
        <Image
          src={PizzaImg}
          alt="Pizza"
          width={150}
          height={150}
          className="mx-auto my-auto"
        />
      </div>

      <h4 className="font-semibold text-xl my-3">{name}</h4>

      <p className="text-gray-500 text-sm text-center px-4">{desc}</p>

      <button className="mt-4 bg-[#800000] text-white rounded-full px-8 py-2">
        Select Size
      </button>
    </div>
  );
};

export default MenuItem;
