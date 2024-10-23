"use client";

import Header from "../components/Header";
import MenuItem from "../components/MenuItem";
import SectionHeader from "../components/SectionHeader";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import ItemModal from "../components/ItemModal";
import Footer from "../components/Footer";
import Image from "next/image";
import Salad1Img from "@/app/template2/images/salad1.png";
import Salad2Img from "@/app/template2/images/salad2.png";

interface MenuItemType {
  name: string;
  desc: string;
  price: string;
}

export default function menuPage() {
  const [cartMessage, setCartMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);

  const handleAddToCart = (itemName: string) => {
    toast.success(`${itemName} has been added to the cart`, {
      position: "bottom-right",
      autoClose: 3000,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
    });
  };

  const handleItemClick = (item: MenuItemType) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen">
      <div className={`${isModalOpen ? "blur-sm" : ""} transition duration-300`}>
        {cartMessage && <p className="text-green-500">{cartMessage}</p>}
        <Header isAdmin={true} />
        
        <div className="hidden lg:block bg-gray-50 fixed left-0 top-1/2 transform -translate-y-1/2 z-10">
          <Image priority src={Salad1Img} width={109} height={189} alt="salad" />
        </div>
        <div className="hidden lg:block fixed right-0 top-1/2 transform -translate-y-1/2 z-10">
          <Image priority src={Salad2Img} width={107} height={195} alt="salad" />
        </div>

        <section className="mt-8">
          <div className="text-center">
            <SectionHeader mainHeader="Pizza" subHeader="" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4 mt-10 max-w-7xl mx-auto px-4 mb-10">
              <MenuItem
                name="Malai Boti Pizza"
                desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
                price="$12"
                onClick={() =>
                  handleItemClick({
                    name: "Malai Boti Pizza",
                    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
                    price: "$12",
                  })
                }
                onAddToCart={handleAddToCart}
              />
              <MenuItem
                name="Malai Boti Pizza"
                desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
                price="$12"
                onClick={() =>
                  handleItemClick({
                    name: "Malai Boti Pizza",
                    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
                    price: "$12",
                  })
                }
                onAddToCart={handleAddToCart}
              />
              <MenuItem
                name="Malai Boti Pizza"
                desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
                price="$12"
                onClick={() =>
                  handleItemClick({
                    name: "Malai Boti Pizza",
                    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
                    price: "$12",
                  })
                }
                onAddToCart={handleAddToCart}
              />
            </div>

            <SectionHeader mainHeader="Pasta" subHeader="" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4 mt-10 max-w-7xl mx-auto px-4 mb-10">
              <MenuItem
                name="Malai Boti Pizza"
                desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
                price="$12"
                onClick={() =>
                  handleItemClick({
                    name: "Malai Boti Pizza",
                    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
                    price: "$12",
                  })
                }
                onAddToCart={handleAddToCart}
              />
              <MenuItem
                name="Malai Boti Pizza"
                desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
                price="$12"
                onClick={() =>
                  handleItemClick({
                    name: "Malai Boti Pizza",
                    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
                    price: "$12",
                  })
                }
                onAddToCart={handleAddToCart}
              />
            </div>

            <SectionHeader mainHeader="Dessert" subHeader="" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4 mt-10 max-w-7xl mx-auto px-4 mb-10">
              <MenuItem
                name="Malai Boti Pizza"
                desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
                price="$12"
                onClick={() =>
                  handleItemClick({
                    name: "Malai Boti Pizza",
                    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
                    price: "$12",
                  })
                }
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </section>
      </div>

      {isModalOpen && selectedItem && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" />
          <div className="fixed inset-0 z-50 flex justify-center items-center">
            <ItemModal
              item={selectedItem}
              onClose={closeModal}
              onAddToCart={handleAddToCart}
            />
          </div>
        </>
      )}
      <ToastContainer />
      <Footer />
    </div>
  );
}