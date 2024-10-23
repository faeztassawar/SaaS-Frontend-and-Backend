"use client";
import React, { useState } from "react";
import Slides from "./Slides";
import whiteclassic from "../images/final.png";
import whiteb from "../images/whiteBurger.jpg";
import blackP from "../images/blackClass.jpg";
import blackB from "../images/blackBurger.jpg";

import Image from "next/image";
import { PiLineVerticalThin } from "react-icons/pi";
import Link from "next/link";

const Template = () => {
  const [isClassic, setIsClassic] = useState(true);
  const [isFast, setIsFast] = useState(false);
  const [fadeKey, setFadeKey] = useState(0); // New state variable for fade

  const setClassic = () => {
    setIsClassic(true);
    setIsFast(false);
    setFadeKey((prev) => prev + 1); // Trigger fade
  };

  const setFast = () => {
    setIsFast(true);
    setIsClassic(false);
    setFadeKey((prev) => prev + 1); // Trigger fade
  };

  return (
    <div className="bg-black bg-gradient-to-b from-black to-[#5d2ca8]/50 text-white flex flex-col items-center py-10">
      <h1 className="py-10 text-6xl font-bold">Templates</h1>
      <p className="text-sm sm:text-xl text-white/80 w-[50%] text-center">
        We offer both classic style restaurant templates and fast food
        restaurant templates, with reservation in classic restaurants and online
        delivery with cart option in fast food restaurants
      </p>
      <div className="flex text-white my-20 justify-center gap-10">
        <button
          onClick={setClassic}
          className={`border ${
            isClassic ? `bg-white text-black` : `border-white bg-black`
          }  px-5 py-3 cursor-pointer gap-4 group items-center duration-300 transition-transform rounded-2xl flex text-black`}
        >
          <div
            className={` ${
              isClassic
                ? "text-black flex justify-center items-center"
                : "text-white"
            }  transition-transform duration-300 hidden group-hover:block`}
          >
            <h1 className="text-center">Classic Restaurant</h1>
          </div>
          <PiLineVerticalThin
            className={`hidden group-hover:block ${
              isClassic ? "text-black" : "text-white"
            } `}
          />
          {isClassic ? (
            <Image
              src={blackP}
              alt=""
              width={46}
              height={46}
              className="bg-white"
            />
          ) : (
            <Image
              src={whiteclassic}
              alt=""
              width={46}
              height={46}
              className="bg-black"
            />
          )}
        </button>
        <div
          onClick={setFast}
          className={`border ${
            isFast ? `bg-white text-black` : `border-white bg-black`
          }  px-5 py-3 cursor-pointer gap-4 group items-center duration-300 transition-transform rounded-2xl flex text-black`}
        >
          {isFast ? (
            <Image
              src={blackB}
              alt=""
              width={46}
              height={46}
              className="bg-white"
            />
          ) : (
            <Image
              src={whiteb}
              alt=""
              width={46}
              height={46}
              className="bg-black"
            />
          )}
          <PiLineVerticalThin
            className={`hidden group-hover:block ${
              isFast ? "text-black" : "text-white"
            } `}
          />
          <div
            className={` ${
              isFast ? "text-black" : "text-white"
            }  transition-transform duration-300 hidden group-hover:block`}
          >
            Fast Food
          </div>
        </div>
      </div>
      <div className="border px-10 py-10 border-white/50 rounded-3xl flex flex-col mt-12 w-[85%] items-center">
        {isClassic ? (
          <div
            className="flex flex-col items-center"
            key={fadeKey} // Use key to trigger fade on re-render
            style={{
              opacity: 0,
              animation: "fadeIn 1s forwards",
              animationDelay: "0.2s",
            }}
          >
            <h1 className="text-4xl font-bold py-10">Classic Restaurant</h1>
            <p className="text-center text-sm sm:text-xl text-white/80">
              This classic restaurant template features a landing page with a
              sleek navigation bar guiding users through the site. The menu page
              showcases the restaurant's offerings in an organized layout, while
              the reservation page allows customers to easily book tables. An
              admin dashboard, accessible to restaurant managers, provides tools
              to edit the menu, manage users, and modify categories, ensuring
              smooth operations behind the scenes.
            </p>
            <Slides isClass={true} />
            <div className="flex gap-5 mt-10">
              <Link
                target="_blank"
                href="/template1"
                className="px-5 py-3 text-black bg-white rounded-2xl hover:scale-110 transition-all duration-200"
              >
                Preview
              </Link>
              <Link
                href=""
                className="px-5 py-3 text-black bg-white rounded-2xl hover:scale-110 transition-all duration-200"
              >
                Details
              </Link>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center"
            key={fadeKey} // Use key to trigger fade on re-render
            style={{
              opacity: 0,
              animation: "fadeIn 1s forwards",
              animationDelay: "0.2s",
            }}
          >
            <h1 className="text-4xl font-bold py-10">Fast Food</h1>
            <p className="text-center text-xl text-white/80">
              Introducing our fast food restaurant template, designed for a
              seamless user experience! The landing page features a navigation
              bar with a user-friendly interface, showcasing the menu and about
              us sections. The menu page displays delectable items for customers
              while providing editable options for admins to manage menu items
              and user orders effortlessly. The cart/delivery page ensures
              smooth checkout, while the order management page empowers admins
              to oversee and modify orders directly, making the entire process
              efficient and straightforward.
            </p>
            <Slides isClass={false} />
            <div className="flex gap-5 mt-4 py-10">
              <Link
                href="/template2"
                target="_blank"
                className="px-5 py-3 text-black bg-white rounded-2xl hover:scale-110 transition-all duration-200"
              >
                Preview
              </Link>
              <Link
                href=""
                className="px-5 py-3 text-black bg-white rounded-2xl hover:scale-110 transition-all duration-200"
              >
                Details
              </Link>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(
              20px
            ); /* Optional: adds a subtle upward movement */
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Template;
