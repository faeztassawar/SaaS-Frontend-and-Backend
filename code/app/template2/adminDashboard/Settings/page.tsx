"use client";

import React, { useEffect, useState, Fragment } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import UserTabs from "../../components/UserTabs";
import { useSession } from "next-auth/react";
import { Restaurant } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";

type SettingProps = {
  restaurant_id: string;
};

const Settings = ({ restaurant_id }: SettingProps) => {
  const { data, status } = useSession();
  const router = useRouter();

  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null);
  const [nameChange, setNameChange] = useState("");
  const [descChange, setDescChange] = useState("");
  const [opentime, setOpenTime] = useState("");
  const [closetime, setCloseTime] = useState("");
  const [addressChange, setAddressChange] = useState("");
  const [phoneChange, setPhoneChange] = useState("");
  const [aboutUsChange, setAboutUsChange] = useState("");
  const [cuisineChange, setCuisineChange] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await fetch(`/api/restaurant/${restaurant_id}`);
        if (res.ok) {
          const data = await res.json();
          setRestaurantData(data);
          setNameChange(data.name || "");
          setDescChange(data.desc || "");
          setAboutUsChange(data.about_us || "");
          setCuisineChange(data.cuisine || "");
          setAddressChange(data.address || "");
          setPhoneChange(data.phone || "");
          setOpenTime(data.opentiming || "");
          setCloseTime(data.closetiming || "");
        } else {
          toast.error("Failed to fetch restaurant data");
        }
      } catch {
        toast.error("Error fetching restaurant data");
      }
    };

    if (status === "authenticated") {
      fetchRestaurant();
    }
  }, [status, restaurant_id]);

  const showSuccessDialog = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleNameChange = async () => {
    try {
      const res = await fetch(`/api/restaurant/${restaurant_id}`, {
        method: "POST",
        body: JSON.stringify({ name: nameChange }),
      });

      if (res.ok) {
        const data = await res.json();
        setNameChange(data.name);
        showSuccessDialog("Restaurant name updated successfully!");
        toast.success("Name updated");
      } else {
        toast.error("Failed to update name");
      }
    } catch {
      toast.error("Update failed");
    }
    router.refresh();
  };

  const handleDetailsChange = async () => {
    try {
      const res = await fetch(`/api/restaurant/${restaurant_id}`, {
        method: "POST",
        body: JSON.stringify({
          about_us: aboutUsChange,
          desc: descChange,
          cuisine: cuisineChange,
          address: addressChange,
          phone: phoneChange,
          opentiming: opentime,
          closetiming: closetime,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setDescChange(data.desc);
        setAboutUsChange(data.about_us);
        setCuisineChange(data.cuisine);
        setAddressChange(data.address);
        setPhoneChange(data.phone);
        setOpenTime(data.opentiming || "");
        setCloseTime(data.closetiming || "");
        showSuccessDialog("Details updated successfully!");
        toast.success("Details updated");
      } else {
        toast.error("Failed to update details");
      }
    } catch {
      toast.error("Update failed");
    }
    router.refresh();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header rest_id={restaurant_id} rest_name="Settings" />
      <div className="mt-8">
        <UserTabs restaurant_id={restaurant_id} />
      </div>

      {/* Change Restaurant Name */}
      <section className="max-w-3xl bg-white rounded-lg shadow-md p-6 mx-auto mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Change Restaurant Name</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={nameChange}
            onChange={(e) => setNameChange(e.target.value)}
            className="flex-grow border border-gray-300 px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            placeholder="Enter new name"
          />
          <button
            onClick={handleNameChange}
            className="px-5 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Confirm
          </button>
        </div>
      </section>

      {/* Edit About Us and Details */}
      <section className="max-w-3xl bg-white rounded-lg shadow-md p-6 mx-auto mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit About Us Information</h2>

        <textarea
          value={descChange}
          onChange={(e) => setDescChange(e.target.value)}
          className="w-full h-24 mb-4 border border-gray-300 px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          placeholder="Write Introduction/Description"
        />

        <textarea
          value={aboutUsChange}
          onChange={(e) => setAboutUsChange(e.target.value)}
          className="w-full h-24 mb-4 border border-gray-300 px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          placeholder="Write About Us"
        />

        <textarea
          value={addressChange}
          onChange={(e) => setAddressChange(e.target.value)}
          className="w-full h-24 mb-4 border border-gray-300 px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          placeholder="Write Address"
        />

        <input
          type="text"
          value={phoneChange}
          onChange={(e) => setPhoneChange(e.target.value)}
          className="w-full mb-4 border border-gray-300 px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          placeholder="Phone Number"
        />

        <input
          type="text"
          value={cuisineChange}
          onChange={(e) => setCuisineChange(e.target.value)}
          className="w-full mb-4 border border-gray-300 px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          placeholder="Cuisine"
        />

        <div className="flex gap-4 mb-6">
          <div className="flex flex-col w-1/2">
            <label className="mb-2 font-semibold text-gray-700">Opening Time</label>
            <input
              type="time"
              value={opentime}
              onChange={(e) => setOpenTime(e.target.value)}
              className="border border-gray-300 px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="mb-2 font-semibold text-gray-700">Closing Time</label>
            <input
              type="time"
              value={closetime}
              onChange={(e) => setCloseTime(e.target.value)}
              className="border border-gray-300 px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleDetailsChange}
          className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
        >
          Save Changes
        </button>
      </section>

      {/* Headless UI Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#172340] p-6 text-left align-middle shadow-xl transition-all border border-gray-600">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    Success!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-white">{modalMessage}</p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-full border border-blue-400 bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Okay
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Footer />
    </div>
  );
};

export default Settings;
