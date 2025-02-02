"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import bgImage from "@/app/template1/images/reservation.png";
import Footer from "../components/Footer";
import Link from "next/link";
import NavBar from "../components/NavBar";
import ReservationForm from "../components/ReservationForm";
import { useSession } from "next-auth/react";
import ReservationList from "../components/ReservationList";
import { format } from "date-fns";

interface ReservationPageProps {
  id: string;
  restaurant_id: string;
}

const ReservationPage = ({ id, restaurant_id }: ReservationPageProps) => {
  const { data: session, status } = useSession();
  const [userRestaurantId, setUserRestaurantId] = useState<string | null>(null);
  const [showReservations, setShowReservations] = useState(false);

  useEffect(() => {
    const fetchUserRestaurantId = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(
            `/api/session/restaurant/${session.user.email}`
          );
          const data = await response.json();
          setUserRestaurantId(data.restaurant_id);
        } catch (error) {
          console.error("Error fetching user restaurant ID:", error);
        }
      }
    };

    if (status === "authenticated") {
      fetchUserRestaurantId();
    }
  }, [session, status]);

  return (
    <div className="md:flex h-screen w-screen bg-[#050505] font-chillax">
      {/* Left Side Screen */}
      <div className="relative h-24 md:h-full md:w-1/2 w-full flex items-center justify-center overflow-hidden">
        <Image
          className="absolute top-0 left-0 object-cover brightness-50"
          src={bgImage}
          fill
          alt="Background"
        />
        <div className="relative z-10 flex items-center h-full flex-col justify-between gap-20 py-10">
          <h1 className="text-white text-xl md:text-4xl font-chillax">
            <Link href={`/restaurants/${restaurant_id}`}>lezzetli.</Link>
          </h1>
          <div className="text-white flex gap-2 flex-col justify-between items-center">
            <h2 className="text-3xl md:text-7xl font-rose text-[#face8d]">
              Book a Table
            </h2>
            <h1 className="text-3xl md:text-7xl font-[900] font-chillax">
              Reservation
            </h1>
          </div>
          <NavBar rest_id={restaurant_id} />
        </div>
      </div>

      {/* Right Side Screen */}
      <div className="md:ml-1/2 z-10 w-screen pt-10 h-screen md:w-1/2 text-2xl flex flex-col gap-8 font-chillax text-white p-4 bg-[#010000] overflow-y-auto">
        <div className="px-16 py-10 mt-10">
          <h2 className="text-4xl font-[900] mar mb-2">Book a table</h2>
          <span className="text-xl opacity-60 leading-[160%]">
            Please fill out the form below to request a reservation.
          </span>
        </div>
        <div className="px-16">
          {userRestaurantId && (
            <>
              <ReservationForm restaurant_id={userRestaurantId} />
              <button
                onClick={() => setShowReservations(!showReservations)}
                className="w-full mt-8 bg-[#face8d] text-black hover:bg-[#e5a23d] py-4 px-4 rounded-[30px] font-[700] transition hover:scale-105 text-xl"
              >
                {showReservations ? "Hide" : "View"} Current Reservations
              </button>
              {showReservations && (
                <div className="mt-8 bg-[#172340] p-6 rounded-lg">
                  <h3 className="text-2xl font-[900] mb-4">
                    Your Reservations
                  </h3>
                  <div className="space-y-4">
                    {session?.user?.email && (
                      <ReservationList email={session.user.email} />
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="mt-10 flex items-center justify-center md:hidden">
          <NavBar rest_id={restaurant_id} />
        </div>
        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
