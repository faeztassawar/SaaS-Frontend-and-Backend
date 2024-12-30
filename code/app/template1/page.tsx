"use client";

import Image from "next/image";
import bgImage from "@/app/template1/images/Landing.png";
import NavBar from "./components/NavBar";
import { useSession } from "next-auth/react";
import { Restaurant } from "@prisma/client";
import { useEffect, useState } from "react";

type RestaurantProps = {
  restaurant_id: string;
};

export default function Home({ restaurant_id }: RestaurantProps) {
  const [restaurantData, setRestaurantData] = useState<Restaurant>();
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
  });
  const { data, status } = useSession();
  console.log("EMAIL: ", data?.user?.email);
  if (typeof window !== "undefined") {
    document.cookie = `id=${restaurant_id};path=/; SameSite=Lax `;
  }
  console.log("RESTAURANT: ", restaurant_id);
  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      <Image
        className="absolute top-0 left-0 object-cover brightness-50 h-full w-full"
        src={bgImage}
        fill
        alt="Background"
        priority
      />

      <div className="relative z-10 flex items-center min-h-screen flex-col gap-10 justify-between py-[5vh]">
        <h1
          className="text-white text-2xl md:text-4xl font-chillax pt-[5vh]"
          style={{
            opacity: 0,
            animation: "fadeIn 1s forwards",
            animationDelay: "0s",
          }}
        >
          {restaurantData?.name ?? "-"}
        </h1>
        <div className="text-white flex gap-2 md:gap-7 flex-col justify-between items-center">
          <h2
            className="text-4xl md:text-7xl font-rose text-[#face8d]"
            style={{
              opacity: 0,
              animation: "fadeIn 1s forwards",
              animationDelay: "0.2s",
            }}
          >
            The pure of
          </h2>
          <h1
            className="text-6xl md:text-9xl font-[900] font-chillax"
            style={{
              opacity: 0,
              animation: "fadeIn 1s forwards",
              animationDelay: "0.4s",
            }}
          >
            {restaurantData?.cuisine}
          </h1>
          <span
            className="font-chillax flex flex-wrap w-[60%] md:w-[75%] text-xl md:text-3xl text-center mx-5"
            style={{
              opacity: 0,
              animation: "fadeIn 1s forwards",
              animationDelay: "0.6s",
            }}
          >
            {restaurantData?.about_us}
          </span>
        </div>

        <NavBar
          rest_id={
            restaurantData?.restaurant_id ? restaurantData?.restaurant_id : ""
          }
        />
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(
              20px
            ); /* Optional: adds a subtle upward movement */
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
