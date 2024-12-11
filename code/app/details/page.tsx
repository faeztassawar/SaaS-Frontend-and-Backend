"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import T1Land from "../images/T1Land.png";
import T1Menu from "../images/T1Menu.png";
import T1Res from "../images/T1Res.png";
import T1Dash from "../images/T1Dash.png";
import T2Land from "../images/T2landing.png";
import T2Menu from "../images/T2menu.png";
import T2Cart from "../images/T2Cart.png";
import T2Admin from "../images/T2Admin.png";
import Link from "next/link";
import NavBar from "../components/NavBar";
import LogoTicker from "../components/LogoTicker";
import { useSession } from "next-auth/react";

const Details = () => {
  const searchParams = useSearchParams();
  const template = searchParams.get("template");
  const router = useRouter();
  const { data, status } = useSession();

  const createRestaurant = async (template: string) => {
    console.log("buying");
    console.log("fetching");

    const res = await fetch("/api/restaurant", {
      method: "POST",
      body: JSON.stringify({
        owner_email: data?.user?.email,
        name: "nique",
        about_us: "We serve delicious Food",
        desc: "Great ambiance and friendly staff.",
        timing: "9am - 9pm",
        tempModel: template,
        menu_id: "674a1329dbec3ac862e10deb",
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      console.log("success");
      router.push(`/restaurants/${data.restaurant_id}`);
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <NavBar />
      <div className="p-10 bg-[linear-gradient(to_bottom,#000,#200d42_34%,#4f21a1_65%,#a46edb_100%)] text-white min-h-screen flex flex-col items-center ">
        {template === "classic" ? (
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold">Classic Restaurant Details</h1>
            <div className="border px-10 py-10 border-[rgb(193,151,98)] rounded-3xl flex flex-col mt-12 w-full items-center shadow-[0_0_15px_5px] shadow-[rgb(193,151,98)]/50">
              <div>
                <Image
                  src={T1Land}
                  alt="Classic Restaurant"
                  width={900}
                  height={700}
                  className="rounded-xl"
                />
              </div>
              <div>
                <ul className="text-left text-lg sm:text-xl text-white/80 w-full mt-10 list-disc list-inside">
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero aut enim quos accusamus, voluptatibus, atque et{" "}
                  </li>
                  <li>Reservation system for easy table booking</li>
                  <li>Comprehensive menu management system</li>
                  <li>Admin dashboard for managing menus and reservations</li>
                  <li>User-friendly interface for customer engagement</li>
                </ul>
              </div>
            </div>
            <div className="border px-10 py-10 border-[rgb(193,151,98)] rounded-3xl flex flex-col mt-12 w-full items-center shadow-[0_0_15px_5px] shadow-[rgb(193,151,98)]/50">
              <div>
                <Image
                  src={T1Menu}
                  alt="Classic Restaurant"
                  width={900}
                  height={700}
                  className="rounded-xl"
                />
              </div>
              <div>
                <ul className="text-left text-lg sm:text-xl text-white/80 w-full mt-10 list-disc list-inside">
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero aut enim quos accusamus, voluptatibus, atque et{" "}
                  </li>
                  <li>Reservation system for easy table booking</li>
                  <li>Comprehensive menu management system</li>
                  <li>Admin dashboard for managing menus and reservations</li>
                  <li>User-friendly interface for customer engagement</li>
                </ul>
              </div>
            </div>
            <div className="border px-10 py-10 border-[rgb(193,151,98)] rounded-3xl flex flex-col mt-12 w-full items-center shadow-[0_0_15px_5px] shadow-[rgb(193,151,98)]/50">
              <div>
                <Image
                  src={T1Res}
                  alt="Classic Restaurant"
                  width={900}
                  height={700}
                  className="rounded-xl"
                />
              </div>
              <div>
                <ul className="text-left text-lg sm:text-xl text-white/80 w-full mt-10 list-disc list-inside">
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero aut enim quos accusamus, voluptatibus, atque et{" "}
                  </li>
                  <li>Reservation system for easy table booking</li>
                  <li>Comprehensive menu management system</li>
                  <li>Admin dashboard for managing menus and reservations</li>
                  <li>User-friendly interface for customer engagement</li>
                </ul>
              </div>
            </div>
            <div className="border px-10 py-10 border-[rgb(193,151,98)] rounded-3xl flex flex-col mt-12 w-full items-center shadow-[0_0_15px_5px] shadow-[rgb(193,151,98)]/50">
              <div>
                <Image
                  src={T1Dash}
                  alt="Classic Restaurant"
                  width={900}
                  height={700}
                  className="rounded-xl"
                />
              </div>
              <div>
                <ul className="text-left text-lg sm:text-xl text-white/80 w-full mt-10 list-disc list-inside">
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero aut enim quos accusamus, voluptatibus, atque et{" "}
                  </li>
                  <li>Reservation system for easy table booking</li>
                  <li>Comprehensive menu management system</li>
                  <li>Admin dashboard for managing menus and reservations</li>
                  <li>User-friendly interface for customer engagement</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-5 mt-10">
              <Link
                href="/template1"
                target="_blank"
                className="px-5 py-3 text-black bg-white rounded-2xl hover:scale-110 transition-all duration-200"
              >
                Preview
              </Link>
              {status === "authenticated" ? (
                <button
                  onClick={() => createRestaurant("1")}
                  className="px-5 py-3 text-black bg-white rounded-2xl hover:scale-110 transition-all duration-200"
                >
                  Buy
                </button>
              ) : (
                ""
              )}

              <Link
                href="/"
                className="px-5 py-3 text-black bg-white rounded-2xl hover:scale-110 transition-all duration-200"
              >
                Go Back
              </Link>
            </div>
          </div>
        ) : template === "fastfood" ? (
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold py-10">
              Fast Food Restaurant Details
            </h1>
            <div className="border px-10 py-10 border-white rounded-3xl flex flex-col mt-12 w-full items-center shadow-[0_0_15px_5px] shadow-white/50">
              <div>
                <Image
                  src={T2Land}
                  alt="Fast Food Restaurant"
                  width={900}
                  height={700}
                  className="rounded-xl"
                />
              </div>
              <div>
                <ul className="text-left text-lg sm:text-xl text-white/80 w-full mt-10 list-disc list-inside">
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero aut enim quos accusamus, voluptatibus, atque et{" "}
                  </li>
                  <li>Reservation system for easy table booking</li>
                  <li>Comprehensive menu management system</li>
                  <li>Admin dashboard for managing menus and reservations</li>
                  <li>User-friendly interface for customer engagement</li>
                </ul>
              </div>
            </div>
            <div className="border px-10 py-10 border-white rounded-3xl flex flex-col mt-12 w-full items-center shadow-[0_0_15px_5px] shadow-white/50">
              <div>
                <Image
                  src={T2Menu}
                  alt="Fast Food Restaurant"
                  width={900}
                  height={700}
                  className="rounded-xl"
                />
              </div>
              <div>
                <ul className="text-left text-lg sm:text-xl text-white/80 w-full mt-10 list-disc list-inside">
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero aut enim quos accusamus, voluptatibus, atque et{" "}
                  </li>
                  <li>Reservation system for easy table booking</li>
                  <li>Comprehensive menu management system</li>
                  <li>Admin dashboard for managing menus and reservations</li>
                  <li>User-friendly interface for customer engagement</li>
                </ul>
              </div>
            </div>
            <div className="border px-10 py-10 border-white rounded-3xl flex flex-col mt-12 w-full items-center shadow-[0_0_15px_5px] shadow-white/50">
              <div>
                <Image
                  src={T2Cart}
                  alt="Fast Food Restaurant"
                  width={900}
                  height={700}
                  className="rounded-xl"
                />
              </div>
              <div>
                <ul className="text-left text-lg sm:text-xl text-white/80 w-full mt-10 list-disc list-inside">
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero aut enim quos accusamus, voluptatibus, atque et{" "}
                  </li>
                  <li>Reservation system for easy table booking</li>
                  <li>Comprehensive menu management system</li>
                  <li>Admin dashboard for managing menus and reservations</li>
                  <li>User-friendly interface for customer engagement</li>
                </ul>
              </div>
            </div>
            <div className="border px-10 py-10 border-white rounded-3xl flex flex-col mt-12 w-full items-center shadow-[0_0_15px_5px] shadow-white/50">
              <div>
                <Image
                  src={T2Admin}
                  alt="Fast Food Restaurant"
                  width={900}
                  height={700}
                  className="rounded-xl"
                />
              </div>
              <div>
                <ul className="text-left text-lg sm:text-xl text-white/80 w-full mt-10 list-disc list-inside">
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero aut enim quos accusamus, voluptatibus, atque et{" "}
                  </li>
                  <li>Reservation system for easy table booking</li>
                  <li>Comprehensive menu management system</li>
                  <li>Admin dashboard for managing menus and reservations</li>
                  <li>User-friendly interface for customer engagement</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-5 mt-10">
              <Link
                href="/template2"
                target="_blank"
                className="px-5 py-3 text-black bg-white rounded-2xl hover:scale-110 transition-all duration-200"
              >
                Preview
              </Link>
              <button
                onClick={() => createRestaurant("2")}
                className="px-5 py-3 text-black bg-white rounded-2xl hover:scale-110 transition-all duration-200"
              >
                Buy
              </button>
              <Link
                href="/"
                className="px-5 py-3 text-black bg-white rounded-2xl hover:scale-110 transition-all duration-200"
              >
                Go Back
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-2xl text-center">Loading...</p>
        )}
      </div>
      <LogoTicker />
    </div>
  );
};

export default Details;
