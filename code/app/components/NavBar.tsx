import React, { useEffect, useState } from "react";
import logos from "@/app/images/downloadlogo.png";
import Image from "next/image";
import { TfiMenu } from "react-icons/tfi";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const NavBar = () => {
  const { data, status } = useSession();
  const [check, setCheck] = useState();
  //console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/session/${data?.user?.email}`
      );
      const jsonData = await response.json();
      setCheck(jsonData);
    };

    fetchData();
  }, []);

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
        <div className="">
          {JSON.stringify(check, null, 2) && status == "authenticated" ? (
            <h1
              className="hover:cursor-pointer px-5 py-3 bg-white text-black rounded-full"
              onClick={() => signOut()}
            >
              Logout
            </h1>
          ) : (
            <h1
              className="hover:cursor-pointer px-5 py-3 bg-white text-black rounded-full"
              onClick={() => {
                {
                  signIn("google");
                  document.cookie = "redirected_via=owner";
                }
              }}
            >
              Login
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
