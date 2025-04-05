import React from "react";
import Image from "next/image";
import { GoTrash } from "react-icons/go";
import PizzaImg from "@/app/template2/images/pizza.png";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";

type CartItemProp = {
  id: string;
  name: string;
  price: number | string;
  cart: string;
  item: string;
  img: string;
};

const CartItem = ({ id, name, price, cart, item, img }: CartItemProp) => {
  const { data, status } = useSession();
  const handleDelete = async (id: string) => {
    const deletedItem = await fetch(`/api/cart/${data?.user?.email}`, {
      method: "delete",
      body: JSON.stringify({
        id,
      }),
    });
    if (deletedItem.ok) {
      toast.success("Item deleted successfully!", {
        position: "bottom-right",
      });
      console.log("Item Deleted Successfully!");
      window.location.reload();
    } else {
      toast.error("Failed to delete item!");
    }
  };

  return (
    <div className="max-w-md mx-auto flex items-center justify-center gap-4 mb-2 border-b py-2">
      <div className="w-24">
        <Image src={img as string} alt="pizza" width={100} height={100} />
      </div>
      <div className="grow">
        <div className="font-bold">{name}</div>
      </div>
      <div className="text-lg font-semibold">{price}</div>
      <div className="ml-2">
        <button
          onClick={async () => await handleDelete(id)}
          className="border-2 border-gray-300 rounded-full p-2 hover:bg-gray-100"
        >
          <GoTrash size={20} />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CartItem;
