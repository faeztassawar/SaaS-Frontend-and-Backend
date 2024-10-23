import React from "react";
import logo from "@/app/images/SLogo.png";
import logos from "@/app/images/downloadlogo.png";
import Image from "next/image";
import { TfiMenu } from "react-icons/tfi";
import Link from "next/link";

const NavBar = () => {
  let user = "loggedin";
  return (
    <div className="flex items-center text-white justify-between bg-black py-3 px-4">
      <div className="relative">
        <div className="absolute w-full top-2 bottom-2 bg-blue-500 blur-md"></div>
        <Link href="/LandingPage">
          <Image
            src={logos}
            alt=""
            className="text-white h-12 w-12 rounded-lg relative bg-black bg-opacity-80"
          />
        </Link>
      </div>
      <div className="border hover:cursor-pointer border-white border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden">
        <TfiMenu />
      </div>
      <div className="sm:flex gap-6 px-4 items-center hidden">
        <Link
          href=""
          className="text-white text-opacity-60  hover:text-opacity-100"
        >
          About Us
        </Link>
        <Link
          href=""
          className="text-white text-opacity-60 hover:text-opacity-100"
        >
          Contact
        </Link>
        <Link
          href="/LandingPage/Profile"
          className="px-5 py-3 bg-white text-black rounded-full"
        >
          {user === "loggedin" ? <h1>Profile</h1> : <h1>Login</h1>}
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
