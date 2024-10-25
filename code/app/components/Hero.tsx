import React from "react";
import { GoArrowDown } from "react-icons/go";
interface ScrollButtonProps {
  scrollToBottom: () => void;
}

const Hero: React.FC<ScrollButtonProps> = ({ scrollToBottom }) => {
  return (
    <div className="relative overflow-clip bg-black py-[72px] text-white bg-[linear-gradient(to_bottom,#000,#200d42_34%,#4f21a1_65%,#a46edb_82%)] flex flex-col items-center justify-center">
      <div className=" mt-20 flex flex-col justify-center w-full md:w-[75%]  lg:w-[65%] xl:w-[50%] relative z-10">
        <h1 className="text-7xl md:text-6xl lg:text-7xl font-bold tracking-tighter px-5 text-center">
          DineDesign - From Template
          <br /> to Table
        </h1>
        <p className="text-center text-xl inline-flex justify-center mt-8 px-5">
          Beautifully designed restaurant templates with a sleek, modern user
          interface. Effortless management of menus, reservations, and customer
          engagement. Customize and launch your restaurant&apos;s online
          presence quickly, without coding expertise.
        </p>
        <div className="flex justify-center mt-8">
          <button
            onClick={scrollToBottom}
            className="bg-white flex gap-2 items-center hover:scale-110 transition-all duration-100
           text-black px-5 py-3 font-medium rounded-lg"
          >
            Explore
            <GoArrowDown />
          </button>
        </div>
      </div>
      <div className="absolute h-[375px] -bottom-72 w-[750px] md:w-screen border border-[#b48cde] bg-[radial-gradient(closest-side,#000_82%,#9560eb)] rounded-[100%] bg-black "></div>
    </div>
  );
};

export default Hero;
