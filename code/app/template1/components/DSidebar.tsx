import Dsidelink from "@/app/template1/components/Dsidelink";
import { FaCircleUser } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdOutlineSettings,
} from "react-icons/md";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/template1/adminDashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/template1/adminDashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "/template1/adminDashboard/products",
        icon: <MdShoppingBag />,
      },
    ],
  },

  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/template1/adminDashboard/settings",
        icon: <MdOutlineSettings />,
      },
      { title: "Log out", path: "/logout", icon: <CiLogout /> }, // Adjusted logout path
    ],
  },
];

const Sidebar = () => {
  return (
    <div className="sticky top-10 p-4">
      {/* User Info Section */}
      <div className="flex items-center gap-4 mb-6">
        <FaCircleUser className="text-xl text-gray-400" />
        <div className="flex flex-col">
          <span className="font-medium text-white">Aroob</span>
          <span className="text-sm text-gray-400">Administrator</span>
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
