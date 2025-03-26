"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/template2/components/Header";
import Footer from "@/app/template2/components/Footer";
import UserTabs from "@/app/template2/components/UserTabs";
import { RestaurantCustomer } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type userProps = {
  users: RestaurantCustomer[],
  restaurantId: string
};

const handleDelete = async (item: RestaurantCustomer) => {
  await fetch(`/api/restaurantUsers`, {
    method: "DELETE",
    body: JSON.stringify({
      id: item.id,
      restaurant_id: item.restaurant_id,
    }),
  });
};

const handleAdmin = async (item: RestaurantCustomer) => {
  await fetch(`/api/restaurantUsers`, {
    method: "POST",
    body: JSON.stringify({
      id: item.id,
      restaurant_id: item.restaurant_id,
    }),
  });
};

const UsersPage = ({ users, restaurantId }: userProps) => {
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

          const usersResponse = await fetch(
            `/api/restaurantUsers/${jsonData.restaurant_id}`
          );
          const usersData = await usersResponse.json();
          setFetchedUsers(usersData);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };
    fetchData();
  }, [status, data, router]);

  const confirmAction = async (item: RestaurantCustomer, action: string) => {
    const actionMap: { [key: string]: () => Promise<void> } = {
      delete: () => handleDelete(item),
      makeAdmin: () => handleAdmin(item),
      removeAdmin: () => handleAdmin(item),
    };

    const result = await MySwal.fire({
      title: <p className="text-2xl">Are you sure?</p>,
      text: `You are about to ${action.replace(/([A-Z])/g, ' $1').toLowerCase()}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      background: "#969292",
      color: "#fff",
      customClass: {
        popup: "rounded-xl border-gray-600",
        confirmButton: "bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg",
        cancelButton: "bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg mr-3",
      },
    });

    if (result.isConfirmed) {
      await actionMap[action]();
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header rest_id={restaurantId}/>
      <div className="text-center mt-8 mb-12">
        <UserTabs restaurant_id={restaurantId} />
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
                      onClick={() => confirmAction(user, "delete")}
                      className="button bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700"
                    >
                      Delete
                    </button>
                  )}
                  {!user.isAdmin && !user.isOwner && (
                    <button
                      onClick={() => confirmAction(user, "makeAdmin")}
                      className="button bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700"
                    >
                      Make Admin
                    </button>
                  )}
                  {user.isAdmin && !user.isOwner && (
                    <button
                      onClick={() => confirmAction(user, "removeAdmin")}
                      className="button bg-yellow-600 text-white px-4 py-2 rounded font-semibold hover:bg-yellow-700"
                    >
                      Remove Admin
                    </button>
                  )}
                  {user.isOwner && (
                    <span className="font-semibold text-gray-700">OWNER</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No users found.</div>
          )}
        </div>
      </div>
      <Footer restaurant_id={restaurantId}/>
    </div>
  );
};

export default UsersPage;
