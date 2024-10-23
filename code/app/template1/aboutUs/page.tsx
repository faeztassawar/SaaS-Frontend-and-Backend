"use client";

import Image from "next/image";
import bgImage from "@/app/template1/images/Landing.png";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden font-chillax">
      <Image
        className="absolute top-0 left-0 object-cover brightness-50 h-full w-full"
        src={bgImage}
        fill
        alt="Background"
        priority
      />

      <div className="relative z-10 flex items-center min-h-screen flex-col gap-10 justify-between py-[5vh]">
        <h1
          className="text-white text-2xl md:text-4xl font-chillax pt-[5vh]"
          style={{
            opacity: 0,
            animation: "fadeIn 1s forwards",
            animationDelay: "0s",
          }}
        >
          lezzetli.
        </h1>
        <div className="text-white flex gap-2 md:gap-7 flex-col justify-between items-center">
          <h2
            className="text-4xl md:text-7xl font-rose text-[#face8d]"
            style={{
              opacity: 0,
              animation: "fadeIn 1s forwards",
              animationDelay: "0.2s",
            }}
          >
            About Us
          </h2>
          <div className="max-w-2xl">
            <p
              className="mt-4 text-lg md:text-2xl text-white text-center"
              style={{
                opacity: 0,
                animation: "fadeIn 1s forwards",
                animationDelay: "0.2s",
              }}
            >
              Welcome to our restaurant, where we serve the finest dishes
              inspired by traditional French cuisine. Our passion for cooking
              and dedication to quality ingredients ensure a memorable dining
              experience.
            </p>
            <p
              className="mt-4 text-lg md:text-2xl text-white text-center"
              style={{
                opacity: 0,
                animation: "fadeIn 1s forwards",
                animationDelay: "0.4s",
              }}
            >
              Our team of skilled chefs crafts each dish with care, bringing you
              the authentic flavors of France. Join us for a culinary journey
              that will tantalize your taste buds.
            </p>
          </div>
        </div>
        <NavBar />
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
}
