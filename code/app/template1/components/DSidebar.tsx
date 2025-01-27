"use client";
import Dsidelink from "@/app/template1/components/Dsidelink";
import { FaCircleUser } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdOutlineSettings,
} from "react-icons/md";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RestaurantCustomer } from "@prisma/client";

type sidebarprops = {
  restaurant_id: string;
};

const Sidebar = ({ restaurant_id }: sidebarprops) => {
  const menuItems = [
    {
      title: "Pages",
      list: [
        {
          title: "Dashboard",
          path: `/restaurants/${restaurant_id}/adminDashboard`,
          icon: <MdDashboard />,
        },
        {
          title: "Users",
          path: `/restaurants/${restaurant_id}/adminDashboard/users`,
          icon: <MdSupervisedUserCircle />,
        },
        {
          title: "Menu",
          path: `/restaurants/${restaurant_id}/adminDashboard/Menu`,
          icon: <MdShoppingBag />,
        },
      ],
    },

    {
      title: "User",
      list: [
        {
          title: "Settings",
          path: `/restaurants/${restaurant_id}/adminDashboard/settings`,
          icon: <MdOutlineSettings />,
        },
        { title: "Log out", path: "/logout", icon: <CiLogout /> }, // Adjusted logout path
      ],
    },
  ];
  const { data, status } = useSession();
  const router = useRouter();
  document.cookie = `id=${restaurant_id}; path=/; SamSite=Lax`;
  const [user, setUser] = useState<RestaurantCustomer>();

  useEffect(() => {
    const fetchData = async () => {
      const email = data?.user?.email;
      console.log("CLIENT EMAIL: ", email);
      const response = await fetch(`/api/session/restaurant/${email}`);
      const jsonData = await response.json();
      console.log("JSON DATA: ", jsonData);
      const check = jsonData;
      console.log("AFTER FETCHED EMAIL: ", email);
      console.log("AFTER FETCHED: ", check);
      setUser(check);
    };

    fetchData();
  }, [status]);

  return (
    <div className="sticky top-10 p-4">
      {/* User Info Section */}
      <div className="flex items-center gap-4 mb-6">
        <FaCircleUser className="text-xl text-gray-400" />
        <div className="flex flex-col">
          <span className="font-medium text-white">{user?.name}</span>
          <span className="text-sm text-gray-400">
            {user?.isOwner ? <>Owner</> : <>Administrator</>}
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <ul className="list-none space-y-6">
        {menuItems.map((category) => (
          <li key={category.title}>
            <span className="text-gray-400 font-bold text-xs uppercase">
              {category.title}
            </span>
            <ul className="mt-2 space-y-2">
              {category.list.map((item) => (
                <Dsidelink item={item} key={item.title} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
