"use client";

import React, { useEffect, useState, Fragment } from "react";
import Header from "@/app/template2/components/Header";
import Footer from "@/app/template2/components/Footer";
import UserTabs from "@/app/template2/components/UserTabs";
import { RestaurantCustomer } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Dialog, Transition } from "@headlessui/react";

type userProps = {
  users: RestaurantCustomer[];
  restaurantId: string;
};

const handleDelete = async (item: RestaurantCustomer) => {
  console.log("Deleting", item);
  await fetch(`/api/restaurantUsers`, {
    method: "DELETE",
    body: JSON.stringify({
      id: item.id,
      restaurant_id: item.restaurant_id,
    }),
  });
};

const handleAdmin = async (item: RestaurantCustomer) => {
  console.log("Handling Admin");
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

  // For Headless UI Dialog modal
  const [isOpen, setIsOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<
    "delete" | "makeAdmin" | "removeAdmin" | null
  >(null);
  const [currentUser, setCurrentUser] = useState<RestaurantCustomer | null>(null);

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

  const openConfirmModal = (
    user: RestaurantCustomer,
    action: "delete" | "makeAdmin" | "removeAdmin"
  ) => {
    setCurrentUser(user);
    setCurrentAction(action);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentUser(null);
    setCurrentAction(null);
  };

  const confirmAction = async () => {
    if (!currentUser || !currentAction) return;

    try {
      if (currentAction === "delete") {
        await handleDelete(currentUser);
      } else if (currentAction === "makeAdmin" || currentAction === "removeAdmin") {
        await handleAdmin(currentUser);
      }
      router.refresh();
    } catch (error) {
      console.error("Action failed:", error);
    } finally {
      closeModal();
    }
  };

  const getActionText = () => {
    if (!currentAction) return "";
    switch (currentAction) {
      case "delete":
        return "You won't be able to revert this!";
      case "makeAdmin":
        return "This action is reversible.";
      case "removeAdmin":
        return "This action is reversible.";
      default:
        return "";
    }
  };

  const getConfirmButtonClass = () => {
    if (currentAction === "delete") return "bg-red-600 hover:bg-red-700";
    if (currentAction === "makeAdmin") return "bg-green-600 hover:bg-green-700";
    if (currentAction === "removeAdmin") return "bg-yellow-600 hover:bg-yellow-700";
    return "bg-blue-600 hover:bg-blue-700";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header rest_id={restaurantId} />
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
                      onClick={() => openConfirmModal(user, "delete")}
                      className="button bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700"
                    >
                      Delete
                    </button>
                  )}
                  {!user.isAdmin && !user.isOwner && (
                    <button
                      onClick={async () => {
                        document.cookie = "admin=true;path=/; SameSite=Lax";
                        openConfirmModal(user, "makeAdmin");
                      }}
                      className="button bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700"
                    >
                      Make Admin
                    </button>
                  )}
                  {user.isAdmin && !user.isOwner ? (
                    <button
                      onClick={async () => {
                        document.cookie = "admin=false;path=/; SameSite=Lax";
                        openConfirmModal(user, "removeAdmin");
                      }}
                      className="button bg-yellow-600 text-white px-4 py-2 rounded font-semibold hover:bg-yellow-700"
                    >
                      Remove Admin
                    </button>
                  ) : (
                    <></>
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
      <Footer restaurant_id={restaurantId} />

      {/* Confirmation Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-50"
            leave="ease-in duration-200"
            leaveFrom="opacity-50"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#172340] p-6 text-left align-middle shadow-xl transition-all border border-gray-600">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    Are you sure?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-300">{getActionText()}</p>
                  </div>

                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className={`inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-white ${getConfirmButtonClass()}`}
                      onClick={confirmAction}
                    >
                      Yes
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default UsersPage;
