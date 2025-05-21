"use client";

import React, { useEffect, useState } from "react";
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
  const router = useRouter();
  const { data, status } = useSession();

  // Extract template from URL
  const templateParam = searchParams.get("template");
  const isSuccess = searchParams.get("success");
  const isCanceled = searchParams.get("canceled");

  // State to persist template ID
  const [templateId, setTemplateId] = useState<string | null>(null);

  // Set template ID when user first visits the page
  useEffect(() => {
    if (templateParam) {
      setTemplateId(templateParam === "classic" ? "1" : "2");
      sessionStorage.setItem(
        "templateId",
        templateParam === "classic" ? "1" : "2"
      );
    } else {
      // Retrieve from session storage if lost after redirection
      const storedTemplate = sessionStorage.getItem("templateId");
      if (storedTemplate) setTemplateId(storedTemplate);
    }
  }, [templateParam]);

  const handleBuy = async () => {
    try {
      const res = await fetch("/api/checkout", { method: "POST" });

      if (res.ok) {
        const { url } = await res.json();
        router.push(url); // Redirect to Stripe checkout
      } else {
        console.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  useEffect(() => {
    if (status !== "authenticated" || !templateId) return; // Ensure session & template ID exist

    const createRestaurant = async (templateId: string) => {
      console.log("Creating restaurant with template ID:", templateId);

      try {
        const res = await fetch("/api/restaurant", {
          method: "POST",
          body: JSON.stringify({
            owner_email: data?.user?.email,
            name: "Nique",
            about_us: "We serve delicious food",
            desc: "Great ambiance and friendly staff.",
            timing: "9am - 9pm",
            phone: "0333 5896242",
            tempModel: templateId,
          }),
        });

        if (res.ok) {
          const responseData = await res.json();
          console.log("Restaurant created successfully:", responseData);
          router.push(`/restaurants/${responseData.restaurant_id}`);
        } else if (res.status === 409) {
          console.log("This user already has a restaurant.");
          router.push("/");
        } else {
          console.error("Failed to create restaurant:", await res.text());
        }
      } catch (error) {
        console.error("Error creating restaurant:", error);
      }
    };

    if (isSuccess) {
      createRestaurant(templateId);
    } else if (isCanceled) {
      router.push("/");
    }
  }, [status, isSuccess, isCanceled, templateId, router, data?.user?.email]);

  return (
    <div className="w-full overflow-x-hidden">
      <NavBar />
      <div className="p-10 bg-[linear-gradient(to_bottom,#000,#200d42_34%,#4f21a1_65%,#a46edb_100%)] text-white min-h-screen flex flex-col items-center ">
        {templateParam === "classic" ? (
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold">Classic Restaurant Details</h1>
            <h2 className="text-2xl font-bold py-9">
              Only for $100 per Month Subscription
            </h2>
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
                    Clean and intuitive homepage layout with quick access to key
                    sections
                  </li>
                  <li>
                    Navigation bar includes Menu, Categories, About Us, and Book
                    a Table
                  </li>
                  <li>
                    Visually appealing design to capture user interest
                    immediately
                  </li>
                  <li>Call-to-action button for easy table booking</li>
                  <li>Seamless navigation to enhance user experience</li>
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
                    Organized display of food categories with items listed under
                    each
                  </li>
                  <li>Categories make browsing seamless for customers</li>
                  <li>
                    Each item includes name, description, and price for clarity
                  </li>
                  <li>Consistent left-side navigation same as Home Page</li>
                  <li>
                    Visually appealing and responsive layout for better user
                    interaction
                  </li>
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
                  <li>Interactive reservation form to easily book a table</li>
                  <li>Users can select date, time, and number of guests</li>
                  <li>Form validation to ensure accurate booking details</li>
                  <li>
                    Simple and clean interface for hassle-free reservations
                  </li>
                  <li>Instant feedback on booking submission status</li>
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
                    Centralized admin dashboard for managing the restaurant
                    system
                  </li>
                  <li>View, accept, or reject table reservation requests</li>
                  <li>
                    Sidebar navigation with links to various admin
                    functionalities
                  </li>
                  <li>
                    Dedicated pages for menu management, reservation control,
                    and analytics
                  </li>
                  <li>
                    Secure and structured layout for efficient admin operations
                  </li>
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
                  onClick={handleBuy}
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
        ) : templateParam === "fastfood" ? (
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold py-10">
              Fast Food Restaurant Details
            </h1>
            <h2 className="text-2xl font-bold py-07">
              Only for $100 per Month Subscription
            </h2>
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
                    Homepage with a top navigation bar including About Us,
                    Order, and Admin Dashboard
                  </li>
                  <li>Sleek design to direct users to key features quickly</li>
                  <li>Visually engaging layout with easy navigation</li>
                  <li>Clear entry points for customers and admins</li>
                  <li>
                    Responsive design ensuring smooth access across devices
                  </li>
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
                    Displays a wide variety of menu items organized by category
                  </li>
                  <li>Top navigation bar for consistent user experience</li>
                  <li>
                    Each item includes details like name, description, and price
                  </li>

                  <li>User-friendly layout for quick item discovery</li>
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
                    Cart displays selected items with quantity and price
                    breakdown
                  </li>
                  <li>Easy-to-edit cart for updating or removing items</li>
                  <li>
                    Checkout form collects customer details for order processing
                  </li>
                  <li>Real-time price calculation based on selected items</li>
                  <li>Simple form submission for orders</li>
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
                  <li>Admin dashboard to view and manage incoming orders</li>
                  <li>Accept or reject orders with a single click</li>
                  <li>Navigation bar for quick access to other admin tools</li>
                  <li>Real-time updates for efficient order processing</li>
                  <li>Interface to streamline administrative tasks</li>
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
                onClick={handleBuy}
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
