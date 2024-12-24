import React, { useEffect, useState } from "react";
import logos from "@/app/images/downloadlogo.png";
import Image from "next/image";
import { TfiMenu } from "react-icons/tfi";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

type RestaurantOwner = {
  id: String | null;
  name: String | null;
  email: String | null;
  userId: String | null;
  restaurant_id: String | null;
};

const NavBar = () => {
  const { data, status } = useSession();
  const [allowed, setAllowed] = useState(false);
  //console.log(data);
  console.log("DATA:", data?.user?.email);
  console.log("STATUS:", status);

  useEffect(() => {
    const fetchData = async () => {
      const email = data?.user?.email;
      console.log("CLIENT EMAIL: ", email);
      const response = await fetch(`/api/session/saas/${email}`);
      const jsonData = await response.json();
      console.log("JSON DATA: ", jsonData);
      const check = jsonData;
      console.log("AFTER FETCHED EMAIL: ", email);
      console.log("AFTER FETCHED: ", check);
      if (check) {
        setAllowed(true);
      }
    };

    fetchData();
  }, [status]);

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
        {status === "authenticated" &&
        data.user?.email === "dinedesign.4@gmail.com" ? (
          <Link
            href="/AdminDashboard"
            className="text-white text-opacity-60 hover:text-opacity-100"
          >
            Dashboard
          </Link>
        ) : (
          ""
        )}
        {status === "authenticated" &&
        data.user?.email !== "dinedesign.4@gmail.com" ? (
          <Link
            href="/Profile"
            className="text-white text-opacity-60 hover:text-opacity-100"
          >
            Profile
          </Link>
        ) : (
          ""
        )}

        <div className="">
          {allowed && status == "authenticated" ? (
            <h1
              className="hover:cursor-pointer px-5 py-3 bg-white text-black rounded-full"
              onClick={() => signOut()}
            >
              Logout
            </h1>
          ) : (
            <h1
              className="hover:cursor-pointer px-5 py-3 bg-white text-black rounded-full"
              onClick={async () => {
                {
                  //await signOut({ redirect: false });
                  signIn("google");
                  document.cookie = "redirected_via=owner";
                  //document.cookie = "restaurant=rest";
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
