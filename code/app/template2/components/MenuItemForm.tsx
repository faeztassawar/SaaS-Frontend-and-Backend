"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import jerry from "@/app/template2/images/jerry.png"; 
import MenuItemPriceProps from "@/app/template2/components/MenuItemPriceProps"; 

interface MenuItemFormProps {
  onSubmit: (ev: FormEvent<HTMLFormElement>, menuItem: MenuItem) => void;
}

interface MenuItem {
  image: string;
  name: string;
  description: string;
  basePrice: string;
  category: string;
  sizes: Prop[];  
  extraIngredientPrices: Prop[]; 
}

interface Prop {
  name: string;
  price: number;
}

export default function MenuItemForm() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState<string>("");
  const [category, setCategory] = useState("");
  
  // Initialize sizes and extraIngredientPrices as empty arrays
  const [sizes, setSizes] = useState<Prop[]>([]); 
  const [extraIngredientPrices, setExtraIngredientPrices] = useState<Prop[]>([]); 

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const menuItem: MenuItem = {
      image,
      name,
      description,
      basePrice,
      category,
      sizes, 
      extraIngredientPrices, // Add extra ingredient prices to the menu item
    };
    
    // You can handle the menuItem here, e.g., sending it to the API
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-grow flex justify-center items-center mt-7">
        <div className="p-8 rounded-lg shadow-2xl w-1/3 bg-gray-100">
          <div className="relative flex justify-center items-center">
            <Image
              className="rounded-full w-24 h-24"
              src={jerry} // Placeholder image
              alt="Menu Item Image"
              width={96}
              height={96}
            />
            <label>
              <input type="file" className="hidden" />
              <span className="block p-1 text-xs rounded-full bg-white text-gray-800 shadow-md cursor-pointer">
                Edit
              </span>
            </label>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                id="name"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Menu item name"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
                id="description"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Menu description"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(ev) => setCategory(ev.target.value)}
                id="category"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Category"
                required
              />
            </div>

            <div>
              <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700 mb-1">
                Base Price
              </label>
              <input
                type="text"
                value={basePrice}
                onChange={(ev) => setBasePrice(ev.target.value)}
                id="basePrice"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Base price"
                required
              />
            </div>
            <MenuItemPriceProps
              name={"Sizes"}
              addLabel={"Add Item Size"}
              props={sizes}
              setProps={setSizes}
            />
            <MenuItemPriceProps
              name={"Extra Ingredients"}
              addLabel={"Add Ingredients Prices"}
              props={extraIngredientPrices}
              setProps={setExtraIngredientPrices}
            />
            <button
              type="submit"
              className="w-full p-3 bg-[#800000] text-white font-semibold rounded-lg"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
