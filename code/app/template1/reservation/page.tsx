import React from "react";
import Image from "next/image";
import bgImage from "@/app/template1/images/reservation.png";
import NavBar from "@/app/template1/components/NavBar";
import Footer from "../components/Footer";
import Link from "next/link";

const reservationPage = () => {
  return (
    /*Left Side Screen*/
    <div className="md:flex  h-screen w-screen bg-[#050505] font-chillax">
      <div className="relative h-24 md:h-full md:w-1/2 w-full flex items-center justify-center overflow-hidden">
        <Image
          className="absolute top-0 left-0 object-cover brightness-50"
          src={bgImage}
          fill
          alt="Background"
        />

        <div className="relative z-10 flex items-center h-full flex-col justify-between gap-20 py-10">
          <h1 className="text-white text-xl md:text-4xl font-chillax">
            <Link href="/template1">lezzetli.</Link>
          </h1>
          <div className="text-white flex gap-2 flex-col justify-between items-center">
            <h2 className="text-3xl md:text-7xl font-rose text-[#face8d]">
              Book a Table
            </h2>
            <h1 className="text-3xl md:text-7xl font-[900] font-chillax">
              Reservation
            </h1>
          </div>
          <NavBar />
        </div>
      </div>

      <div className="md:ml-1/2 z-10 w-screen pt-10 h-screen md:w-1/2 text-2xl flex flex-col gap-8 font-chillax text-white p-4 bg-[#010000] overflow-y-auto">
        <div className="px-16 py-10 mt-10 ">
          <h2 className="text-4xl font-[900] mar mb-2"> Book a table </h2>
          <span className="text-xl opacity-60 leading-[160%]">
            Volutpat maecenas volutpat blandit aliquam etiam erat velit
            scelerisque. Arcu non odio euismod lacinia. Tortor aliquam nulla
            facilisi cras fermentum odio eu.
          </span>
        </div>
        <div className="px-16">
          <form action="" className="flex flex-wrap justify-between">
            <label className="mb-2 text-xl opacity-80 leading-[160%]">
              Name
            </label>
            <input
              className="bg-[#050505]  border-2 border-gray-600 focus:outline-none focus:border-[#face8d] opacity-70 rounded-[10px] w-full mb-8 p-4 h-14"
              type="text"
              placeholder="Enter your name"
              name="name"
              required
            ></input>
            <label className="mb-2 text-xl opacity-80 leading-[160%]">
              Number Of Guests
            </label>
            <input
              className="bg-[#050505]  border-2 border-gray-600 focus:outline-none focus:border-[#face8d] opacity-70 rounded-[10px] w-full mb-8 p-4 h-14"
              type="number"
              min="1"
              max="12"
              placeholder="2"
              name="guestsCount"
              required
            />
            <div className="flex w-screen gap-2 items-center justify-between">
              <div className="basis-1/2">
                <h1 className="mb-2 text-xl opacity-80 leading-[160%]">Date</h1>
                <input
                  className="bg-[#050505] w-[70%]  border-2 border-gray-600 focus:outline-none focus:border-[#face8d] opacity-70 rounded-[10px] mb-8 p-4 h-14 pr-8"
                  type="date"
                  placeholder="16.06.2022"
                  name="date"
                  required
                ></input>
              </div>
              <div className="basis-1/2">
                <h1 className="mb-2 text-xl opacity-80 leading-[160%]">Time</h1>
                <input
                  className="bg-[#050505] border-2 border-gray-600 focus:outline-none focus:border-[#face8d] opacity-70 rounded-[10px] w-[70%] mb-8 p-4 h-14"
                  type="time"
                  placeholder="6PM"
                  name="time"
                  required
                ></input>
              </div>
            </div>
            <button
              type="submit"
              className="w-full font-bol bg-[rgb(193,151,98)] font-[700] transition hover:scale-105 text-black text-xl p-30 h-14 rounded-[30px]"
            >
              BOOK A TABLE
            </button>
          </form>
        </div>
        <div className="mt-10 flex items-center justify-center md:hidden">
          <NavBar />
        </div>
        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default reservationPage;
