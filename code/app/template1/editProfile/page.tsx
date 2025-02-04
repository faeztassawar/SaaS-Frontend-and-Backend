"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";

interface Booking {
  id: string;
  date: string;
  time: string;
  status: string;
}

const fetchUserProfile = async (email: string) => {
  try {
    console.log("EMAIL", email);
    const response = await fetch("/api/customerReservation", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      console.log("EMAIL no");
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    // Filter out cancelled bookings before returning
    return {
      ...data,
      bookings: data.bookings?.filter((booking: Booking) => booking.status !== "CANCELLED") || []
    };
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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          setEmail(session.user.email);
          const data = await fetchUserProfile(session.user.email);

          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          // Only set non-cancelled bookings
          setBookings(data.bookings.filter((booking: Booking) => booking.status !== "CANCELLED"));
        } catch (error) {
          console.error("Error loading profile:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    getUserData();
  }, [session, status]);

  const handleUpdateName = async (type: "firstName" | "lastName", value: string) => {
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

  const handleCancelBooking = async (bookingId: string) => {
    const isConfirmed = window.confirm(
      "Are You Sure You Want To Delete This Reservation?"
    );

    if (!isConfirmed) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/cancelReservation', {
        method: 'POST',
        body: JSON.stringify({ bookingId }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Remove the cancelled booking from the state immediately
        setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
      } else {
        console.error('Failed to cancel booking');
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="relative h-screen w-screen overflow-y-auto">
      <div className="relative z-10 flex items-center justify-center h-screen w-screen">
        <div className="text-white bg-[#101010]/90 w-[90%] flex flex-col gap-5">
          <div className="flex items-center justify-between font-rose m-5 p-5 text-[#E8B97C]">
            <h1 className="text-6xl">Personal Information</h1>
            <h1 className="text-6xl">
              <Link href="/template1">X</Link>
            </h1>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-2">
            <div className="basis-1/2 m-4 flex flex-col font-chillax">
              <h1 className="px-6 text-3xl font-[900]">First Name</h1>
              {editFirstName ? (
                <div className="flex items-center mt-4 gap-2">
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    className="p-2 mt-2 mx-5 w-full rounded bg-[#1f1f1f] text-white border border-[#333] focus:outline-none"
                    type="text"
                    placeholder="Enter your First name"
                    value={firstName}
                  />
                  <button
                    className="bg-[#1f1f1f] rounded-full px-3 py-2"
                    onClick={() => handleUpdateName("firstName", firstName)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between px-5">
                  <div className="mt-4 px-2 text-2xl font-[500]">
                    {firstName}
                  </div>
                  <CiEdit
                    onClick={() => setEditFirstName(true)}
                    className="text-3xl text-[#F18608] cursor-pointer"
                    size={18}
                  />
                </div>
              )}
            </div>

            <div className="basis-1/2 m-4 flex flex-col font-chillax">
              <h1 className="px-6 text-3xl font-[900]">Last Name</h1>
              {editLastName ? (
                <div className="flex items-center mt-4 gap-2">
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    className="p-2 mt-2 mx-5 w-full rounded bg-[#1f1f1f] text-white border border-[#333] focus:outline-none"
                    type="text"
                    placeholder="Enter your Last name"
                    value={lastName}
                  />
                  <button
                    className="bg-[#1f1f1f] rounded-full px-3 py-2"
                    onClick={() => handleUpdateName("lastName", lastName)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between px-5">
                  <div className="mt-4 px-2 text-2xl font-[500]">
                    {lastName}
                  </div>
                  <CiEdit
                    onClick={() => setEditLastName(true)}
                    className="text-3xl text-[#F18608] cursor-pointer"
                    size={18}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex my-10 flex-col mx-5 gap-5 font-chillax">
            <h1 className="px-5 text-3xl font-[900]">Email</h1>
            <h1 className="px-5 text-2xl">{email}</h1>
          </div>

          <div className="flex my-10 flex-col mx-5 gap-5 font-chillax">
            <h1 className="px-5 text-3xl font-[900]">Your Booking</h1>
            {bookings.length > 0 ? (
              <div className="p-2 bg-[#1f1f1f] rounded flex-col justify-between items-center border border-[#333]">
                {bookings.map((item) => (
                  <div
                    className="px-5 my-2 flex items-center justify-between"
                    key={item.id}
                  >
                    <h1>{item.date}</h1>
                    <h1>{item.time}</h1>
                    <span
                      className={`${
                        item.status === 'DECLINED'
                          ? 'text-red-500'
                          : item.status === 'PENDING'
                            ? 'text-yellow-500'
                            : 'text-green-500'
                      }`}
                    >
                      {item.status}
                    </span>
                    <button
                      onClick={() => handleCancelBooking(item.id)}
                      className="px-5 py-2 bg-red-800 rounded-xl hover:bg-red-900 transition-colors"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Cancelling...' : 'Cancel'}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center font-[500] text-2xl">
                You have no bookings
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;