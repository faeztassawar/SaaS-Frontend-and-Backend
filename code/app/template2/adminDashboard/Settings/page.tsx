"use client";

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import UserTabs from "../../components/UserTabs";
import { useSession } from "next-auth/react";
import { Restaurant } from "@prisma/client";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

type settingProps = {
  restaurant_id: string;
};

const Settings = ({ restaurant_id }: settingProps) => {
  const { data, status } = useSession();
  const router = useRouter();
  const [restaurantData, setRestaurantData] = useState<Restaurant>();
  const [nameChange, setNameChange] = useState(restaurantData?.name || "");
  const [descChange, setDescChange] = useState(restaurantData?.desc || "");
  const [opentime, setOpenTime] = useState(restaurantData?.desc || "");
  const [closetime, setCloseTime] = useState(restaurantData?.desc || "");
  const [aboutUsChange, setAboutUsChange] = useState(
    restaurantData?.about_us || ""
  );
  const [cuisineChange, setCuisineChange] = useState(
    restaurantData?.cuisine || ""
  );

  useEffect(() => {
    const fetchRestaurant = async () => {
      const res = await fetch(`/api/restaurant/${restaurant_id}`);
      if (res.ok) {
        const data = await res.json();
        setRestaurantData(data);
        setNameChange(data.name);
        setDescChange(data.desc);
        setAboutUsChange(data.about_us);
        setCuisineChange(data.cuisine);
      }
    };
    fetchRestaurant();
  }, [status, restaurant_id, setNameChange, setDescChange, setAboutUsChange]);

  const showSuccessDialog = (message: string) => {
    Swal.fire({
      title: "Success!",
      text: message,
      icon: "success",
      background: "#172340",
      color: "#fff",
      confirmButtonColor: "#1c9cea",
      confirmButtonText: "OK",
      customClass: {
        popup: "rounded-xl border-gray-600",
        confirmButton: "rounded-full px-6 py-3",
      },
    });
  };

  const handleNameChange = async () => {
    try {
      const res = await fetch(`/api/restaurant/${restaurant_id}`, {
        method: "POST",
        body: JSON.stringify({
          name: nameChange || restaurantData?.name,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setNameChange(data.name);
        showSuccessDialog("Restaurant name updated successfully!");
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
          opentiming: opentime || restaurantData?.opentiming,
          closetiming: opentime || restaurantData?.closetiming,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setDescChange(data.desc);
        setAboutUsChange(data.about_us);
        setCuisineChange(data.cuisine);
        showSuccessDialog("Details updated successfully!");
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
    <div className="flex flex-col gap-8">
      <Header rest_id={restaurant_id} rest_name="Settings" />
      <UserTabs isAdmin={true} restaurant_id={restaurant_id} />

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
            await handleNameChange();
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
        <input
          value={cuisineChange}
          onChange={(e) => setCuisineChange(e.target.value)}
          className="rounded-xl border px-5 py-3 border-gray-800 bg-[#F0F0F0] h-24"
          placeholder="Cuisine"
        />
        <h1>Opening Time</h1>
        <input
          value={opentime}
          type="time"
          onChange={(e) => setOpenTime(e.target.value)}
          className="rounded-xl border px-5 py-3 border-gray-800 bg-[#F0F0F0] h-24"
          placeholder="Opening Timing"
        />
        <h1>Closing Time</h1>
        <input
          value={closetime}
          onChange={(e) => setCloseTime(e.target.value)}
          type="time"
          className="rounded-xl border px-5 py-3 border-gray-800 bg-[#F0F0F0] h-24"
          placeholder="Closing Timing"
        />
        <div className="flex justify-end">
          <button
            onClick={async () => {
              await handleDetailsChange();
              router.refresh();
            }}
            className="my-3 px-5 py-3 bg-[#800000] text-white font-semibold rounded-full"
          >
            Confirm
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
