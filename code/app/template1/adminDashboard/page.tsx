"use client"

import { useEffect, useRef, useState } from "react"
import DReservation from "../components/DReservation"
import DInfoCard from "../components/DInfoCard"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

type Reservation = {
  id: string
  name: string
  email: string
  date: string
  time: string
  guestsCount: number
  status: string
}

const deletePastReservations = async (restaurantId: string) => {
  try {
    const res = await fetch(`/api/reservations/?restaurant_id=${restaurantId}`, { method: "DELETE" })
    if (!res.ok) throw new Error("Failed to delete past reservations")
    const data = await res.json()
    console.log("Deleted past reservations:", data.deletedCount)
  } catch (error) {
    console.error("Error deleting past reservations:", error)
  }
}

const AdminDashboard = () => {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [restaurant_id, setRestaurantId] = useState<string | null>(null)
  const initialFetchDone = useRef(false)

  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router])

  useEffect(() => {
    const fetchUserRestaurantId = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(
            `/api/session/restaurant/${session.user.email}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch restaurant ID");
          }
          const data = await response.json();
          setRestaurantId(data.restaurant_id);
        } catch (error) {
          console.error("Error fetching user restaurant ID:", error)
        }
      }
    }

    if (status === "authenticated") {
      fetchUserRestaurantId()
    }
  }, [session, status])

  // Function to delete past reservations
  const deletePastReservations = async (restaurantId: string) => {
    try {
      const res = await fetch(
        `/api/reservations/?restaurant_id=${restaurantId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to delete past reservations");
      const data = await res.json();
      console.log("Deleted past reservations:", data.deletedCount);
    } catch (error) {
      console.error("Error deleting past reservations:", error);
    }
  };

  useEffect(() => {
    const fetchReservations = async () => {
      if (restaurant_id && !initialFetchDone.current) {
        try {
          setIsLoading(true);

          // Delete past reservations before fetching
          await deletePastReservations(restaurant_id);

          // Fetch updated reservations
          const res = await fetch(
            `/api/reservations?restaurant_id=${restaurant_id}`
          );
          if (!res.ok) throw new Error("Failed to fetch reservations");
          const data = await res.json();
          setReservations(data);
        } catch (error) {
          console.error("Error fetching reservations:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }
  }, [restaurant_id]);
  const handleReservationUpdate = async (
    reservationId: string,
    newStatus: string
  ) => {
    try {
      const res = await fetch("/api/reservations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: reservationId, status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update reservation status");
      }

      const updatedReservation = await res.json();
      setReservations((prevReservations) =>
        prevReservations.map((r) =>
          r.id === reservationId ? updatedReservation : r
        )
      } else {
        // Use the existing endpoint for other status updates
        const res = await fetch("/api/reservations", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: reservationId, status: newStatus }),
        })

        if (!res.ok) {
          throw new Error("Failed to update reservation status")
        }

        const updatedReservation = await res.json()
        setReservations((prevReservations) =>
          prevReservations.map((r) => (r.id === reservationId ? updatedReservation : r))
        )
      }
    } catch (error) {
      console.error("Error updating reservation status:", error)
      // Revert the optimistic update if the API call fails
      setReservations((prevReservations) =>
        prevReservations.map((r) => (r.id === reservationId ? { ...r, status: r.status } : r))
      )
    }
  }

  const pendingReservations = reservations.filter(
    (r) => r.status === "PENDING"
  );
  const acceptedReservations = reservations.filter(
    (r) => r.status === "ACCEPTED"
  );

  const totalReservationsToday = reservations.filter((r) => {
    const today = new Date().toISOString().split("T")[0];
    return r.date.startsWith(today) && r.status === "ACCEPTED";
  }).length;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  const ReservationTable = ({ title, reservations, status }: { 
    title: string, 
    reservations: Reservation[], 
    status: "p" | "a" | "c" 
  }) => (
    <div className="mb-8">
      <h2 className="mb-4 font-light text-3xl text-gray-200">{title}</h2>
      <div className="bg-[#172340] p-5 rounded-lg">
        <div className="grid grid-cols-12 gap-4 mb-4 font-semibold text-gray-200">
          <div className="col-span-3">Name</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Time</div>
          <div className="col-span-2">Guests</div>
          <div className="col-span-3">{status === "c" ? "Status" : "Actions"}</div>
        </div>
        <div className="space-y-2">
          {reservations.length > 0 ? (
            reservations.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 text-gray-200 items-center">
                <div className="col-span-3 truncate">{item.name}</div>
                <div className="col-span-2">{new Date(item.date).toLocaleDateString('en-US', { 
                  month: 'numeric', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</div>
                <div className="col-span-2">{item.time}</div>
                <div className="col-span-2">{item.guestsCount}</div>
                <div className="col-span-3">
                  {status === "p" && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleReservationUpdate(item.id, "ACCEPTED")}
                        className="px-3 py-1 bg-green-600 rounded-md hover:bg-green-700"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => handleReservationUpdate(item.id, "DECLINED")}
                        className="px-3 py-1 bg-red-600 rounded-md hover:bg-red-700"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                  {status === "a" && (
                    <button 
                      onClick={() => handleReservationUpdate(item.id, "CANCELLED")}
                      className="px-3 py-1 bg-red-600 rounded-md hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  )}
                  {status === "c" && (
                    <span className="text-gray-400">Cancelled</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-4">No {title.toLowerCase()}</div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col p-4 min-h-screen bg-[#0f172a]">
      <div className="mt-3 flex w-full justify-between gap-2">
        <DInfoCard
          title="Total Reservations Today"
          stats={totalReservationsToday.toString()}
          percent=""
        />
        <DInfoCard
          title="Pending Reservations"
          stats={pendingReservations.length.toString()}
          percent=""
        />
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
                    onAccept={() =>
                      handleReservationUpdate(item.id, "ACCEPTED")
                    }
                    onDecline={() =>
                      handleReservationUpdate(item.id, "DECLINED")
                    }
                  />
                ))
              ) : (
                <div className="text-center text-gray-400 py-4">
                  No pending reservations
                </div>
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
                <div className="text-center text-gray-400 py-4">
                  No accepted reservations
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;
