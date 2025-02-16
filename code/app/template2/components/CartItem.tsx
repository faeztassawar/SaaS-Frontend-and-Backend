import React from "react";
import Image from "next/image";
import { GoTrash } from "react-icons/go";
import PizzaImg from "@/app/template2/images/pizza.png";

type CartItemProp = {
  name: string;
  price: number | string;
  cart: string;
  item: string;
};
const handleDelete = async (id: string) => {};
const CartItem = ({ name, price, cart, item }: CartItemProp) => {
  return (
    <div className="max-w-md mx-auto flex items-center justify-center gap-4 mb-2 border-b py-2">
      <div className="w-24">
        <Image src={PizzaImg} alt="pizza" width={100} height={100} />
      </div>
      <div className="grow">
        <div className="font-bold">{name}</div>
      </div>
      <div className="text-lg font-semibold">{price}</div>
      <div className="ml-2">
        <button className="border-2 border-gray-300 rounded-full p-2 hover:bg-gray-100">
          <GoTrash size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
