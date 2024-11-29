"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";

interface HeaderProps {
  isAdmin: boolean;
}

const Header = ({ isAdmin }: HeaderProps) => {
  const { data, status } = useSession();
  console.log(data, status);
  return (
    <header className="flex justify-evenly items-center bg-[#800000] p-8">
      <Link className="text-white font-semibold text-2xl" href="">
        lezzetli.
      </Link>
      <nav className="flex gap-8 text-white font-bold items-center">
        <Link href="/template2">Home</Link>
        <Link href="/template2/menu">Menu</Link>
        <Link href="/template2/">About</Link>
        {isAdmin ? (
          <Link href="/template2/adminDashboard">Dashboard</Link>
        ) : (
          <Link href="/template2/editProfile">Profile</Link>
        )}

        {status === "authenticated" ? (
          <Link
            onClick={() => signOut()}
            className="bg-white text-primaryTem2 px-8 py-2 rounded-full"
            href=""
          >
            LogOut
          </Link>
        ) : (
          <Link
            onClick={() => {
              {
                signIn("google");
                document.cookie = "redirected_via=customer";
              }
            }}
            className="bg-white text-primaryTem2 px-8 py-2 rounded-full"
            href=""
          >
            Login
          </Link>
        )}

        <div className="text-white">
          <Link href="/template2/Cart">
            <MdOutlineShoppingCart size={25} />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
