"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/template2/components/Header";
import Footer from "@/app/template2/components/Footer";
import UserTabs from "@/app/template2/components/UserTabs";


import { RestaurantCustomer } from "@prisma/client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
  const { data, status } = useSession();
  const router = useRouter();
  const [fetchedUsers, setFetchedUsers] = useState<RestaurantCustomer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const email = data?.user?.email;
      if (email) {
        try {
          const response = await fetch(`/api/session/restaurant/${email}`);
          const jsonData = await response.json();
          if (!jsonData.isOwner) {
            router.push(`/restaurants/${jsonData.restaurant_id}`);
          }

          const usersResponse = await fetch(`/api/restaurantUsers/${jsonData.restaurant_id}`);
          const usersData = await usersResponse.json();
          setFetchedUsers(usersData);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };
    fetchData();
  }, [status, data]);



  console.log("USERSSSS T2", fetchedUsers);





  return (
    <div className="flex flex-col min-h-screen">
      <Header isAdmin={true} />
      <div className="text-center mt-8 mb-12">
        <UserTabs isAdmin={true} rest_id={""} />
      </div>
      <div className="items-center justify-center mt-6 w-full max-w-2xl mx-auto">
        <div className="shadow-2xl rounded-lg p-5 bg-gray-100">
          {fetchedUsers.length > 0 ? (
            fetchedUsers.map((user) => (
              <div
                key={user.id}
                className="bg-gray-300 rounded-lg mb-3 p-4 flex items-center justify-between hover:bg-white hover:shadow-2xl hover:shadow-black/30 transition-all"
              >
                <div className="flex flex-col flex-grow text-left">
                  <span className="text-gray-900 font-semibold">
                    {user.name || <span className="italic">No name</span>}
                  </span>
                  <span className="text-gray-500">{user.email}</span>
                </div>
                <div className="flex gap-2">
                  {!user.isOwner && (
                    <button
                      onClick={async () => {
                        await handleDelete(user);
                        router.refresh();
                      }}
                      className="button bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700"
                    >
                      Delete
                    </button>
                  )}
                  {!user.isAdmin && !user.isOwner && (
                    <button
                      onClick={async () => {
                        await handleAdmin(user);
                        router.refresh();
                      }}
                      className="button bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700"
                    >
                      Make Admin
                    </button>
                  )}
                  {user.isAdmin && !user.isOwner && (
                    <button
                      onClick={async () => {
                        await handleAdmin(user);
                        router.refresh();
                      }}
                      className="button bg-yellow-600 text-white px-4 py-2 rounded font-semibold hover:bg-yellow-700"
                    >
                      Remove Admin
                    </button>
                  )}
                  {user.isOwner && <span className="font-semibold text-gray-700">OWNER</span>}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No users found.</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default UsersPage;
