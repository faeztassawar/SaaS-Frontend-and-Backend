"use client";

import { Restaurant } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type settingProps = {
  restaurant_id: string;
};

const page = ({ restaurant_id }: settingProps) => {
  const { data, status } = useSession();
  const [restaurantData, setRestaurantData] = useState<Restaurant>();
  const [dialogVisible, setDialogVisible] = useState(false); // Dialog visibility state
  const router = useRouter();
  useEffect(() => {
    const fetchRestaurant = async () => {
      console.log("USER PROFILE RESTAURANT ID: ", restaurant_id);
      const res = await fetch(`/api/restaurant/${restaurant_id}`);
      if (res.ok) {
        const data = await res.json();
        setRestaurantData(data);
        console.log("RESTAURANT FETCHED: ", restaurantData);
      } else {
        console.log("NO RESTAURANT!");
      }
    };
    fetchRestaurant();
  }, [status]);
  
  const [nameChange, setNameChange] = useState(restaurantData?.name || "");
  const [descChange, setDescChange] = useState(restaurantData?.desc || "");
  const [aboutUsChange, setAboutUsChange] = useState(
    restaurantData?.about_us || ""
  );

  const handleChange = async () => {
    console.log("Updating");
    const res = await fetch(
      `http://localhost:3000/api/restaurant/${restaurant_id}`,
      {
        method: "POST",
        body: JSON.stringify({
          name: nameChange !== "" ? nameChange : restaurantData?.name,
          about_us:
            aboutUsChange !== "" ? aboutUsChange : restaurantData?.about_us,
          desc: descChange !== "" ? descChange : restaurantData?.desc,
        }),
      }
    );
    if (res.ok) {
      const data = await res.json();
      console.log("Now: ", data);
      setNameChange(data.name);
      setDialogVisible(true); // Show the dialog
    }
    router.refresh();
  };

  const closeDialog = () => {
    setDialogVisible(false); // Hide the dialog
  };

  const timings = [
    {
      day: "Monday",
      Start: "5PM",
      End: "11PM",
    },
    {
      day: "Tue - Fri",
      Start: "4PM",
      End: "11PM",
    },
    {
      day: "Sat - Sun",
      Start: "6PM",
      End: "2AM",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-5 items-center bg-[#172340] rounded-lg px-5 py-2">
        <h1 className="text-2xl px-3 py-4 font-semibold">
          Change Restaurant Name:{" "}
        </h1>
        <input
          value={nameChange}
          onChange={(e) => setNameChange(e.target.value)}
          className="w-[30%] border border-gray-800 px-5 py-3 rounded-full bg-[#2f4880]"
          placeholder={restaurantData?.name || ""}
        />
        <button
          onClick={async () => {
            await handleChange();
            router.refresh();
          }}
          className="my-3 px-5 py-3 bg-[#1c9cea] text-white font-semibold rounded-full"
        >
          Confirm
        </button>
      </div>
      <div className="flex flex-col w-full gap-5 bg-[#172340] px-5 py-3 rounded-lg">
        <h1 className="text-2xl px-3 py-4 font-semibold">
          Edit About Us Information
        </h1>
        <input
          value={descChange}
          onChange={(e) => setDescChange(e.target.value)}
          className="rounded-xl border px-5 py-3 border-gray-800 bg-[#2f4880]"
          placeholder="Write Introduction/Description ( Max 1000 letters )"
        />
        <input
          value={aboutUsChange}
          onChange={(e) => setAboutUsChange(e.target.value)}
          className="rounded-xl border border-gray-800 px-5 py-3 bg-[#2f4880]"
          placeholder="Write About Us ( Max 1000 letters )"
        />
        <div className=" mx-8 flex items-center justify-end">
          <button
            onClick={async () => {
              await handleChange();
              router.refresh();
            }}
            className="my-3 px-5 py-3 bg-[#1c9cea] text-white font-semibold rounded-full"
          >
            Confirm
          </button>
        </div>
      </div>

      {dialogVisible && (
        <div className="fixed transition-all inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div
            className="bg-white w-[30%] p-8 rounded-lg shadow-lg relative animate-bounce-in"
            style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
          >
            <h2 className="text-2xl font-semibold text-center text-black mb-6">
              Data is Updated
            </h2>
            <div className="flex justify-center">
              <button
                onClick={closeDialog}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 hover:scale-110 transition-transform"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
