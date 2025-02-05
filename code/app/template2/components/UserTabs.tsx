"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface UserTabsProps {
  isAdmin: boolean;
  rest_id: string;
}

export default function UserTabs({ isAdmin, rest_id }: UserTabsProps) {
  
  const userpath = `/restaurants/${rest_id}/adminDashboard/users`;
  const editProfilePath = `/restaurants/${rest_id}/editProfile`;
  const settingsPath = `/restaurants/${rest_id}/adminDashboard/settings`
  const catPath = `/restaurants/${rest_id}/adminDashboard/categories`

  const path = usePathname();

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

      {isAdmin && (
        <>
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
              path === "/template2/categories"
                ? "bg-[#800000] text-white rounded-full px-3 py-2"
                : "bg-[#9f8881] text-white rounded-full px-3 py-2"
            }
          >
            Categories
          </Link>
          <Link
            href="/template2/menu-item"
            className={
              path === "/template2/menu-item" ||
              path === "/template2/menu-item/new" ||
              path === "/template2/menu-item/edit"
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
        </>
      )}
    </div>
  );
}
