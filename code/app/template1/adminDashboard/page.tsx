"use client";

import React, { useState } from "react";
import DReservation from "../components/DReservation";
import DInfoCard from "../components/DInfoCard";

const AdminDashboard = () => {
  const reserveCards = [
    {
      name: "Joe",
      Date: "12-12-12",
      Time: "6PM-8PM",
      Guests: "5",
    },
    {
      name: "Joe",
      Date: "12-12-12",
      Time: "6PM-8PM",
      Guests: "5",
    },
    {
      name: "Joe",
      Date: "12-12-12",
      Time: "6PM-8PM",
      Guests: "5",
    },
  ];

  const [pendingCards, setPendingCards] = useState(reserveCards);
  const [accResCards, setAccResCards] = useState(reserveCards);

  return (
    <div className="flex flex-col p-4 min-h-screen bg-[#0f172a]">
      {" "}
      {/* Added full-height background */}
      {/* Reservation Stats Cards */}
      <div className="mt-3 flex w-full justify-between gap-2">
        <DInfoCard title="Total Reservations Today" stats="14" percent="19%" />
        <DInfoCard title="Total Reservations Today" stats="14" percent="49%" />
      </div>
      {/* Pending Reservations */}
      <div className="flex-col">
        <h2 className="mb-5 mt-6 font-light text-3xl text-gray-200">
          Pending Reservations
        </h2>
        <div className="bg-[#172340] p-5 rounded-lg flex w-full mt-3">
          <div className="w-full flex flex-col">
            <div className="flex justify-between mb-4 font-semibold lg:w-[80%] w-full">
              <h1 className="pl-5">Name</h1>
              <h1 className="pl-7">Date</h1>
              <h1 className="pl-10 ml-3">Time</h1>
              <h1 className="pl-4">Guests</h1>
            </div>
            <div>
              {pendingCards.map((item, index) => (
                <DReservation
                  key={index} // Unique key for each reservation item
                  name={item.name}
                  date={item.Date}
                  time={item.Time}
                  count={item.Guests}
                  index={index}
                  status="p" // Assuming 'p' is for pending
                />
              ))}
            </div>
          </div>
        </div>

        {/* Accepted Reservations */}
        <h2 className="mb-5 mt-6 font-light text-3xl text-gray-200">
          Reservations
        </h2>
        <div className="bg-[#172340] p-5 rounded-lg flex w-full mt-3">
          <div className="w-full flex flex-col">
            <div className="flex justify-between mb-4 font-semibold lg:w-[80%] w-full">
              <h1 className="pl-5">Name</h1>
              <h1 className="pl-7">Date</h1>
              <h1 className="pl-10 ml-3">Time</h1>
              <h1 className="pl-4">Guests</h1>
            </div>
            <div>
              {accResCards.map((item, index) => (
                <DReservation
                  key={index} // Unique key for each reservation item
                  name={item.name}
                  date={item.Date}
                  time={item.Time}
                  count={item.Guests}
                  index={index}
                  status="" // Assuming empty status for accepted reservations
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
