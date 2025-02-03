import type React from "react"

type DReservationProps = {
  name: string
  date: string
  time: string
  count: string
  index: number
  status: string
  onAccept?: () => void
  onDecline?: () => void
  onCancel?: () => void
}

const DReservation: React.FC<DReservationProps> = ({
  name,
  date,
  time,
  count,
  index,
  status,
  onAccept,
  onDecline,
  onCancel,
}) => {
  return (
    <div className={`flex justify-between items-center p-3 rounded-lg mb-3 ${index % 2 === 0 ? "bg-[#1e2c4f]" : ""}`}>
      <h1 className="lg:w-[20%] w-[25%]">{name}</h1>
      <h1 className="lg:w-[20%] w-[25%]">{date}</h1>
      <h1 className="lg:w-[20%] w-[25%]">{time}</h1>
      <h1 className="lg:w-[20%] w-[25%]">{count}</h1>
      {status === "p" && (
        <div className="flex gap-2">
          <button onClick={onAccept} className="bg-green-500 text-white px-2 py-1 rounded">
            Accept
          </button>
          <button onClick={onDecline} className="bg-red-500 text-white px-2 py-1 rounded">
            Decline
          </button>
        </div>
      )}
      {status === "a" && (
        <button onClick={onCancel} className="bg-yellow-500 text-white px-2 py-1 rounded">
          Cancel
        </button>
      )}
      {status === "c" && <span className="text-gray-400">Cancelled</span>}
    </div>
  )
}

export default DReservation