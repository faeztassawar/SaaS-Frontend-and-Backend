"use client"; // Ensure this is at the very top

import React, { useEffect, useState } from "react";
import Header from "@/app/template2/components/Header";
import Footer from "@/app/template2/components/Footer";
import UserTabs from "@/app/template2/components/UserTabs";
import { useSession } from "next-auth/react";
import { Order } from "@prisma/client";

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
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
    };
  }
};
const getOrderStatusColor = (status: string) => {
  if (status === "PENDING") return "bg-blue-500 text-white"; // Blue for pending
  if (status === "ACCEPTED") return "bg-green-500 text-white"; // Green for accepted
  if (status === "CANCELLED") return "bg-red-500 text-white"; // Red for cancelled
  return "bg-gray-500 text-white"; // Default for other statuses
};
interface EditProfileProps {
  restaurant_id: string;
}

const EditProfile = ({ restaurant_id }: EditProfileProps) => {
  const { data: session, status } = useSession({
    required: true,
  });

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>();
  const [isAdmin, setAdmin] = useState<Boolean>();
  const [editFirstName, setEditFirstName] = useState<boolean>(false);
  const [editLastName, setEditLastName] = useState<boolean>(false);
  const [editPhone, setEditPhone] = useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<boolean>(false);
  const [editCity, setEditCity] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const email = session?.user?.email;
      if (email) {
        try {
          const response = await fetch(`/api/session/restaurant/${email}`);
          const jsonData = await response.json();
          setAdmin(jsonData?.isAdmin);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };
    const getUserData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          setEmail(session.user.email);
          setIsLoading(true);
          const data = await fetchUserProfile(session.user.email);

          // Set the values directly from the fetched data
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
    const getOrder = async () => {
      const orderDetails = await fetch(
        `/api/orders/?email=${session?.user?.email}`
      );
      const data = await orderDetails.json();
      if (orderDetails.ok) {
        setOrders(data);
        console.log("Orders", data);
      } else {
        console.log("Error Fetching Orders");
      }
    };
    getOrder();
    getUserData();
    fetchData();
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
      <Header
        isAdmin={isAdmin as boolean}
        rest_name="Profile"
        rest_id={restaurant_id}
      />
      {isAdmin ? (
        <div className="mt-8">
          <UserTabs restaurant_id={restaurant_id} />
        </div>
      ) : (
        <></>
      )}

      <div className="flex-grow flex justify-center items-center mt-7">
        <div className="p-8 rounded-lg shadow-2xl w-1/3 bg-gray-100 mt-5">
          <form className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Full Name
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="name"
                  value={firstName} // Show the actual value
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
                  className="ml-2 p-2 bg-[#800000] text-white rounded"
                >
                  {editFirstName ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Last Name
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
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
                  className="ml-2 p-2 bg-[#800000] text-white rounded"
                >
                  {editLastName ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <div className="flex">
                <input
                  type="tel"
                  id="phone"
                  value={phone} // Show the actual value
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
                  className="ml-2 p-2 bg-[#800000] text-white rounded"
                >
                  {editPhone ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Address
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="address"
                  value={address} // Show the actual value
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
                  className="ml-2 p-2 bg-[#800000] text-white rounded"
                >
                  {editAddress ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                City
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="city"
                  value={city} // Show the actual value
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
                  className="ml-2 p-2 bg-[#800000] text-white rounded"
                >
                  {editCity ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <h3 className="font-bold text-lg">Orders</h3>
            <div className="mt-4">
              {orders?.map((order, index) => (
                <div
                  key={order.id}
                  className="flex justify-between items-center py-3 px-4 mb-3 rounded-lg shadow-md border border-gray-300 bg-white"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-700">
                      Order: {index + 1}
                    </h4>
                  </div>
                  <div
                    className={`font-semibold px-3 py-1 rounded-full ${getOrderStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer restaurant_id={restaurant_id} />
    </div>
  );
};

export default EditProfile;
