import React from "react";
import Image from "next/image";
import PizzaImg from "@/app/template2/images/pizza.png";

type MenuItemProp = {
  name: string;
  desc: string;
  price: number | string;
  imageSrc?: string; // Optional image source for dynamic images
  onClick?: () => void;
  onAddToCart?: (itemName: string) => void;
};

const MenuItem = ({
  name,
  desc,
  price,
  imageSrc,
  onClick,
  onAddToCart,
}: MenuItemProp) => {
  return (
    <div
      className="p-3 rounded-lg text-center flex flex-col items-center max-w-[15rem] mx-auto hover:bg-white hover:shadow-2xl hover:shadow-black/30 transition-all"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="text-center">
        <Image
          src={imageSrc || PizzaImg} // Use the dynamic image source if provided
          alt={name}
          width={150}
          height={150}
          className="mx-auto my-auto"
        />
      </div>

      {/* Product Name */}
      <h4 className="font-semibold text-xl my-3">{name}</h4>

      {/* Product Description */}
      <p className="text-gray-500 text-sm text-center px-4">{desc}</p>

      {/* Add to Cart Button */}
      <button
        className="mt-4 bg-[#800000] text-white rounded-full px-8 py-2"
        aria-label={`Add ${name} to cart for ${price}`}
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the parent `onClick`
          if (onAddToCart) {
            onAddToCart(name); // Pass the item's name to the `onAddToCart` callback
          }
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuItem;