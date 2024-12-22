"use client";

import { useSession } from "next-auth/react"; 
import React, { useState, useEffect } from "react";
import NavBar from "@/app/components/NavBar"; 
import { TiUser } from "react-icons/ti";
import { IoRestaurantOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { GoMail } from "react-icons/go";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [userProfile, setUserProfile] = useState<any>(null); 
  const [loading, setLoading] = useState<boolean>(true); 
   const [details, setDetails] = useState(true);
  
  

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (status === "authenticated" && session?.user?.email) {
        const email = "aroobhamid123@gmail.com";  
        console.log("Email hahahaha: ", email); 
        console.log("Fetching URL:", `/api/user/Profile/${session.user.email}`);

        try {
          const response = await fetch(`/api/user/Profile/${session.user.email}`); // Correct URL path
          if (response.ok) {
            const data = await response.json();
            setUserProfile(data); 
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

    fetchUserProfile();
  }, [session, status]); // Re-run effect when session or status changes

  return (
    <div className="min-h-screen w-screen bg-black bg-gradient-to-b from-black to-[#5d2ca8]/50 text-white">
      <NavBar />
      <div className="flex gap-10 py-16 flex-col items-center">
        <h1 className="text-5xl sm:text-7xl font-bold mt-12">Profile</h1>
        <div className="rounded-2xl flex h-[680px] w-[80%] bg-[#131313]">
          <div className="basis-1/4 px-4 items-center text-xl font-bold flex flex-col gap-3">
            <div className="flex gap-3 py-6 border-b border-gray-700 w-full items-center justify-center">
              <FaCircleUser />
            {/* <h1 className="text-3xl py-5">{userName ? `${userName}'s Profile` : "User Profile"}</h1> */} {/* Dynamically show the user's name */}
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
            <div
              onClick={() => setDetails(false)}
              className={`border-b rounded-xl cursor-pointer ${
                details === false ? "bg-[#1f1f1f]" : "hover:bg-[#1f1f1f]"
              } border-gray-600 border-spacing-3 flex justify-center gap-3 items-center text-lg w-full text-center py-8`}
            >
              <IoRestaurantOutline />
              Your Restaurants
            </div>
          </div>
          <div className="basis-3/4 bg-black rounded-2xl px-4 py-6">
            {details === true ? (
              <div className="flex flex-col p-6">
                <div className="flex flex-col gap-6">
                  <div>
                    <h1 className="text-4xl font-bold">Email</h1>
                    <h3 className="text-lg py-3 text-white/80">sdadsds@gmail.com</h3>
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
                </div>
              </div>
            ) : (
              <div className="flex flex-col p-6">
                <div className="flex flex-col gap-3 w-full">
                  <h1 className="text-4xl font-bold">Restaurants</h1>
                  <div className="flex flex-col w-full overflow-hidden">
                    <div className="flex justify-between bg-[#2f2f2f] text-lg font-semibold py-3 px-4 rounded-t-lg">
                      <div className="basis-1/4">Restaurant ID</div>
                      <div className="basis-1/4">Restaurant Name</div>
                      <div className="basis-1/4">Template</div>
                      <div className="basis-1/4">Months</div>
                    </div>
                    <div className="flex justify-between bg-[#1f1f1f] py-4 px-4 transition-colors hover:bg-[#3f3f3f]">
                      <div className="basis-1/4 font-semibold">12345</div>
                      <div className="basis-1/4 font-semibold">Lezzetli.</div>
                      <div className="basis-1/4 font-semibold">Classic Style</div>
                      <div className="basis-1/4 font-semibold">4</div>
                    </div>
                    {/* Add more restaurant rows as needed */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;