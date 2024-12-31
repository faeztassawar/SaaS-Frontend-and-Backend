"use client";

import React, { useEffect, useState } from 'react';

interface Reservation {
  id: string;
  date: string;
  time: string;
  guestsCount: number;
  status: string;
}

interface ReservationListProps {
  email: string;
}

const ReservationList: React.FC<ReservationListProps> = ({ email }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`/api/reservations?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
        } else {
          console.error('Failed to fetch reservations');
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [email]);

  return (
    <div className="space-y-4">
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <div key={reservation.id} className="bg-[#0f172a] p-4 rounded-lg border border-gray-700">
            <p className="text-lg font-semibold mb-2">Date: {new Date(reservation.date).toLocaleDateString()}</p>
            <p className="text-gray-300">Time: {reservation.time}</p>
            <p className="text-gray-300">Guests: {reservation.guestsCount}</p>
            <p className="text-gray-300 capitalize mt-2">
              Status: <span className={`${
                reservation.status === 'PENDING' ? 'text-yellow-400' :
                reservation.status === 'ACCEPTED' ? 'text-green-400' :
                'text-red-400'
              }`}>{reservation.status.toLowerCase()}</span>
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-400">You have no reservations yet.</p>
      )}
    </div>
  );
};

export default ReservationList;

