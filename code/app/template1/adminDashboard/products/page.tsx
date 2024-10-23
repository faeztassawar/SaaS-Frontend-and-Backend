import DSearch from "@/app/template1/components/DSearch";
import noproduct from "@/app/template1/images/noproduct.jpg";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UsersPage = () => {
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
          <tr>
            <td className="py-3 px-4 border-b">Title</td>
            <td className="py-3 px-4 border-b">Description</td>
            <td className="py-3 px-4 border-b">Price</td>
            <td className="py-3 px-4 border-b">Stock</td>
            <td className="py-3 px-4 border-b">Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-3 px-4">
              <div className="flex items-center gap-2">
                <Image
                  src={noproduct}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                ABC
              </div>
            </td>
            <td className="py-3 px-4">XFSF FEFS G</td>
            <td className="py-3 px-4">23</td>
            <td className="py-3 px-4">2</td>
            <td className="py-3 px-4">
              <div className="flex gap-2">
                <Link href="/dashboardd/users/id">
                  <button className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition">
                    View
                  </button>
                </Link>
                <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
