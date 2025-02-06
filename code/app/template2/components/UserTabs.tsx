"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


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
              path === "/template2/categories"
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
