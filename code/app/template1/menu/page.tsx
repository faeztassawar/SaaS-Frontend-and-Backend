import React from "react";
import Image from "next/image";
import bgImage from "@/app/template1/images/menubg 1.png";
import NavBar from "../components/NavBar";
import MealCard from "../components/MealCard";
import Footer from "../components/Footer";
import Category from "../components/Category";

const menupg = () => {
  return (
    <div className="md:flex h-screen w-screen bg-[#050505] font-chillax">
      {/* Left Section with Background Image */}
      <div className="relative h-24 md:h-full md:w-1/2 w-full flex items-center justify-center overflow-hidden">
        <Image
          className="absolute z-0 top-0 left-0 object-cover brightness-50 sharpen"
          src={bgImage}
          fill
          alt="Background"
          priority
        />
        <div className="flex z-10 gap-12 items-center h-full flex-col justify-between py-10">
          <h1 className="text-white text-xl md:text-4xl">lezzetli.</h1>
          <div className="text-white flex gap-4 flex-col justify-between items-center">
            <h2 className="text-3xl md:text-5xl font-rose text-[#face8d]">
              Check Out
            </h2>
            <h1 className="text-5xl md:text-7xl font-[900] font-chillax">
              Our Menu
            </h1>
          </div>
          <div className="hidden md:block scale-75 lg:scale-90 xl:scale-100">
            <NavBar />
          </div>
        </div>
      </div>

      {/* Right Section with Menu Items */}
      <div className="md:ml-1/2 h-screen z-10 w-full md:w-1/2 text-2xl flex flex-col gap-4 font-chillax text-white bg-[#010000] overflow-y-auto">
        <div className="flex justify-center gap-12 text-lg sticky top-0 bg-black w-full z-40 p-4"></div>

        <Category cat="Breakfast" />
        <Category cat="Burgers" />
        <Category cat="Salad" />
        <Category cat="Tea" />
        <Category cat="Dessert" />
        <div className="flex items-center justify-center md:hidden">
          <NavBar />
        </div>
        <div className="m-4">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default menupg;
