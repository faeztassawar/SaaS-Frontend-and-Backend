"use client";
import NavBar from "@/app/components/NavBar";
import React, { useState } from "react";
import { TiUser } from "react-icons/ti";
import { IoRestaurantOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import Clients from "@/app/components/Clients";
import TemplatesData from "@/app/components/TemplatesData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const [details, setDetails] = useState(true);
  if (
    status !== "authenticated" ||
    data.user?.email !== "dinedesign.4@gmail.com"
  ) {
    router.push("/");
  }

  return (
    <div className="min-h-screen w-screen bg-black bg-gradient-to-b from-black to-[#5d2ca8]/50 text-white">
      <NavBar />
      <div className="flex gap-10 py-16 flex-col items-center">
        <h1 className="text-5xl sm:text-7xl font-bold mt-12">
          Admin Dashboard
        </h1>
        <div className="rounded-2xl flex h-[680px] w-[80%] bg-[#131313]">
          <div className="basis-1/4 px-4 items-center text-xl font-bold flex flex-col gap-3">
            <div className="flex gap-3 py-6 border-b border-gray-700 w-full items-center justify-center">
              <FaCircleUser />
              <h1 className="text-3xl py-5">Dashboard</h1>
            </div>
            <div
              onClick={() => setDetails(true)}
              className={`border-b rounded-xl cursor-pointer ${
                details ? "bg-[#1f1f1f]" : "hover:bg-[#1f1f1f]"
              } border-gray-600 flex justify-center gap-3 items-center text-lg w-full py-4`}
            >
              <TiUser />
              Users
            </div>
            
          </div>
          <div className="basis-3/4 bg-black rounded-2xl px-4 py-6 overflow-hidden">
            {details === true ? <Clients /> :<></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
