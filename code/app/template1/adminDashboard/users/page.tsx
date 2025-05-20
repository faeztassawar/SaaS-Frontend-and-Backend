"use client";

import { RestaurantCustomer } from "@prisma/client";
import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";

type userProps = {
  users: RestaurantCustomer[];
  restaurantId: string;
};

const handleDelete = async (item: RestaurantCustomer) => {
  const res = await fetch(`/api/restaurantUsers`, {
    method: "DELETE",
    body: JSON.stringify({
      id: item.id,
      restaurant_id: item.restaurant_id,
    }),
  });
  if (!res.ok) throw new Error("Delete failed");
};
const handleAdmin = async (item: RestaurantCustomer) => {
  const res = await fetch(`/api/restaurantUsers`, {
    method: "POST",
    body: JSON.stringify({
      id: item.id,
      restaurant_id: item.restaurant_id,
    }),
  });
  if (!res.ok) throw new Error("Admin update failed");
};

const UsersPage = ({ users }: userProps) => {
  const { data, status } = useSession();
  const router = useRouter();
  document.cookie = `id=${users[0].restaurant_id}; path=/; SameSite=Lax`;

  // State for modals
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<RestaurantCustomer | null>(null);
  const [adminAction, setAdminAction] = useState<"make" | "remove" | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const email = data?.user?.email;
      const response = await fetch(`/api/session/restaurant/${email}`);
      const jsonData = await response.json();
      if (!jsonData.isOwner) {
        router.push(`/restaurants/${jsonData.restaurant_id}`);
      }
    };

    if (status === "authenticated") fetchData();
  }, [status, data, router]);

  const openDeleteModal = (user: RestaurantCustomer) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const openAdminModal = (user: RestaurantCustomer, action: "make" | "remove") => {
    setSelectedUser(user);
    setAdminAction(action);
    setIsAdminOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    try {
      await handleDelete(selectedUser);
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
    } catch {
      toast.error("Failed to delete user", {
        position: "top-right",
        style: {
          background: "#450a0a",
          color: "#fff",
          border: "1px solid #7f1d1d",
          borderRadius: "12px",
        },
      });
    } finally {
      setIsDeleteOpen(false);
      setSelectedUser(null);
    }
  };

  const confirmAdminChange = async () => {
    if (!selectedUser || !adminAction) return;
    try {
      document.cookie = `admin=${adminAction === "make" ? "true" : "false"}; path=/; SameSite=Lax`;
      await handleAdmin(selectedUser);
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
    } catch {
      toast.error("Failed to update admin status", {
        position: "top-right",
        style: {
          background: "#450a0a",
          color: "#fff",
          border: "1px solid #7f1d1d",
          borderRadius: "12px",
        },
      });
    } finally {
      setIsAdminOpen(false);
      setSelectedUser(null);
      setAdminAction(null);
    }
  };

  return (
    <div className="p-5">
      {/* Delete Confirmation Modal */}
      <Transition appear show={isDeleteOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsDeleteOpen(false)}
        >
          <div className="min-h-screen px-4 text-center bg-black bg-opacity-50">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="inline-block w-full max-w-md p-6 my-20 overflow-hidden text-left align-middle transition-all transform bg-[#172340] text-white rounded-2xl border border-gray-600 shadow-xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6"
                >
                  Are you sure?
                </Dialog.Title>
                <div className="mt-2">
                  <p>This action cannot be undone!</p>
                  <p className="font-semibold mt-2">{selectedUser?.name}</p>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600"
                    onClick={() => setIsDeleteOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
                    onClick={confirmDelete}
                  >
                    Yes, Delete
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Admin Change Confirmation Modal */}
      <Transition appear show={isAdminOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsAdminOpen(false)}
        >
          <div className="min-h-screen px-4 text-center bg-black bg-opacity-50">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="inline-block w-full max-w-md p-6 my-20 overflow-hidden text-left align-middle transition-all transform bg-[#172340] text-white rounded-2xl border border-gray-600 shadow-xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6"
                >
                  Are you sure?
                </Dialog.Title>
                <div className="mt-2">
                  <p>This action is reversible!</p>
                  <p className="font-semibold mt-2">
                    {adminAction === "make"
                      ? `Make ${selectedUser?.name} an Admin?`
                      : `Remove Admin rights from ${selectedUser?.name}?`}
                  </p>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600"
                    onClick={() => setIsAdminOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-green-600 hover:bg-green-700"
                    onClick={confirmAdminChange}
                  >
                    Yes
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <table className="w-full bg-[#172340] rounded-xl border-gray-700 shadow-md">
        <thead>
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
              <td className="py-3 px-4 border-gray-600">{item.name}</td>
              <td className="py-3 px-4">{item.email}</td>
              <td className="py-3 px-4">{item.isAdmin ? "Yes" : "No"}</td>
              <td className="py-3 px-4">
                <div className="flex gap-2 flex-wrap">
                  {!item.isOwner ? (
                    <button
                      onClick={() => openDeleteModal(item)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  ) : (
                    <div className="px-3 py-1 text-gray-400">OWNER</div>
                  )}

                  {!item.isAdmin && !item.isOwner && (
                    <button
                      onClick={() => openAdminModal(item, "make")}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Make Admin
                    </button>
                  )}

                  {item.isAdmin && !item.isOwner && (
                    <button
                      onClick={() => openAdminModal(item, "remove")}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Remove Admin
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
