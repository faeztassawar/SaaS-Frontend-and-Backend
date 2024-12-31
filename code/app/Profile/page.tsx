"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import NavBar from "@/app/components/NavBar";
import { TiUser } from "react-icons/ti";
import { IoRestaurantOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { GoMail } from "react-icons/go";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [restaurantData, setRestaurantData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [details, setDetails] = useState(true);
  const [link, setLink] = useState("");

  const router = useRouter();

  if (!session) {
    router.push("/");
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (status === "authenticated" && session?.user?.email) {
        const email = "aroobhamid123@gmail.com";
        console.log("Email hahahaha: ", email);
        console.log("Fetching URL:", `/api/session/saas/${session.user.email}`);

        try {
          const response = await fetch(
            `/api/session/saas/${session.user.email}`
          ); // Correct URL path
          if (response.ok) {
            const data = await response.json();
            setUserProfile(data);
            console.log("\nUSER PROFILE: ", userProfile, "\n");
            console.log("User Profile fetched successfully:", data);
          } else {
            console.error("Failed to fetch user profile.");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false); // Stop loading once data is fetched
        }
      } else {
        setLoading(false);
      }
    };
    const fetchRestaurant = async () => {
      console.log("USER PROFILE RESTAURANT ID: ", userProfile?.restaurant_id);
      const res = await fetch(`/api/restaurant/${userProfile?.restaurant_id}`);
      if (res.ok) {
        const data = await res.json();
        setRestaurantData(data);
        console.log("RESTAURANT FETCHED: ", restaurantData);
        setLink(`/restaurants/${restaurantData?.restaurant_id}`);
      } else {
        console.log("NO RESTAURANT!");
      }
    };

    fetchUserProfile();
    fetchRestaurant();
  }, [userProfile]); // Re-run effect when session or status changes

  return (
    <div className="min-h-screen w-screen bg-black bg-gradient-to-b from-black to-[#5d2ca8]/50 text-white">
      <NavBar />
      <div className="flex gap-10 py-16 flex-col items-center">
        <h1 className="text-5xl sm:text-7xl font-bold mt-12">Profile</h1>
        <div className="rounded-2xl flex h-[680px] w-[80%] bg-[#131313]">
          <div className="basis-1/4 px-4 items-center text-xl font-bold flex flex-col gap-3">
            <div className="flex gap-3 py-6 border-b border-gray-700 w-full items-center justify-center">
              <FaCircleUser />
              {/* <h1 className="text-3xl py-5">{userName ? `${userName}'s Profile` : "User Profile"}</h1> */}{" "}
              {/* Dynamically show the user's name */}
            </div>
            <div
              onClick={() => setDetails(true)}
              className={`border-b rounded-xl cursor-pointer ${
                details === true ? "bg-[#1f1f1f]" : "hover:bg-[#1f1f1f]"
              } border-gray-600 border-spacing-3 flex justify-center gap-3 items-center text-lg w-full text-center py-8`}
            >
              <TiUser />
              Details
            </div>
          </div>
          <div className="basis-3/4 bg-black rounded-2xl px-4 py-6">
            <div className="flex flex-col p-6">
              <div className="flex flex-col gap-10">
                <div className="flex justify-start items-center py-10">
                  <div className="basis-1/2">
                    <h1 className="text-4xl font-bold">Name</h1>
                    <h3 className="text-xl py-3 pl-1 text-white/80">
                      {userProfile?.name}
                    </h3>
                  </div>
                  <div
                    className="basis-1/2
                  "
                  >
                    <h1 className="text-4xl font-bold">Email</h1>
                    <h3 className="text-xl py-3 pl-1 text-white/80">
                      {userProfile?.email}
                    </h3>
                  </div>
                </div>

                <div>
                  <h1 className="text-4xl font-bold">Payment Method</h1>
                  <div className="flex items-center justify-between mt-2 p-4 bg-[#2f2f2f] rounded-lg">
                    <h1 className="text-2xl text-white/80">Stripe</h1>
                    <button className="px-5 py-2 rounded-full text-black bg-white hover:scale-110 transition-all duration-200">
                      Add Payment Method
                    </button>
                  </div>
                </div> 
                
                {userProfile?.restaurant_id ? (
                  <div className="flex flex-col gap-10 w-full">
                    <h1 className="text-4xl font-bold">Your Restaurant</h1>
                    <div className="flex flex-col w-full overflow-hidden">
                      <div>
                        <div className="flex justify-center bg-[#2f2f2f] text-lg font-semibold py-3 px-4 rounded-t-lg">
                        <div className="basis-1/2 text-center text-xl py-4 px-3">
                            Restaurant ID
                          </div>
                          <div className="basis-1/2 text-center text-xl py-4 px-3">
                            Restaurant Name
                          </div>
                          <div className="basis-1/2 text-center text-xl py-4 px-3">
                            Template
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between bg-[#1f1f1f] py-4 px-4 transition-colors hover:bg-[#3f3f3f]">
                        <div className="px-3 basis-1/2 text-center text-xl font-semibold">
                            {restaurantData?.restaurant_id}
                          </div>
                          <div className="px-3 basis-1/2 text-center text-xl font-semibold">
                            {restaurantData?.name}
                          </div>
                          <div className="px-3 basis-1/2 text-center text-xl font-semibold">
                            {restaurantData?.cuisine}
                          </div>
                          
                        </div>
                      </div>
                      <div>
                        {restaurantData ? (
                          <div className="flex items-center justify-center">
                            <Link
                              href={link}
                              className="hover:scale-110 transition-all text-white text-lg px-5 my-4 py-2 bg-[#5d2ca8] rounded-full tex"
                            >
                              Go To Restaurant
                            </Link>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      {/* Add more restaurant rows as needed */}
                    </div>
                  </div>
                ) : (
                  <div className="text-3xl text-extrabold flex justify-center py-10">
                    No Restaurant
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
