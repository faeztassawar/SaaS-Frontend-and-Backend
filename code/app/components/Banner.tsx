import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div className="font-DM_Sans bg-[linear-gradient(to_right,#fcd6ff,#29d8ff,#fffd80,#f89abf,#fcd6ff)] justify-center flex items-center">
      <h1 className="text-sm">Login to buy Templates - </h1>
      <Link
        href=""
        className="py-4 px-2 text-black font-semibold underline underline-offset-4 text-sm sm:text-lg"
      >
        Explore the Templates
      </Link>
    </div>
  );
};

export default Banner;
