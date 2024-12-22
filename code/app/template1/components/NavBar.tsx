"use client";
import React, { useEffect, useState } from "react";
import { TfiMenu } from "react-icons/tfi";
import { FaRegClock } from "react-icons/fa";
import { GoChevronRight } from "react-icons/go";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { signIn, signOut, useSession } from "next-auth/react";

type NavBarProps = {
  rest_id: string;
};

const NavBar = ({ rest_id }: NavBarProps) => {
  const { data, status } = useSession();
  const menuPath = `/restaurants/${rest_id}/menu`;
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const email = data?.user?.email;
      if (!email) return;

      try {
        const response = await fetch(`/api/session/restaurant/${email}`);
        const jsonData = await response.json();
        const check = jsonData?.restaurant_id;

        if (check) {
          setAllowed(true);
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [status, data]);

  return (
    <div className="rounded-full flex justify-between gap-8 items-center bg-[rgb(193,151,98)] bg-opacity-80 py-2 px-7 xl:scale-100 lg:scale-90 md:scale-75">
      <div className="text-3xl flex gap-8 items-center text-black font-chillax">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <TfiMenu className="hover:cursor-pointer border-none" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="bg-[rgb(193,151,98)] font-chillax">
              Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {status === "authenticated" ? (
                <>
                  <DropdownMenuItem>
                    <Link
                      href="/template1/adminDashboard"
                      className="flex items-center justify-between font-chillax w-full h-full px-2 rounded-lg  hover:bg-gray-300 transition duration-200 hover-chevron"
                    >
                      Dashboard
                      <GoChevronRight className="ml-2 transition-transform duration-200 transform hover:translate-x-1 hover:opacity-100 animate-chevron" />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/template1/reservation"
                      className="flex items-center justify-between font-chillax w-full h-full px-2 rounded-lg  hover:bg-gray-300 transition duration-200 hover-chevron"
                    >
                      Reservation
                      <GoChevronRight className="ml-2 transition-transform duration-200 transform hover:translate-x-1 hover:opacity-100 animate-chevron" />
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem>
                  <Link
                    href="/template1/editProfile"
                    className="flex items-center justify-between font-chillax w-full h-full px-2 rounded-lg  hover:bg-gray-300 transition duration-200 hover-chevron"
                  >
                    Profile
                    <GoChevronRight className="ml-2 transition-transform duration-200 transform hover:translate-x-1 hover:opacity-100 animate-chevron" />
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="bg-[rgb(193,151,98)] px-2 rounded-lg font-chillax">
              Menu
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href="/template1/categories"
                  className="flex items-center justify-between px-2 rounded-lg font-chillax w-full h-full  hover:bg-gray-300 transition duration-200 hover-chevron"
                >
                  Categories
                  <GoChevronRight className="ml-2 transition-transform duration-200 transform hover:translate-x-1 hover:opacity-100 animate-chevron" />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/template1/menu"
                  className="flex items-center justify-between px-2 rounded-lg font-chillax w-full h-full  hover:bg-gray-300 transition duration-200 hover-chevron"
                >
                  All Items
                  <GoChevronRight className="ml-2 transition-transform duration-200 transform hover:translate-x-1 hover:opacity-100 animate-chevron" />
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href="/template1"
                className="flex items-center justify-between px-2 rounded-lg font-chillax w-full h-full  hover:bg-gray-300 transition duration-200 hover-chevron"
              >
                Home
                <GoChevronRight className="ml-2 transition-transform duration-200 transform hover:translate-x-1 hover:opacity-100 animate-chevron" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {status === "authenticated" && (
                <button
                  onClick={() => signOut()}
                  className="flex py-2 justify-center text-center font-semibold items-center px-2 rounded-lg font-chillax w-full h-full  hover:bg-black hover:text-white transition duration-200 hover-chevron"
                >
                  Logout
                </button>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger>
            <FaRegClock className="hover:cursor-pointer" />
          </HoverCardTrigger>
          <HoverCardContent side="top">
            <div className="flex flex-col gap-2 font-chillax">
              <h1 className="text-xl font-bold">Opening Hours</h1>
              <div className="text-lg">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Mon</span>
                  <span>closed</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">Tue - Fri</span>
                  <span>4pm - 8pm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">Sat - Sun</span>
                  <span>5pm - 11pm</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="font-chillax mx-5 text-xl hidden md:flex gap-8 text-white">
        <Link href={menuPath}>Menu</Link>
        <Link href="/template1/categories" className="hover:cursor-pointer">
          Categories
        </Link>
        <Link href="/template1/aboutUs" className="hover:cursor-pointer">
          About Us
        </Link>
      </div>

      {status === "authenticated" && allowed ? (
        <Link
          href="/template1/reservation"
          className="md:text-xl text-white bg-black px-7 py-3 rounded-full transition-transform  hover:scale-105 font-chillax text-sm"
        >
          Book a Table
        </Link>
      ) : (
        <h1
          onClick={() => {
            signIn("google");
            document.cookie = "customer=ok; path=/; SameSite=Lax";
            document.cookie = `rest_id=${rest_id}; path=/; SameSite=Lax`;
          }}
          className="md:text-xl text-white bg-black px-7 py-3 hover:cursor-pointer rounded-full transition-transform  hover:scale-105 font-chillax text-sm"
        >
          Login to Reserve
        </h1>
      )}
    </div>
  );
};

export default NavBar;
