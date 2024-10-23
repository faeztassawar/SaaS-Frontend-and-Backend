"use client";
import { usePathname } from "next/navigation";
import { MdSearch } from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="p-5 rounded-lg bg-[#172340] flex items-center justify-between">
      <div className="text-white font-bold capitalize">
        {pathname.split("/").pop()}
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 bg-gray-700 p-2 rounded-lg">
          <MdSearch />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none text-white focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
