"use client";

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import UserTabs from "../../components/UserTabs";
import { useSession } from "next-auth/react";
import { Restaurant } from "@prisma/client";
import { useRouter } from "next/router";

type settingProps = {
  restaurant_id: string;
};

const Settings = ({ restaurant_id }: settingProps) => {
  const { data, status } = useSession();
  const [restaurantData, setRestaurantData] = useState<Restaurant>();
  const [dialogVisible, setDialogVisible] = useState(false); // Dialog visibility state

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

  const router = useRouter();
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
    <div className="flex flex-col gap-8">
      <Header rest_id={restaurant_id} rest_name="Settings" />
      <UserTabs isAdmin={true} />

      <div className="flex w-full max-w-3xl items-center bg-gray-50 rounded-lg px-5 py-4 mx-auto">
        <h1 className="text-2xl px-3 font-semibold">
          Change Restaurant Name:{" "}
        </h1>
        <input
          value={nameChange}
          onChange={(e) => setNameChange(e.target.value)}
          className="w-[40%] border border-gray-800 px-5 py-3 ml-4 rounded-full bg-[#FDFFF1]"
          placeholder={restaurantData?.name || ""}
        />
        <button
          onClick={async () => {
            await handleChange();
            router.refresh();
          }}
          className="ml-4 px-5 py-3 bg-[#800000] text-white font-semibold rounded-full"
        >
          Confirm
        </button>
      </div>

      <div className="flex flex-col w-full max-w-3xl gap-5 bg-[#FDFFF1] px-5 py-4 rounded-lg mx-auto">
        <h1 className="text-2xl px-3 font-semibold">
          Edit About Us Information
        </h1>
        <input
          value={descChange}
          onChange={(e) => setDescChange(e.target.value)}
          className="rounded-xl border px-5 py-3 border-gray-800 bg-[#F0F0F0] h-24"
          placeholder="Write Introduction/Description (Max 1000 characters)"
        />
        <input
          value={aboutUsChange}
          onChange={(e) => setAboutUsChange(e.target.value)}
          className="rounded-xl border px-5 py-3 border-gray-800 bg-[#F0F0F0] h-24"
          placeholder="Write About Us ( Max 1000 letters )"
        />
        <div className="flex justify-end">
          <button
            onClick={async () => {
              await handleChange();
              router.refresh();
            }}
            className="my-3 px-5 py-3 bg-[#800000] text-white font-semibold rounded-full"
          >
            Confirm
          </button>
        </div>
      </div>

      <div className="flex flex-col w-full max-w-3xl gap-5 bg-[#FDFFF1] px-5 py-4 rounded-lg mx-auto">
        <h1 className="text-2xl px-3 font-semibold">Timings</h1>
        <div className="flex flex-col items-center justify-center gap-4">
          {timings.map((item, index) => (
            <div key={index} className="flex w-full max-w-xl items-center">
              <div className="flex w-full justify-between items-center">
                <h1 className="text-xl">{item.day}</h1>
                <h1 className="text-xl">
                  {item.Start} - {item.End}
                </h1>
              </div>
              <div className="flex items-center justify-center ml-4">
                <button className="px-4 py-2 bg-[#800000] text-white rounded-full">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
