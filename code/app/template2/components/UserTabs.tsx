"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RestaurantCustomer } from "@prisma/client";


interface UserTabsProps {
  restaurant_id: string;
  isAdmin: boolean
}

const UserTabs = ({restaurant_id, isAdmin }: UserTabsProps) => {
  
  const userpath = `/restaurants/${restaurant_id}/adminDashboard/users`;
  const editProfilePath = `/restaurants/${restaurant_id}/editProfile`;
  const settingsPath = `/restaurants/${restaurant_id}/adminDashboard/settings`
  const catPath = `/restaurants/${restaurant_id}/adminDashboard/categories`
  const menuItemPath = `/restaurants/${restaurant_id}/adminDashboard/items`

  const path = usePathname();

  const { data, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<RestaurantCustomer>();

  useEffect(() => {
    // Set cookie after component mounts
    document.cookie = `id=${restaurant_id}; path=/; SameSite=Lax`;
  }, [restaurant_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = data?.user?.email;
        if (!email) return;

        console.log("CLIENT EMAIL: ", email);
        const response = await fetch(`/api/session/restaurant/${email}`);

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const jsonData = await response.json();
        console.log("JSON DATA: ", jsonData);
        setUser(jsonData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [status, data?.user?.email]);
  

  return (
    <div className="flex mx-auto gap-2 mt-4 tabs rounded-full justify-center flex-wrap">
      <Link
        className={
          path === "/template2/editProfile"
            ? "bg-[#800000] text-white rounded-full px-3 py-2"
            : "bg-[#9f8881] text-white rounded-full px-3 py-2"
        }
        href={editProfilePath}
      >
        Profile
      </Link>
          <Link
            href="/template2/orderManage"
            className={
              path === "/template2/orderManage"
                ? "bg-[#800000] text-white rounded-full px-3 py-2"
                : "bg-[#9f8881] text-white rounded-full px-3 py-2"
            }
          >
            Manage Orders
          </Link>
          <Link
            href={catPath}
            className={
              path === `/restaurants/${restaurant_id}/adminDashboard/categories`
                ? "bg-[#800000] text-white rounded-full px-3 py-2"
                : "bg-[#9f8881] text-white rounded-full px-3 py-2"
            }
          >
            Categories
          </Link>
          <Link
            href={menuItemPath}
            className={
              path === `/restaurants/${restaurant_id}/adminDashboard/items` ||
              path === `/restaurants/${restaurant_id}/adminDashboard/items/add` ||
              path === `/restaurants/${restaurant_id}/adminDashboard/items/edit`
                ? "bg-[#800000] text-white rounded-full px-3 py-2"
                : "bg-[#9f8881] text-white rounded-full px-3 py-2"
            }
          >
            Menu Items
          </Link>
          <Link
            href={userpath}
            className={
              path === "/template2/users" ||
              path === "/template2/users/editUser"
                ? "bg-[#800000] text-white rounded-full px-3 py-2"
                : "bg-[#9f8881] text-white rounded-full px-3 py-2"
            }
          >
            Users
          </Link>

          <Link
            href="/template2/Orders"
            className={
              path === "/template2/Orders"
                ? "bg-[#800000] text-white rounded-full px-3 py-2"
                : "bg-[#9f8881] text-white rounded-full px-3 py-2"
            }
          >
            All Orders
          </Link>

          <Link
            href={settingsPath}
            className={
              path === "/template2/settings"
                ? "bg-[#800000] text-white rounded-full px-3 py-2"
                : "bg-[#9f8881] text-white rounded-full px-3 py-2"
            }
          >
            Settings
          </Link>
    </div>
  );
}
export default UserTabs;
