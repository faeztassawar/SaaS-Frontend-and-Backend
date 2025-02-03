"use client";
import { Restaurant } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

type settingProps = {
  restaurant_id: string;
};

const Page = ({ restaurant_id }: settingProps) => {
  const { data, status } = useSession();
  const router = useRouter();
  const [restaurantData, setRestaurantData] = useState<Restaurant>();
  const [nameChange, setNameChange] = useState(restaurantData?.name || "");
  const [descChange, setDescChange] = useState(restaurantData?.desc || "");
  const [openTime, setOpenTime] = useState(restaurantData?.opentiming || "");
  const [closeTime, setCloseTime] = useState(restaurantData?.closetiming || "");
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
        setOpenTime(data.opentime);
        setCloseTime(data.closetime);
        console.log(data);
      }
    };
    fetchRestaurant();
  }, [status, restaurant_id]);

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
          opentiming: openTime || restaurantData?.opentiming,
          closetiming: closeTime || restaurantData?.closetiming,
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
            await handleNameChange();
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
            <h1 className="">Closing Time</h1>
            <input
              type="time"
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              className="rounded-xl w-full border border-gray-800 px-5 py-3 bg-[#2f4880]"
              placeholder="Closing Timing"
            />
          </div>
        </div>
        <div className=" mx-8 flex items-center justify-end">
          <button
            onClick={async () => {
              await handleDetailsChange();
              router.refresh();
            }}
            className="my-3 px-5 py-3 bg-[#1c9cea] text-white font-semibold rounded-full"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
