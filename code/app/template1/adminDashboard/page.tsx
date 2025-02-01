"use client";

import React, { useEffect, useState } from "react";
import DReservation from "../components/DReservation";
import DInfoCard from "../components/DInfoCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Reservation = {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  guestsCount: number;
  status: string;
};

const AdminDashboard = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [restaurant_id, setRestaurantId] = useState<string | null>(null);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUserRestaurantId = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/session/restaurant/${session.user.email}`);
          if (!response.ok) {
            throw new Error('Failed to fetch restaurant ID');
          }
          const data = await response.json();
          console.log("Fetched restaurant data:", data);
          setRestaurantId(data.restaurant_id);
        } catch (error) {
          console.error("Error fetching user restaurant ID:", error);
        }
      }
    };

    if (status === "authenticated") {
      fetchUserRestaurantId();
    }
  }, [session, status]);

  useEffect(() => {
    const fetchReservations = async () => {
      if (restaurant_id) {
        try {
          setIsLoading(true);
          const res = await fetch(`/api/reservations?restaurant_id=${restaurant_id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch reservations');
          }
          const data = await res.json();
          console.log("Fetched reservations:", data);
          setReservations(data);
        } catch (error) {
          console.error("Error fetching reservations:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (restaurant_id) {
      fetchReservations();
    }
  }, [restaurant_id]);

  const handleReservationUpdate = async (reservationId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/reservations', {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: reservationId, status: newStatus }),
      });

      if (!res.ok) {
        throw new Error('Failed to update reservation status');
      }

      const updatedReservation = await res.json();
      setReservations(prevReservations => 
        prevReservations.map(r => 
          r.id === reservationId ? updatedReservation : r
        )
      );
    } catch (error) {
      console.error("Error updating reservation status:", error);
    }
  };

  const pendingReservations = reservations.filter(r => r.status === "PENDING");
  const acceptedReservations = reservations.filter(r => r.status === "ACCEPTED");

  const totalReservationsToday = reservations.filter(r => {
    const today = new Date().toISOString().split("T")[0];
    return r.date.startsWith(today) && r.status === "ACCEPTED";
  }).length;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 min-h-screen bg-[#0f172a]">
      {/* Reservation Stats Cards */}
      <div className="mt-3 flex w-full justify-between gap-2">
        <DInfoCard title="Total Reservations Today" stats={totalReservationsToday.toString()} percent="" />
        <DInfoCard title="Pending Reservations" stats={pendingReservations.length.toString()} percent="" />
      </div>
      
      {/* Pending Reservations */}
      <div className="flex-col">
        <h2 className="mb-5 mt-6 font-light text-3xl text-gray-200">
          Pending Reservations
        </h2>
        <div className="bg-[#172340] p-5 rounded-lg flex w-full mt-3">
          <div className="w-full flex flex-col">
            <div className="flex justify-between mb-4 font-semibold lg:w-[80%] w-full text-gray-200">
              <h1 className="pl-5">Name</h1>
              <h1 className="pl-7">Date</h1>
              <h1 className="pl-10 ml-3">Time</h1>
              <h1 className="pl-4">Guests</h1>
              <h1 className="pl-4">Actions</h1>
            </div>
            <div>
              {pendingReservations.length > 0 ? (
                pendingReservations.map((item, index) => (
                  <DReservation
                    key={item.id}
                    name={item.name}
                    date={item.date}
                    time={item.time}
                    count={item.guestsCount.toString()}
                    index={index}
                    status="p"
                    onAccept={() => handleReservationUpdate(item.id, "ACCEPTED")}
                    onDecline={() => handleReservationUpdate(item.id, "DECLINED")}
                  />
                ))
              ) : (
                <div className="text-center text-gray-400 py-4">No pending reservations</div>
              )}
            </div>
          </div>
        </div>

        {/* Accepted Reservations */}
        <h2 className="mb-5 mt-6 font-light text-3xl text-gray-200">
          Accepted Reservations
        </h2>
        <div className="bg-[#172340] p-5 rounded-lg flex w-full mt-3">
          <div className="w-full flex flex-col">
            <div className="flex justify-between mb-4 font-semibold lg:w-[80%] w-full text-gray-200">
              <h1 className="pl-5">Name</h1>
              <h1 className="pl-7">Date</h1>
              <h1 className="pl-10 ml-3">Time</h1>
              <h1 className="pl-4">Guests</h1>
            </div>
            <div>
              {acceptedReservations.length > 0 ? (
                acceptedReservations.map((item, index) => (
                  <DReservation
                    key={item.id}
                    name={item.name}
                    date={item.date}
                    time={item.time}
                    count={item.guestsCount.toString()}
                    index={index}
                    status=""
                  />
                ))
              ) : (
                <div className="text-center text-gray-400 py-4">No accepted reservations</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;