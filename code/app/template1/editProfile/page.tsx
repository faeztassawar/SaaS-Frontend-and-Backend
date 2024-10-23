"use client";
import React, { useState } from "react";
import Image from "next/image";
import bgImage from "@/app/template1/images/Profile.png";
import { FaCircleUser } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { Target } from "lucide-react";
import NavBar from "../components/NavBar";
import Link from "next/link";

const EditProfile = () => {
  const [firstName, setFirstName] = useState("Talha");
  const [lastName, setLastName] = useState("Bilal");
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [bookings, setBookings] = useState([1]);

  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const email = "bsef21m515@pucit.edu.pk";

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
              <h1 className="px-6 text-3xl">Last Name</h1>
              {editLastName == true ? (
                <div className="flex items-center mt-4 gap-2">
                  <input
                    onChange={handleLastName}
                    className="p-2 mt-2 mx-5 w-full rounded bg-[#1f1f1f] text-white border border-[#333] focus:outline-none"
                    type="text"
                    placeholder="Enter your Last name"
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
            {bookings.length != 0 ? (
              <div className="p-2 bg-[#1f1f1f] rounded flex-col justify-between items-center border border-[#333]">
                {bookings.map((item, index) => (
                  <div className=" px-5 my-2 flex items-center justify-between">
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

  // return (
  //   <div className="relative h-screen w-screen font-chillax">
  //     {/* Background Image */}
  //     <Image
  //       className="absolute top-0 left-0 object-cover w-full h-full brightness-[25%] z-0" // Added z-index to ensure layering
  //       src={bgImage}
  //       fill
  //       alt="Background"
  //     />

  //     {/* Profile and Form Layout */}
  //     <div className="relative flex items-start justify-center h-full z-10 p-10">
  //       {/* Profile Icon */}
  //       <div className="flex flex-col items-center pr-8">
  //         <FaCircleUser size={120} color="grey" className="mb-4" />
  //         <CiEdit className="text-[#F18608] cursor-pointer" size={24} />
  //       </div>

  //       {/* Form Section */}
  //       <div className="bg-[#101010]/90 text-white flex flex-col p-10 rounded-xl w-[60%] max-w-4xl shadow-lg">
  //         {/* Personal Information Header */}
  //         <div className="text-[#E8B97C] font-semibold flex justify-between mb-4 text-5xl font-rose">
  //           <h2>
  //           Personal Information
  //           </h2>

  //           <Link href="/template1" className="
  //           text-3xl
  //           ">X</Link>
  //         </div>

  //         <div className="flex flex-col gap-6">
  //           {/* First Name and Last Name */}
  //           <div className="flex justify-between">
  //             <div className="flex flex-col">
  //             <label className="block mb-2 text-2xl font-[900]">
  //               First Name
  //             </label>
  //             <div className="relative">
  //               {editFirstName == true ? (
  //                 <div
  //                   className="flex gap-2
  //                 "
  //                 >
  //                   <input
  //                     onChange={handleFirstName}
  //                     className="p-2 w-full rounded bg-[#1f1f1f] text-white border border-[#333] focus:outline-none"
  //                     type="text"
  //                     placeholder="Enter your first name"
  //                   />
  //                   <button
  //                     className="bg-[#1f1f1f] rounded-full px-3 py-2"
  //                     onClick={() => setEditFirstName(false)}
  //                   >
  //                     Save
  //                   </button>
  //                 </div>
  //               ) : (
  //                 <div>
  //                   <div className="mt-4 text-2xl font-[500]">{firstName}</div>
  //                   <CiEdit
  //                     onClick={() => setEditFirstName(true)}
  //                     className="absolute top-3 right-3 text-[#F18608] cursor-pointer"
  //                     size={18}
  //                   />
  //                 </div>
  //               )}
  //             </div>
  //             <div className="flex flex-col">
  //             <label className="block mb-2 text-2xl font-[900]">
  //               Last Name
  //             </label>
  //             <div className="relative">
  //               {editLastName == true ? (
  //                 <div className="flex gap-2">
  //                   <input
  //                     onChange={handleLastName}
  //                     className="p-2 w-full rounded bg-[#1f1f1f] text-white border border-[#333] focus:outline-none"
  //                     type="text"
  //                     placeholder="Enter your last name"
  //                   />
  //                   <button
  //                     className="bg-[#1f1f1f] rounded-full px-3 py-2"
  //                     onClick={() => setEditLastName(false)}
  //                   >
  //                     Save
  //                   </button>
  //                 </div>
  //               ) : (
  //                 <div>
  //                   <div className="mt-4 text-2xl font-[500]">{lastName}</div>
  //                   <CiEdit
  //                     onClick={() => setEditLastName(true)}
  //                     className="absolute top-3 right-3 text-[#F18608] cursor-pointer"
  //                     size={18}
  //                   />
  //                 </div>
  //               )}
  //             </div>

  //             </div>
  //           </div>
  //           <div>

  //             </div>
  //           </div>
  //           {/* Email and Contact */}
  //           <div className="flex flex-col my-4">
  //             <label className="block mb-2 text-3xl py-5">Email</label>
  //             <div className="relative text-xl">{email}</div>
  //           </div>

  //           {/* Bookings */}
  //           <div className="col-span-2">
  //             <label className="block text-3xl py-4">Your Bookings</label>
  //             {bookings.length != 0 ? (
  //               <div className="p-2 bg-[#1f1f1f] rounded flex-col justify-between items-center border border-[#333]">
  //                 {bookings.map((item, index) => (
  //                   <div className="my-2">
  //                     <div>Booking Number {item}</div>
  //                   </div>
  //                 ))}
  //               </div>
  //             ) : (
  //               <div className="text-center font-[500] text-2xl">You have no bookings</div>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default EditProfile;
