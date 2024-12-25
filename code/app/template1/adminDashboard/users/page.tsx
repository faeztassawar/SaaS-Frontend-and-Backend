"use client";
import DSearch from "@/app/template1/components/DSearch";
import noavatar from "@/app/template1/images/noavatar.png";
import { RestaurantCustomer } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { IoRemove } from "react-icons/io5";

type userProps = {
  users: RestaurantCustomer[];
};

const handleDelete = async (item: RestaurantCustomer) => {
  const user = await fetch(`/api/restaurantUsers`, {
    method: "DELETE",
    body: JSON.stringify({
      id: item.id,
      restaurant_id: item.restaurant_id,
    }),
  });
};
const handleAdmin = async (item: RestaurantCustomer) => {
  const user = await fetch(`/api/restaurantUsers`, {
    method: "POST",
    body: JSON.stringify({
      id: item.id,
      restaurant_id: item.restaurant_id,
    }),
  });
};

const UsersPage = ({ users }: userProps) => {
  console.log("USERSS BABYY!!!!", users);
  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <DSearch placeholder="Search for a user...." />
        <Link href="/template1/adminDashboard/users/add">
          <button className="px-4 py-2 bg-[#1c9cea] text-white rounded-lg hover:bg-blue-700 transition">
            Add new
          </button>
        </Link>
      </div>
      <table className="w-full bg-[#172340] rounded-xl border-gray-700  shadow-md">
        <thead className="">
          <tr>
            <td className="py-3 px-4 border-b border-gray-600">Name</td>
            <td className="py-3 px-4 border-b border-gray-600">Email</td>

            <td className="py-3 px-4 border-b border-gray-600">Admin</td>
            <td className="py-3 px-4 border-b border-gray-600">Action</td>
          </tr>
        </thead>
        <tbody>
          {users?.map((item, index) => (
            <tr key={index}>
              <td className="py-3 px-4 border-gray-600">
                <div className="flex items-center gap-2 ">{item.name}</div>
              </td>

              <td className="py-3 px-4 ">{item.email}</td>
              <td className="py-3 px-4 ">
                {item.isAdmin ? <>Yes</> : <>No</>}
              </td>
              <td className="py-3 px-4 ">
                <div className="flex gap-2">
                  {/* <Link href="/dashboardd/users/id">
                    <button className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition">
                      View
                    </button>
                  </Link> */}
                  <button
                    onClick={() => {
                      handleDelete(item);
                    }}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
              <div className="flex items-center justify-center">
                {!item.isAdmin ? (
                  <button
                    onClick={() => {
                      handleAdmin(item);
                    }}
                    className="inline-flex justify-end bg-green-600 px-5 py-2 rounded"
                  >
                    Make Admin
                  </button>
                ) : (
                  ""
                )}
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
