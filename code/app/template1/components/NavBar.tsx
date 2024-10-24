import React from "react";
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

const NavBar = () => {
  const user = "admin";
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
              {user == "admin" ? (
                <DropdownMenuItem className="hover:cursor-pointer">
                  <Link
                    href="/template1/adminDashboard"
                    className="flex items-center justify-between font-chillax w-full h-full px-2 rounded-lg  hover:bg-gray-300 transition duration-200 hover-chevron"
                  >
                    Dashboard
                    <GoChevronRight className="ml-2 transition-transform duration-200 transform hover:translate-x-1 hover:opacity-100 animate-chevron" />
                  </Link>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className="hover:cursor-pointer">
                  <Link
                    href="/template1/editProfile"
                    className="flex items-center justify-between font-chillax w-full h-full px-2 rounded-lg  hover:bg-gray-300 transition duration-200 hover-chevron"
                  >
                    Profile
                    <GoChevronRight className="ml-2 transition-transform duration-200 transform hover:translate-x-1 hover:opacity-100 animate-chevron" />
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="hover:cursor-pointer">
                <Link
                  href="/template1/reservation"
                  className="flex items-center justify-between font-chillax w-full h-full px-2 rounded-lg  hover:bg-gray-300 transition duration-200 hover-chevron"
                >
                  Reservation
                  <GoChevronRight className="ml-2 transition-transform duration-200 transform hover:translate-x-1 hover:opacity-100 animate-chevron" />
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuLabel className="bg-[rgb(193,151,98)] px-2 rounded-lg font-chillax">
              Menu
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:cursor-pointer">
                <Link
                  href="/template1/categories"
                  className="flex items-center justify-between px-2 rounded-lg font-chillax w-full h-full  hover:bg-gray-300 transition duration-200 hover-chevron"
                >
                  Categories
                  <GoChevronRight className="ml-2 transition-transform duration-200 transform hover:translate-x-1 hover:opacity-100 animate-chevron" />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer">
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
            <DropdownMenuItem className="hover:cursor-pointer">
              <Link
                href="/template1"
                className="flex items-center justify-between px-2 rounded-lg font-chillax w-full h-full  hover:bg-gray-300 transition duration-200 hover-chevron"
              >
                Home
                <GoChevronRight className="ml-2 transition-transform duration-200 transform hover:translate-x-1 hover:opacity-100 animate-chevron" />
              </Link>
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
        <Link href="/template1/menu">Menu</Link>
        <Link href="/template1/categories" className="hover:cursor-pointer">
          Categories
        </Link>
        <Link href="/template1/aboutUs" className="hover:cursor-pointer">
          About Us
        </Link>
      </div>

      <Link
        href="/template1/reservation"
        className="md:text-xl text-white bg-black px-7 py-3 rounded-full transition-transform  hover:scale-105 font-chillax text-sm"
      >
        Book a Table
      </Link>
    </div>
  );
};

export default NavBar;
