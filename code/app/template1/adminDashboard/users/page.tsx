"use client";

import { RestaurantCustomer } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-hot-toast";

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
const MySwal = withReactContent(Swal);
const UsersPage = ({ users }: userProps) => {
  const { data, status } = useSession();
  const router = useRouter();
  document.cookie = `id=${users[0].restaurant_id}; path=/; SamSite=Lax`;

  const confirmDelete = async (item: RestaurantCustomer) => {
    MySwal.fire({
      title: <p className="text-2xl">Are you sure?</p>,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#172340",
      color: "#fff",
      customClass: {
        popup: "rounded-xl border-gray-600",
        confirmButton: "bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg",
        cancelButton: "bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg mr-3",
      },
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          await handleDelete(item);
          toast.success("User deleted successfully!", {
            position: "top-right",
            style: {
              background: "#172340",
              color: "#fff",
              border: "1px solid #283d6f",
              borderRadius: "12px",
            },
          });
          router.refresh();
        } catch (error) {
          toast.error("Failed to delete category", {
            position: "top-right",
            style: {
              background: "#450a0a",
              color: "#fff",
              border: "1px solid #7f1d1d",
              borderRadius: "12px",
            },
          });
        }
      }
    });
  };
  const confirmChange = async (item: RestaurantCustomer) => {
    MySwal.fire({
      title: <p className="text-2xl">Are you sure?</p>,
      text: "This Action is Revertable!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      background: "#172340",
      color: "#fff",
      customClass: {
        popup: "rounded-xl border-gray-600",
        confirmButton: "bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg",
        cancelButton: "bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg mr-3",
      },
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          await handleAdmin(item);
          toast.success("Success!", {
            position: "top-right",
            style: {
              background: "#172340",
              color: "#fff",
              border: "1px solid #283d6f",
              borderRadius: "12px",
            },
          });
          router.refresh();
        } catch (error) {
          toast.error("Failed!", {
            position: "top-right",
            style: {
              background: "#450a0a",
              color: "#fff",
              border: "1px solid #7f1d1d",
              borderRadius: "12px",
            },
          });
        }
      }
    });
  };

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
                        await confirmDelete(item);
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
                      await confirmChange(item);
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
                      await confirmChange(item);
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
