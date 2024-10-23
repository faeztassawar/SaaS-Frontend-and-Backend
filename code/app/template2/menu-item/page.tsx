"use client";

import Image from "next/image";
import Header from "@/app/template2/components/Header";
import Footer from "@/app/template2/components/Footer";
import UserTabs from "@/app/template2/components/UserTabs";
import pizza from "@/app/template2/images/pizza.png";
import { FaAngleRight } from "react-icons/fa";
import Link from "next/link";

export default function MenuItemsPage() {
  const staticMenuItems = [
    {
      _id: "1",
      name: "Pizza 1",
      image: pizza,
    },
    {
      _id: "2",
      name: "Pizza 2",
      image: pizza,
    },
    {
      _id: "3",
      name: "Pizza 3",
      image: pizza,
    },
    {
      _id: "4",
      name: "Pizza 4",
      image: pizza,
    },
    {
      _id: "5",
      name: "Pizza 5",
      image: pizza,
    },
    {
      _id: "6",
      name: "Pizza 6",
      image: pizza,
    },
  ];

  return (
    <div className="min-h-screen">
      <Header isAdmin={true} />
      <div className=" text-center mt-12 mb-12">
        <UserTabs isAdmin={true} />
      </div>
      <section className="bg-gray-50 max-w-2xl mx-auto p-2 shadow-2xl">
        <div className="mt-2 flex justify-center items-center">
          <Link href="/template2/menu-item/new">
            <button className="flex justify-center items-center gap-2 text-center bg-[#800000] border text-white font-semibold rounded-xl px-6 py-2">
              Create New Menu Item
              <FaAngleRight size={20} />
            </button>
          </Link>
        </div>

        <div>
          <h2 className="text-sm text-gray-700 mt-8 mb-3 px-2">
            Edit Menu Item:
          </h2>
          <div className="grid grid-cols-3 gap-2 p-2">
            {staticMenuItems.map((item) => (
              <Link
                key={item._id}
                // href={`/template2/menu-item/edit/${item._id}`}
                href="/template2/menu-item/edit"
                className="bg-gray-300 rounded-lg p-4  hover:bg-white hover:shadow-2xl hover:shadow-black/30 transition-all"
                aria-label={`Edit ${item.name}`}
              >
                <div className="relative">
                  <Image
                    className="rounded-md"
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center font-semibold text-lg">
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
