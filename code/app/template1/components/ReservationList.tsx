"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface Reservation {
  id: string
  date: string
  time: string
  guestsCount: number
  status: string
}

interface ReservationListProps {
  email: string
}

const ReservationList: React.FC<ReservationListProps> = ({ email }) => {
  const [reservations, setReservations] = useState<Reservation[]>([])

  useEffect(() => {
    fetchReservations()
  }, [])

  const fetchReservations = async () => {
    try {
      const response = await fetch(`/api/reservations?email=${email}`)
      if (response.ok) {
        const data = await response.json()
        // Filter out past and cancelled reservations
        const currentDate = new Date()
        const activeReservations = data.filter((reservation: Reservation) => {
          const reservationDate = new Date(reservation.date)
          return reservationDate >= currentDate && reservation.status !== "CANCELLED"
        })
        setReservations(activeReservations)
      } else {
        console.error("Failed to fetch reservations")
      }
    } catch (error) {
      console.error("Error fetching reservations:", error)
    }
  }

  const handleCancel = async (bookingId: string) => {
    try {
      const response = await fetch("/api/cancelReservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId }),
      })

      if (response.ok) {
        // Remove the cancelled reservation from the list immediately
        setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== bookingId))
      } else {
        console.error("Failed to cancel reservation")
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error)
    }
  }

  const canCancel = (status: string) => ["ACCEPTED", "DECLINED", "PENDING"].includes(status)

  return (
    <div className="space-y-4">
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-[#0f172a] p-4 rounded-lg border border-gray-700 flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold mb-2">Date: {new Date(reservation.date).toLocaleDateString()}</p>
              <p className="text-gray-300">Time: {reservation.time}</p>
              <p className="text-gray-300">Guests: {reservation.guestsCount}</p>
              <p className="text-gray-300 mt-2">
                Status:{" "}
                <span
                  className={`${
                    reservation.status === "PENDING"
                      ? "text-yellow-400"
                      : reservation.status === "ACCEPTED"
                        ? "text-green-400"
                        : "text-red-400"
                  }`}
                >
                  {reservation.status}
                </span>
              </p>
            </div>
            {canCancel(reservation.status) && (
              <button
                onClick={() => handleCancel(reservation.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-400">You have no upcoming reservations.</p>
      )}
    </div>
  )
}

export default ReservationList