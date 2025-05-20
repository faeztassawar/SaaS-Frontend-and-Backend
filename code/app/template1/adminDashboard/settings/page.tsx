"use client";
import { Restaurant } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, Fragment } from "react";
import { toast } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";

type settingProps = {
  restaurant_id: string;
};

const Page = ({ restaurant_id }: settingProps) => {
  const { data, status } = useSession();
  const router = useRouter();
  const [restaurantData, setRestaurantData] = useState<Restaurant>();
  const [nameChange, setNameChange] = useState("");
  const [descChange, setDescChange] = useState("");
  const [addressChange, setAddressChange] = useState("");
  const [phoneChange, setPhoneChange] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [aboutUsChange, setAboutUsChange] = useState("");
  const [cuisineChange, setCuisineChange] = useState("");

  // Modal state for Headless UI
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
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
      }
    };
    if (status === "authenticated") {
      fetchRestaurant();
    }
  }, [status, restaurant_id]);

  const openSuccessModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleNameChange = async () => {
    try {
      const res = await fetch(`/api/restaurant/${restaurant_id}`, {
        method: "POST",
        body: JSON.stringify({
          name: nameChange || restaurantData?.name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setNameChange(data.name);
        openSuccessModal("Restaurant name updated successfully!");
        toast.success("Name updated", {
          position: "top-right",
          style: {
            background: "#172340",
            color: "#fff",
            border: "1px solid #283d6f",
            borderRadius: "12px",
          },
        });
      } else {
        toast.error("Failed to update name", {
          position: "top-right",
          style: {
            background: "#450a0a",
            color: "#fff",
            border: "1px solid #7f1d1d",
            borderRadius: "12px",
          },
        });
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Update failed", {
        position: "top-right",
        style: {
          background: "#450a0a",
          color: "#fff",
          border: "1px solid #7f1d1d",
          borderRadius: "12px",
        },
      });
    }
    router.refresh();
  };

  const handleDetailsChange = async () => {
    try {
      const res = await fetch(`/api/restaurant/${restaurant_id}`, {
        method: "POST",
        body: JSON.stringify({
          about_us: aboutUsChange || restaurantData?.about_us,
          desc: descChange || restaurantData?.desc,
          cuisine: cuisineChange || restaurantData?.cuisine,
          address: addressChange || restaurantData?.address,
          phone: phoneChange || restaurantData?.phone,
          opentiming: openTime || restaurantData?.opentiming,
          closetiming: closeTime || restaurantData?.closetiming,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setDescChange(data.desc);
        setAboutUsChange(data.about_us);
        setCuisineChange(data.cuisine);
        setAddressChange(data.address);
        setPhoneChange(data.phone);
        openSuccessModal("Details updated successfully!");
        toast.success("Details updated", {
          position: "top-right",
          style: {
            background: "#172340",
            color: "#fff",
            border: "1px solid #283d6f",
            borderRadius: "12px",
          },
        });
      } else {
        toast.error("Failed to update details", {
          position: "top-right",
          style: {
            background: "#450a0a",
            color: "#fff",
            border: "1px solid #7f1d1d",
            borderRadius: "12px",
          },
        });
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Update failed", {
        position: "top-right",
        style: {
          background: "#450a0a",
          color: "#fff",
          border: "1px solid #7f1d1d",
          borderRadius: "12px",
        },
      });
    }
    router.refresh();
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex gap-5 items-center bg-[#172340] rounded-lg px-5 py-2">
          <h1 className="text-2xl px-3 py-4 font-semibold">
            Change Restaurant Name:
          </h1>
          <input
            value={nameChange}
            onChange={(e) => setNameChange(e.target.value)}
            className="w-[30%] border border-gray-800 px-5 py-3 rounded-full bg-[#2f4880]"
            placeholder={restaurantData?.name || ""}
          />
          <button
            onClick={handleNameChange}
            className="my-3 px-5 py-3 bg-[#1c9cea] text-white font-semibold rounded-full"
          >
            Confirm
          </button>
        </div>

        <div className="flex flex-col w-full gap-5 bg-[#172340] px-5 py-3 rounded-lg">
          <h1 className="text-2xl px-3 py-4 font-semibold">Edit About Us Information</h1>
          <input
            value={descChange}
            onChange={(e) => setDescChange(e.target.value)}
            className="rounded-xl border px-5 py-3 border-gray-800 bg-[#2f4880]"
            placeholder="Write Introduction/Description (Max 1000 letters)"
          />
          <input
            value={aboutUsChange}
            onChange={(e) => setAboutUsChange(e.target.value)}
            className="rounded-xl border border-gray-800 px-5 py-3 bg-[#2f4880]"
            placeholder="Write About Us (Max 1000 letters)"
          />
          <input
            value={addressChange}
            onChange={(e) => setAddressChange(e.target.value)}
            className="rounded-xl border border-gray-800 px-5 py-3 bg-[#2f4880]"
            placeholder="Address"
          />
          <input
            value={phoneChange}
            onChange={(e) => setPhoneChange(e.target.value)}
            className="rounded-xl border border-gray-800 px-5 py-3 bg-[#2f4880]"
            placeholder="Phone"
          />
          <input
            value={cuisineChange}
            onChange={(e) => setCuisineChange(e.target.value)}
            className="rounded-xl border border-gray-800 px-5 py-3 bg-[#2f4880]"
            placeholder="Cuisine"
          />
          <div className="flex justify-between gap-10">
            <div className="basis-1/2 justify-center items-center flex flex-col gap-4">
              <h1>Opening Time</h1>
              <input
                type="time"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
                className="rounded-xl w-full border border-gray-800 px-5 py-3 bg-[#2f4880]"
                placeholder="Opening Timing"
              />
            </div>
            <div className="basis-1/2 flex flex-col justify-center items-center gap-4">
              <h1>Closing Time</h1>
              <input
                type="time"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
                className="rounded-xl w-full border border-gray-800 px-5 py-3 bg-[#2f4880]"
                placeholder="Closing Timing"
              />
            </div>
          </div>
          <div className="mx-8 flex items-center justify-end">
            <button
              onClick={handleDetailsChange}
              className="my-3 px-5 py-3 bg-[#1c9cea] text-white font-semibold rounded-full"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>

      {/* Headless UI Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => setIsModalOpen(false)}
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
              <Dialog.Panel className="inline-block w-full max-w-md p-6 my-20 overflow-hidden text-left align-middle transition-all transform bg-[#172340] text-white rounded-xl border border-gray-600 shadow-xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6"
                >
                  Success!
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm">{modalMessage}</p>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-[#1c9cea] border border-transparent rounded-md hover:bg-[#1375c8] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Page;
