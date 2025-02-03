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
    const response = await fetch("/api/customerReservation", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { firstName: "", lastName: "", email: "", phone: "", address: "", city: "" };
  }
};

const EditProfile = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  
  const [editFirstName, setEditFirstName] = useState<boolean>(false);
  const [editLastName, setEditLastName] = useState<boolean>(false);
  const [editPhone, setEditPhone] = useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<boolean>(false);
  const [editCity, setEditCity] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          setEmail(session.user.email);
          const data = await fetchUserProfile(session.user.email);

          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setPhone(data.phone || "");
          setAddress(data.address || "");
          setCity(data.city || "");
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
    type: "firstName" | "lastName" | "phone" | "address" | "city",
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
        throw new Error("Failed to update customer information");
      }

      // Update the local state
      if (type === "firstName") {
        setFirstName(value);
        setEditFirstName(false);
      } else if (type === "lastName") {
        setLastName(value);
        setEditLastName(false);
      } else if (type === "phone") {
        setPhone(value);
        setEditPhone(false);
      } else if (type === "address") {
        setAddress(value);
        setEditAddress(false);
      } else if (type === "city") {
        setCity(value);
        setEditCity(false);
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
      <Header isAdmin={true} />
      <div className="mt-8">
        <UserTabs isAdmin={true} rest_id={" "} />
      </div>

      <div className="flex-grow flex justify-center items-center mt-7">
        <div className="p-8 rounded-lg shadow-2xl w-1/3 bg-gray-100 mt-5">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Image
                className="rounded full w-24 h-24"
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
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="name"
                  value={editFirstName ? firstName : ""}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="First and last name"
                  disabled={!editFirstName}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (editFirstName) {
                      handleUpdateName("firstName", firstName);
                    }
                    setEditFirstName(!editFirstName);
                  }}
                  className="ml-2 p-2 bg-blue-500 text-white rounded"
                >
                  {editFirstName ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="lastName"
                  value={editLastName ? lastName : ""}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Last name"
                  disabled={!editLastName}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (editLastName) {
                      handleUpdateName("lastName", lastName);
                    }
                    setEditLastName(!editLastName);
                  }}
                  className="ml-2 p-2 bg-blue-500 text-white rounded"
                >
                  {editLastName ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <div className="flex">
                <input
                  type="tel"
                  id="phone"
                  value={editPhone ? phone : ""}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Phone number"
                  disabled={!editPhone}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (editPhone) {
                      handleUpdateName("phone", phone);
                    }
                    setEditPhone(!editPhone);
                  }}
                  className="ml-2 p-2 bg-blue-500 text-white rounded"
                >
                  {editPhone ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="address"
                  value={editAddress ? address : ""}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Street address"
                  disabled={!editAddress}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (editAddress) {
                      handleUpdateName("address", address);
                    }
                    setEditAddress(!editAddress);
                  }}
                  className="ml-2 p-2 bg-blue-500 text-white rounded"
                >
                  {editAddress ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="city"
                  value={editCity ? city : ""}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="City"
                  disabled={!editCity}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (editCity) {
                      handleUpdateName("city", city);
                    }
                    setEditCity(!editCity);
                  }}
                  className="ml-2 p-2 bg-blue-500 text-white rounded"
                >
                  {editCity ? "Save" : "Edit"}
                </button>
              </div>
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

export default EditProfile;
