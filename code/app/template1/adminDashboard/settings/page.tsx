import React from "react";

const page = () => {
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
    <div className="flex flex-col gap-10">
      <div className="flex gap-5 items-center bg-[#172340] rounded-lg px-5 py-2">
        <h1 className="text-2xl px-3 py-4 font-semibold">
          Change Restaurant Name:{" "}
        </h1>
        <input
          className="w-[30%] border border-gray-800 px-5 py-3 rounded-full bg-[#2f4880]"
          placeholder={menu}
        />
        <button className="my-3 px-5 py-3 bg-[#1c9cea] text-white font-semibold rounded-full">
          Confirm
        </button>
      </div>
      <div className="flex flex-col w-full gap-5 bg-[#172340] px-5 py-3 rounded-lg">
        <h1 className="text-2xl px-3 py-4 font-semibold">
          Edit About Us Information
        </h1>
        <input
          className="rounded-xl border px-5 py-3 border-gray-800 bg-[#2f4880]"
          placeholder="Write Introduction ( Max 1000 letters )"
        />
        <input
          className="rounded-xl border border-gray-800 px-5 py-3 bg-[#2f4880]"
          placeholder="Write Description ( Max 1000 letters )"
        />
        <div className=" mx-8 flex items-center justify-end">
          <button className="my-3 px-5 py-3 bg-[#1c9cea] text-white font-semibold rounded-full">
            Confirm
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full gap-5 bg-[#172340] px-5 py-3 rounded-lg">
        <h1 className="text-2xl px-3 py-4 font-semibold">Timings</h1>
        <div className="flex flex-col items-center justify-center gap-4">
          {timings.map((item) => (
            <div className="flex w-[60%] items-center">
              <div className="flex basis-2/3 my-4 justify-between items-center">
                <h1 className="text-xl">{item.day}</h1>
                <h1 className="text-xl">
                  {item.Start} - {item.End}
                </h1>
              </div>
              <div className="basis-1/3 flex items-center justify-center">
                <button className="px-4 py-2 bg-[#1c9cea] rounded-full">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
