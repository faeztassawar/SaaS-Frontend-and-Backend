"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import jerry from "@/app/template2/images/jerry.png";
import Header from "@/app/template2/components/Header";
import Footer from "@/app/template2/components/Footer";
import UserTabs from "@/app/template2/components/UserTabs";
import { useSession } from "next-auth/react";

const fetchUserProfile = async (email: string) => {
  try {
    console.log("EMAILLLLLLLLLLLLLLLLLL", email);
    const response = await fetch("/api/customerReservation", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      console.log("EMAILLLLLLLLLLLLLLLLLL no");
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { firstName: "", lastName: "", bookings: [] };
  }
};

const EditProfile = () => {
  const { data: session, status } = useSession({
    required: true,
  });

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [editFirstName, setEditFirstName] = useState<boolean>(false);
    const [editLastName, setEditLastName] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const getUserData = async () => {
        if (status === "authenticated" && session?.user?.email) {
          try {
            setEmail(session.user.email);
            const data = await fetchUserProfile(session.user.email);

            setFirstName(data.firstName || "");
            setLastName(data.lastName || "");
            
          } catch (error) {
            console.error("Error loading profile:", error);
          } finally {
            setIsLoading(false);
          }
        }
      };

      getUserData();
    }, [session, status]);

    const handleUpdateName = async (
      type: "firstName" | "lastName",
      value: string
    ) => {
      try {
        const response = await fetch("/api/updateCustomer", {
          method: "POST",
          body: JSON.stringify({
            email,
            type,
            value,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update customer name");
        }

        // Update the local state
        if (type === "firstName") {
          setFirstName(value);
          setEditFirstName(false);
        } else {
          setLastName(value);
          setEditLastName(false);
        }
      } catch (error) {
        console.error(`Error updating ${type}:`, error);
      }
    };

    if (status === "loading" || isLoading) {
      return <div className="text-white text-center">Loading...</div>;
    }

    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header rest_id={restaurant_id} rest_name={restaurant_name} />
        <div className="mt-8">
          <UserTabs isAdmin={true} rest_id={restaurant_id} />
        </div>

        <div className="flex-grow flex justify-center items-center mt-7">
          <div className="p-8 rounded-lg shadow-2xl w-1/3 bg-gray-100 mt-5">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Image
                  className="rounded full w-24 h-24  "
                  src={jerry}
                  alt="Profile Avatar"
                  width={100}
                  height={100}
                />
                <label className="absolute right-0 bottom-0">
                  <input type="file" className="hidden" />
                  <span className="block p-1 bg-gray-200 text-xs rounded-full cursor-pointer">
                    Edit
                  </span>
                </label>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="First and last name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="abc@gmail.com"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Phone number"
                />
              </div>

              <div>
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  id="street"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Street address"
                />
              </div>

              <div className="">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="City"
                />
              </div>

              <button
                type="submit"
                className="w-full p-3 bg-[#800000] text-white font-semibold rounded-lg"
              >
                Save
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  };
}


export default EditProfile;