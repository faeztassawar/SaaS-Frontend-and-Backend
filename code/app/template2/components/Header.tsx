"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";

interface HeaderProps {
  rest_id: string;
  rest_name: string;
}

const Header = ({ rest_id, rest_name }: HeaderProps) => {
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
    <header className="flex justify-evenly items-center bg-[#800000] p-8">
      {/* Restaurant Name */}
      <Link href="/" className="text-white font-semibold text-2xl">
        {rest_name}
      </Link>

      {/* Navigation Menu */}
      <nav className="flex gap-8 text-white font-bold items-center">
        <Link href="/template2">Home</Link>
        <Link href={menuPath}>Menu</Link>
        <Link href="/template2/">About</Link>

        {status === "authenticated" && allowed ? (
          <Link href="/template2/adminDashboard">Dashboard</Link>
        ) : (
          <Link href="/template2/editProfile">Profile</Link>
        )}

        {/* Authentication Buttons */}
        {status === "authenticated" ? (
          <button
            onClick={() => signOut()}
            className="bg-white text-primaryTem2 px-8 py-2 rounded-full"
          >
            LogOut
          </button>
        ) : (
          <button
            onClick={() => {
              signIn("google");
              document.cookie = "redirected_via=customer";
            }}
            className="bg-white text-primaryTem2 px-8 py-2 rounded-full"
          >
            Login
          </button>
        )}

        {/* Shopping Cart Icon */}
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