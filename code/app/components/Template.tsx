import React, { useState, forwardRef } from "react";
import Slides from "./Slides";
import whiteclassic from "../images/final.png";
import whiteb from "../images/whiteBurger.jpg";
import blackP from "../images/blackClass.jpg";
import blackB from "../images/blackBurger.jpg";

import Image from "next/image";
import { PiLineVerticalThin } from "react-icons/pi";
import Link from "next/link";

const Template = forwardRef<HTMLDivElement>((_, ref) => {
  const [isClassic, setIsClassic] = useState(true);
  const [fadeKey, setFadeKey] = useState(0);

  const handleToggleTemplate = (isClassicTemplate: boolean) => {
    setIsClassic(isClassicTemplate);
    setFadeKey((prev) => prev + 1);
  };

  return (
    <div
      ref={ref}
      className="bg-black bg-gradient-to-b from-black to-[#5d2ca8]/50 text-white flex flex-col items-center py-10 overflow-x-hidden w-full"
    >
      <h1 className="py-10 text-6xl font-bold">Templates</h1>
      <p className="text-sm sm:text-xl text-white/80 w-[50%] text-center">
        We offer both classic-style restaurant templates and fast food restaurant templates, with reservations in classic restaurants and online delivery with cart options in fast food restaurants.
      </p>
      <div className="flex text-white my-20 justify-center gap-10">
        <button
          onClick={() => handleToggleTemplate(true)}
          aria-label="Classic Restaurant Template"
          className={`border ${isClassic ? `bg-white text-black` : `border-white bg-black`} px-5 py-3 cursor-pointer gap-4 group items-center duration-300 transition-transform rounded-2xl flex`}
        >
          <div className={`${isClassic ? "text-black" : "text-white"} transition-transform duration-300 hidden group-hover:block`}>
            <h1 className="text-center">Classic Restaurant</h1>
          </div>
          <PiLineVerticalThin className={`hidden group-hover:block ${isClassic ? "text-black" : "text-white"}`} />
          <Image src={isClassic ? blackP : whiteclassic} alt="Classic" width={46} height={46} className={`bg-${isClassic ? "white" : "black"}`} />
        </button>
        <button
          onClick={() => handleToggleTemplate(false)}
          aria-label="Fast Food Template"
          className={`border ${!isClassic ? `bg-white text-black` : `border-white bg-black`} px-5 py-3 cursor-pointer gap-4 group items-center duration-300 transition-transform rounded-2xl flex`}
        >
          <Image src={!isClassic ? blackB : whiteb} alt="Fast Food" width={46} height={46} className={`bg-${!isClassic ? "white" : "black"}`} />
          <PiLineVerticalThin className={`hidden group-hover:block ${!isClassic ? "text-black" : "text-white"}`} />
          <div className={`${!isClassic ? "text-black" : "text-white"} transition-transform duration-300 hidden group-hover:block`}>
            Fast Food
          </div>
        </button>
      </div>
      <div className="border px-10 py-10 border-white/50 rounded-3xl flex flex-col mt-12 w-[85%] items-center">
        {isClassic ? (
          <div className="flex flex-col items-center" key={fadeKey} style={{ animation: "fadeIn 1s forwards", animationDelay: "0.2s" }}>
            <h1 className="text-4xl font-bold py-10">Classic Restaurant</h1>
            <p className="text-center text-sm sm:text-xl text-white/80">
              This classic restaurant template features a landing page with a sleek navigation bar guiding users through the site. The menu page showcases the restaurant&apos;s offerings, while the reservation page allows customers to easily book tables. An admin dashboard provides tools for menu edits, user management, and category updates.
            </p>
            <Slides isClass={true} />
            <div className="flex gap-5 mt-10">
              <Link href="/template1" target="_blank" className="px-5 py-3 text-black bg-white rounded-2xl hover:scale-110 transition-all duration-200">Preview</Link>
              <Link href={`/details?template=classic`} className="px-5 py-3 text-black bg-white rounded-2xl hover:scale-110 transition-all duration-200">Details</Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center" key={fadeKey} style={{ animation: "fadeIn 1s forwards", animationDelay: "0.2s" }}>
            <h1 className="text-4xl font-bold py-10">Fast Food</h1>
            <p className="text-center text-sm sm:text-xl text-white/80">
              Our fast food restaurant template offers a user-friendly landing page, showcasing the menu and about us sections. The menu page displays food items with editable options for admins, and the cart/delivery page ensures easy checkout. An order management page allows admins to oversee orders.
            </p>
            <Slides isClass={false} />
            <div className="flex gap-5 mt-10">
              <Link href="/template2" target="_blank" className="px-5 py-3 text-black bg-white rounded-2xl hover:scale-110 transition-all duration-200">Preview</Link>
              <Link href={`/details?template=fastfood`} className="px-5 py-3 text-black bg-white rounded-2xl hover:scale-110 transition-all duration-200">Details</Link>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
});

Template.displayName = "Template";

export default Template;