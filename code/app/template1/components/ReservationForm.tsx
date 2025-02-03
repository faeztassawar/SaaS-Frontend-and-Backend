"use client"

import type React from "react"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { format, isBefore, startOfDay } from "date-fns"
import { CalendarIcon, ClockIcon } from "lucide-react"

const ReservationForm = ({ restaurant_id }: { restaurant_id: string }) => {
  const { data: session } = useSession()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guestsCount: 2,
    date: "",
    time: "",
  })
  const [successMessage, setSuccessMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value)
    const today = startOfDay(new Date())

    if (isBefore(selectedDate, today)) {
      alert("Please select a future date.")
      return
    }

    setFormData({ ...formData, date: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!session) {
      alert("Please log in to make a reservation")
      return
    }

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          restaurant_id,
          email: session.user?.email,
          guestsCount: Number(formData.guestsCount),
          date: new Date(formData.date),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setSuccessMessage("Reservation request submitted successfully!")
        setFormData({
          name: "",
          email: "",
          guestsCount: 2,
          date: "",
          time: "",
        })
      } else {
        const errorData = await response.json()
        alert(`Failed to submit reservation request: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Error submitting reservation:", error)
      alert("An error occurred while submitting your reservation")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap justify-between">
      <label className="mb-2 text-xl opacity-80 leading-[160%] w-full">Name</label>
      <input
        className="bg-[#1d1f21] border-2 border-gray-600 focus:outline-none focus:border-[#face8d] opacity-70 rounded-[10px] w-full mb-8 p-4 h-14"
        type="text"
        placeholder="Enter your name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <label className="mb-2 text-xl opacity-80 leading-[160%] w-full">Number Of Guests</label>
      <input
        className="bg-[#1d1f21] border-2 border-gray-600 focus:outline-none focus:border-[#face8d] opacity-70 rounded-[10px] w-full mb-8 p-4 h-14"
        type="number"
        min="1"
        max="12"
        placeholder="2"
        name="guestsCount"
        value={formData.guestsCount}
        onChange={handleChange}
        required
      />
      <div className="flex w-full gap-2 items-center justify-between">
        <div className="w-1/2 relative">
          <h1 className="mb-2 text-xl opacity-80 leading-[160%]">Date</h1>
          <div className="relative">
            <input
              className="bg-[#1d1f21] w-full border-2 border-gray-600 focus:outline-none focus:border-[#face8d] opacity-70 rounded-[10px] mb-8 p-4 h-14 pl-10"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleDate}
              required
              min={format(new Date(), "yyyy-MM-dd")}
            />
          </div>
        </div>
        <div className="w-1/2 relative">
          <h1 className="mb-2 text-xl opacity-80 leading-[160%]">Time</h1>
          <div className="relative">
            <input
              className="bg-[#1d1f21] w-full border-2 border-gray-600 focus:outline-none focus:border-[#face8d] opacity-70 rounded-[10px] mb-8 p-4 h-14 pl-10"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full font-bol bg-[#face8d] font-[700] transition hover:scale-105 text-black text-xl p-30 h-14 rounded-[30px]"
      >
        BOOK A TABLE
      </button>
      {successMessage && <p className="w-full text-green-500 text-center mt-4">{successMessage}</p>}
    </form>
  )
}

export default ReservationForm
