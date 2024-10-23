"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

type MenuItem = {
  title: string;
  path: string;
  icon: ReactElement;
};

type MenuLinkProps = {
  item: MenuItem;
};

const MenuLink = ({ item }: MenuLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={`flex items-center gap-2 p-4 my-2 rounded-lg transition-colors duration-200 ${
        pathname === item.path ? "bg-[#1b294b] text-white" : "text-gray-400"
      } hover:bg-[#1b294b] hover:text-white`}
    >
      {item.icon}
      {item.title}
    </Link>
  );
};

export default MenuLink;