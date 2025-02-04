"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";

interface HeaderProps {
  rest_id?: string;
  rest_name?: string;
  isAdmin?: boolean; // ✅ Add this
}

const Header = ({ rest_id = "", rest_name = "", isAdmin = false }: HeaderProps) => {

  const { data, status } = useSession();
  const [allowed, setAllowed] = useState(false);

  // Dynamic paths based on `rest_id`
  const homePath = `/restaurants/${rest_id}`;
  const menuPath = `/restaurants/${rest_id}/menu`;
  const dashboardPath = `/restaurants/${rest_id}/adminDashboard`;
  const profilePath = `/restaurants/${rest_id}/editProfile`;
  const cartPath = `/restaurants/${rest_id}/Cart`;
  const aboutPath = `/restaurants/${rest_id}/about-us`;

  // Fetch session data and check permissions
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const email = data?.user?.email;
        if (!email) return;

        const response = await fetch(`/api/session/restaurant/${email}`);
        if (!response.ok) throw new Error("Failed to fetch session data");

        const jsonData = await response.json();
        if (jsonData?.restaurant_id) {
          setAllowed(true);
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    if (status === "authenticated") {
      fetchSessionData();
    }
  }, [status, data]);

  return (
    <header className="flex justify-evenly items-center bg-[#800000] p-8">
      {/* Restaurant Name */}
      <Link href={homePath} className="text-white font-semibold text-2xl">
        {rest_name}
      </Link>

      {/* Navigation Menu */}
      <nav className="flex gap-8 text-white font-bold items-center">
        <Link href={homePath}>Home</Link>
        <Link href={menuPath}>Menu</Link>
        <Link href={aboutPath}>About</Link>

        {status === "authenticated" && allowed ? (
          <Link href={dashboardPath}>Dashboard</Link>
        ) : (
          <Link href={profilePath}>Profile</Link>
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
          <Link href={cartPath}>
            <MdOutlineShoppingCart size={25} />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;