import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserTabs from "../components/UserTabs";

const Settings = () => {
  const menu = "lezzetli.";
  const timings = [
    {
      day: "Monday",
      Start: "5PM",
      End: "11PM",
    },
    {
      day: "Tue - Fri",
      Start: "4PM",
      End: "11PM",
    },
    {
      day: "Sat - Sun",
      Start: "6PM",
      End: "2AM",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <Header isAdmin={true} />
      <UserTabs isAdmin={true} />

      <div className="flex w-full max-w-3xl items-center bg-gray-50 rounded-lg px-5 py-4 mx-auto">
        <h1 className="text-2xl px-3 font-semibold">Change Restaurant Name:</h1>
        <input
          className="w-[40%] border border-gray-800 px-5 py-3 ml-4 rounded-full bg-[#FDFFF1]"
          placeholder={menu}
        />
        <button className="ml-4 px-5 py-3 bg-[#800000] text-white font-semibold rounded-full">
          Confirm
        </button>
      </div>

      <div className="flex flex-col w-full max-w-3xl gap-5 bg-[#FDFFF1] px-5 py-4 rounded-lg mx-auto">
        <h1 className="text-2xl px-3 font-semibold">
          Edit About Us Information
        </h1>
        <textarea
          className="rounded-xl border px-5 py-3 border-gray-800 bg-[#F0F0F0] h-24"
          placeholder="Write Introduction (Max 1000 characters)"
        />
        <textarea
          className="rounded-xl border px-5 py-3 border-gray-800 bg-[#F0F0F0] h-24"
          placeholder="Write Description (Max 1000 characters)"
        />
        <div className="flex justify-end">
          <button className="my-3 px-5 py-3 bg-[#800000] text-white font-semibold rounded-full">
            Confirm
          </button>
        </div>
      </div>

      <div className="flex flex-col w-full max-w-3xl gap-5 bg-[#FDFFF1] px-5 py-4 rounded-lg mx-auto">
        <h1 className="text-2xl px-3 font-semibold">Timings</h1>
        <div className="flex flex-col items-center justify-center gap-4">
          {timings.map((item, index) => (
            <div key={index} className="flex w-full max-w-xl items-center">
              <div className="flex w-full justify-between items-center">
                <h1 className="text-xl">{item.day}</h1>
                <h1 className="text-xl">
                  {item.Start} - {item.End}
                </h1>
              </div>
              <div className="flex items-center justify-center ml-4">
                <button className="px-4 py-2 bg-[#800000] text-white rounded-full">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
