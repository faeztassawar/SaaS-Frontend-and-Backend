import { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import PizzaImg from "@/app/template2/images/pizza.png";

interface MenuItemType {
  name: string;
  desc: string;
  price: string;
}

interface ItemModalProps {
  item: MenuItemType;
  onClose: () => void;
  onAddToCart: (itemName: string) => void;
}

const ItemModal = ({ item, onClose, onAddToCart }: ItemModalProps) => {
  const [selectedSize, setSelectedSize] = useState("Medium");

  const handleAddToCart = () => {
    toast.success(`${item.name} (${selectedSize}) has been added to cart!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <Image
          src={PizzaImg}
          alt="Pizza"
          width={150}
          height={150}
          className="mx-auto my-auto"
        />
        <h3 className="text-2xl font-semibold mb-4">{item.name}</h3>
        <p className="text-gray-600 mb-4">{item.desc}</p>
        <p className="text-lg font-semibold">{item.price}</p>

        <div className="mt-4">
          <h4 className="font-semibold mb-2">Selected Size</h4>
          <div className="flex justify-between items-center">
            <label>
              <input
                type="radio"
                name="size"
                value="Small"
                checked={selectedSize === "Small"}
                onChange={() => setSelectedSize("Small")}
              />
              Small
            </label>
            <label>
              <input
                type="radio"
                name="size"
                value="Medium"
                checked={selectedSize === "Medium"}
                onChange={() => setSelectedSize("Medium")}
              />
              Medium
            </label>
            <label>
              <input
                type="radio"
                name="size"
                value="Large"
                checked={selectedSize === "Large"}
                onChange={() => setSelectedSize("Large")}
              />
              Large
            </label>
          </div>
        </div>
        <button
          className="block mx-auto mt-4 bg-primaryTem2 text-white rounded-full px-8 py-2"
          onClick={() => {
            onAddToCart(item.name);
            onClose();
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
