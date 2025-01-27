import DSearch from "@/app/template1/components/DSearch";
import noproduct from "@/app/template1/images/noproduct.jpg";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type MenuItemProps = {
  categories: Category[];
};

const MenuSettings = ({ categories }: MenuItemProps) => {
  console.log("Categories: ", categories);
  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <DSearch placeholder="Search for a product .." />
        <Link href="/template1/adminDashboard/products/add">
          <button className="px-4 py-2 bg-[#1c9cea] text-white rounded-lg hover:bg-blue-700 transition">
            Add new
          </button>
        </Link>
      </div>
      <table className="w-full bg-[#172340] border-gray-600 rounded-xl shadow-md">
        <thead
          className="
        bg-[#172340]
        rounded-lg
        border-gray-600"
        >
          <div className="flex items-center justify-center">
            <td className=" py-7 text-2xl font-bold px-4 ">CATEGORIES</td>
          </div>
        </thead>
        <tbody>
          {categories.map((item) => (
            <tr className="flex justify-between rounded-xl my-2 hover:bg-[#283d6f]">
              <td
                className="
               py-3 px-4"
              >
                <div className="px-5 py-3 items-center text-xl font-semibold">
                  {item.name}
                </div>
              </td>
              <td className="py-7 px-4">
                <div className="flex gap-6">
                  <button className="px-5 py-2 hover:scale-110 transition-all bg-green-700 rounded">
                    View
                  </button>
                  <button className="px-5 py-2 hover:scale-110 bg-red-700 transition-all rounded">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuSettings;
