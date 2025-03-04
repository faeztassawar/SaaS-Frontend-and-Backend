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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header rest_id={restaurant_id} rest_name="Settings" />
      <div className="mt-8">
        <UserTabs restaurant_id={restaurant_id} />
      </div>

      {/* Restaurant Name Update */}
      <div className="max-w-3xl bg-white rounded-lg shadow-md p-6 mx-auto mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Change Restaurant Name
        </h2>
        <div className="flex items-center gap-4">
          <input
            value={nameChange}
            onChange={(e) => setNameChange(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            placeholder="Enter new name"
          />
          <button
            onClick={handleNameChange}
            className="px-5 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>

      {/* About & Details Section */}
      <div className="max-w-3xl bg-white rounded-lg shadow-md p-6 mx-auto mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Edit About Us Information
        </h2>

        <div className="space-y-4">
          <textarea
            value={descChange}
            onChange={(e) => setDescChange(e.target.value)}
            className="w-full h-24 border border-gray-300 px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            placeholder="Write Introduction/Description"
          />

          <textarea
            value={aboutUsChange}
            onChange={(e) => setAboutUsChange(e.target.value)}
            className="w-full h-24 border border-gray-300 px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            placeholder="Write About Us"
          />

          <input
            value={cuisineChange}
            onChange={(e) => setCuisineChange(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            placeholder="Cuisine"
          />

          {/* Opening & Closing Times */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-semibold mb-2">
                Opening Time
              </label>
              <input
                type="time"
                value={opentime}
                onChange={(e) => setOpenTime(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-semibold mb-2">
                Closing Time
              </label>
              <input
                type="time"
                value={closetime}
                onChange={(e) => setCloseTime(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleDetailsChange}
            className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
