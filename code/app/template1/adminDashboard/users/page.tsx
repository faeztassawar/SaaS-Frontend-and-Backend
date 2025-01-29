"use client";

import { RestaurantCustomer } from "@prisma/client";
import { useEffect } from "react";
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
  document.cookie = `id=${users[0].restaurant_id}; path=/; SamSite=Lax`;

  useEffect(() => {
    const fetchData = async () => {
      const email = data?.user?.email;
      console.log("CLIENT EMAIL: ", email);
      const response = await fetch(`/api/session/restaurant/${email}`);
      const jsonData = await response.json();
      console.log("JSON DATA: ", jsonData);
      const check = jsonData;
      console.log("AFTER FETCHED EMAIL: ", email);
      console.log("AFTER FETCHED: ", check);
      if (!check.isOwner) {
        router.push(`/restaurants/${check.restaurant_id}`);
      }
    };

    fetchData();
  }, [status]);

  console.log("USERSS BABYY!!!!", users);
  return (
    <div className="p-5">
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
                  {!item.isOwner ? (
                    <button
                      onClick={async () => {
                        await handleDelete(item);
                        router.refresh();
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  ) : (
                    <div>OWNER</div>
                  )}
                </div>
              </td>
              <div className="flex items-center justify-center">
                {!item.isAdmin && !item.isOwner ? (
                  <button
                    onClick={async () => {
                      document.cookie = "admin=true;path=/; SameSite=Lax";
                      await handleAdmin(item);
                      router.refresh();
                    }}
                    className="mt-3 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Make Admin
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="flex items-center justify-center">
                {item.isAdmin && !item.isOwner ? (
                  <button
                    onClick={async () => {
                      document.cookie = "admin=false;path=/; SameSite=Lax";
                      await handleAdmin(item);
                      router.refresh();
                    }}
                    className="mt-3 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Remove Admin
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
