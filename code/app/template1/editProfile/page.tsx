"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import bgImage from "@/app/template1/images/Profile.png";
import { FaCircleUser } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { Target } from "lucide-react";
import NavBar from "../components/NavBar";
import Link from "next/link";

// Function to fetch user profile data from API
const fetchUserProfile = async () => {
  const response = await fetch("/restaurant/userProfile");
  if (response.ok) {
    return response.json(); // assuming the API returns a JSON object with user data
  } else {
    console.error("Failed to fetch user profile");
    return null;
  }
};

const EditProfile = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [bookings, setBookings] = useState<number[]>([]);
  
  // Fetch user profile data from API
  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchUserProfile();
      if (data) {
        setFirstName(data.firstName); // Assume API response contains firstName
        setLastName(data.lastName);   // Assume API response contains lastName
        setEmail(data.email);         // Assume API response contains email
        setBookings(data.bookings);   // Assume API response contains bookings array
      }
    };
    getUserData();
  }, []); // Empty dependency array ensures the data is fetched once on mount

  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  
  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  return (
    <div className="relative h-screen w-screen overflow-y-auto">
      {/* Background Image */}
      <Image
        className="absolute object-center brightness-[25%]"
        src={bgImage}
        fill
        alt="Background"
      />

      {/* Content on top of image */}
      <div className="relative z-10 flex items-center justify-center h-screen w-screen">
        <div className="text-white bg-[#101010]/90 w-[90%] flex flex-col gap-5">
          <div className="flex items-center justify-between font-rose m-5 p-5 text-[#E8B97C]">
            <h1 className="text-6xl">Personal Information</h1>
            <h1 className="text-6xl">
              {" "}
              <Link href="/template1">X</Link>{" "}
            </h1>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-2">
            <div className="basis-1/2 m-4 flex flex-col font-chillax">
              <h1 className="px-6 text-3xl font-[900]">First Name</h1>
              {editFirstName == true ? (
                <div className="flex items-center mt-4 gap-2">
                  <input
                    onChange={handleFirstName}
                    className="p-2 mt-2 mx-5 w-full rounded bg-[#1f1f1f] text-white border border-[#333] focus:outline-none"
                    type="text"
                    placeholder="Enter your First name"
                    value={firstName}
                  />
                  <button
                    className="bg-[#1f1f1f] rounded-full px-3 py-2"
                    onClick={() => setEditFirstName(false)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between px-5">
                  <div className="mt-4 px-2 text-2xl font-[500]">{firstName}</div>
                  <CiEdit
                    onClick={() => setEditFirstName(true)}
                    className="text-3xl text-[#F18608] cursor-pointer"
                    size={18}
                  />
                </div>
              )}
            </div>
            <div className="basis-1/2 m-4 flex flex-col font-chillax">
              <h1 className="px-6 text-3xl">Last Name</h1>
              {editLastName == true ? (
                <div className="flex items-center mt-4 gap-2">
                  <input
                    onChange={handleLastName}
                    className="p-2 mt-2 mx-5 w-full rounded bg-[#1f1f1f] text-white border border-[#333] focus:outline-none"
                    type="text"
                    placeholder="Enter your Last name"
                    value={lastName}
                  />
                  <button
                    className="bg-[#1f1f1f] rounded-full px-3 py-2"
                    onClick={() => setEditLastName(false)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between px-5">
                  <div className="mt-4 px-2 text-2xl font-[500]">{lastName}</div>
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
            {bookings.length != 0 ? (
              <div className="p-2 bg-[#1f1f1f] rounded flex-col justify-between items-center border border-[#333]">
                {bookings.map((item, index) => (
                  <div className=" px-5 my-2 flex items-center justify-between" key={index}>
                    <div>Table Number {item}</div>
                    <h1>Date</h1>
                    <h1>Timing</h1>
                    <button
                      onClick={() => setBookings([])}
                      className="px-5 py-2 bg-red-800 rounded-xl"
                    >
                      Cancel
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
