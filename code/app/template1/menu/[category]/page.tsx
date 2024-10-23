import React from "react";
import Image from "next/image";
import bgImage from "@/app/template1/images/menubg 1.png";
import NavBar from "../../components/NavBar";
import MealCard from "../../components/MealCard";
import Footer from "../../components/Footer";
import food from "@/app/template1/images/Soup.png";
import burger from "@/app/template1/images/burger.png";
import pancake from "@/app/template1/images/pancakes.png";
import salad from "@/app/template1/images/salad.png";
import chai from "@/app/template1/images/chai.png";
import honey from "@/app/template1/images/honey.png";

const Page = ({ params }: any) => {
  let bg = pancake;
  const { category } = params;
  if (category == "Breakfast") {
    bg = pancake;
  } else if (category == "Burgers") {
    bg = burger;
  } else if (category == "Salad") {
    bg = salad;
  } else if (category == "Tea") {
    bg = chai;
  }
  return (
    <div className="md:flex h-screen w-screen bg-[#050505] font-chillax">
      {/* Left Section with Background Image */}
      <div className="relative h-24 md:h-full md:w-1/2 w-full flex items-center justify-center overflow-hidden">
        <Image
          className="absolute z-0 top-0 left-0 object-cover brightness-[25%]"
          src={bg}
          fill
          alt="Background"
        />
        <div className="flex z-10 gap-12 items-center h-full flex-col justify-between py-10">
          <h1 className="text-white text-xl md:text-4xl">lezzetli.</h1>
          <div className="text-white flex gap-4 flex-col justify-between items-center">
            <h2 className="text-3xl md:text-7xl font-rose text-[#face8d]">
              {category}
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
      <div className="md:ml-1/2 h-screen z-10 w-full md:w-1/2 text-2xl flex flex-col gap-8 font-chillax text-white p-4 bg-[#010000] overflow-y-auto">
        <div className="flex justify-center gap-8 text-lg">
          <span className="hover:cursor-pointer text-white hover:text-[#e5a23d]">
            Starter
          </span>
          <span className="hover:cursor-pointer text-white hover:text-[#e5a23d]">
            Lunch
          </span>
          <span className="hover:cursor-pointer text-white hover:text-[#e5a23d]">
            Dinner
          </span>
          <span className="hover:cursor-pointer text-white hover:text-[#e5a23d]">
            Drinks
          </span>
        </div>
        <MealCard
          img={food}
          name="Tomato Soup"
          desc="This creamy soup is comforting, with a rich flavor profile."
          price="4.6"
        />
        <MealCard
          img={food}
          name="Sandwich"
          desc="This creamy soup is comforting, with a rich flavor profile."
          price="4.6"
        />
        <MealCard
          img={food}
          name="Tomato Soup"
          desc="This creamy soup is comforting, with a rich flavor profile."
          price="4.6"
        />
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

export default Page;
