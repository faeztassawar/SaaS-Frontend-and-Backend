import React from "react";
import Image from "next/image";
import Feature from "./Feature";

const features = [
  {
    title: "Admin Dashboard",
    desc: "Providing Dashboard to customize menu items, categories, and manage users efficiently",
  },
  {
    title: "Cart and Delivery",
    desc: "Add to Cart and Delivery features let fast food customers order food from home easily",
  },
  {
    title: "Reservation System",
    desc: "Reservation System enables customers to conveniently book a table at your restaurant",
  },
];

const Features = () => {
  return (
    <div className="bg-black py-10 text-white">
      <div className="  flex flex-col gap-7 items-center">
        <h1 className="text-5xl sm:text-6xl text-center font-bold tracking-tighter">
          Everyting You Need
        </h1>
        <p className="flex-wrap text-xl text-white/80 w-[50%] text-center">
          Enjoy Sleek restaurant designs with customizable menu and categories,
          offering Add to Cart and Reservation System while maintaining the
          integrity and providing security
        </p>
        <div className="flex flex-col mt-10 h-full w-[95%] justify-between items-center md:flex-1 md:flex-row px-20 py-10 gap-10 ">
          {features.map(({ title, desc }) => (
            <Feature title={title} desc={desc} key={title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;

// 1 19 20
