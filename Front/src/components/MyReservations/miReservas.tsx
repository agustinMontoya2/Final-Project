'use client'
import { getReservations } from '@/lib/server/reservation'

import { useRouter } from "next/navigation";
import {IReserve, IUserSession} from "@/interfaces/productoInterface"
import React, { useEffect, useState } from 'react';


const ReservasView: React.FC = () => {
  
  const router = useRouter();

    const [userData, setUserData] = useState<IUserSession>();
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [reservas, setReservas] = useState<IReserve[]>([]);
  
    useEffect(() => {
      const storedUserData = window.localStorage.getItem("userSession");
      if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          if (parsedData && parsedData.user) {
              setUserId(parsedData.user.user_id);
              setToken(parsedData.token);
              fetchData()
          }
      }
  }, [userData]);
  
    const fetchData = async () => {
      if(token && userId){
        try {
          const reservasData = await getReservations(userId, token);
          setReservas(reservasData);
        } catch (error) {
          console.error("Error al obtener reservas", error);
        }
      }
    };

    useEffect(() => {
        const userSession = localStorage.getItem("userSession");
        if (!userSession) {
            router.push('/login');
        } else {
            setUserData(JSON.parse(userSession));
        }
    }, [router]);

  return(
    <div className="max-w-3xl mx-auto p-6">
    {reservas && reservas.length > 0 ? (
      reservas.map((reserva: IReserve) => (
        <div
          key={reserva.reservation_id}
          className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4 transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <section>
            <p className="text-gray-300 mb-1">
              Date:{" "}
              <span className="font-light">
                {new Date(reserva.date).toLocaleDateString()}
              </span>
            </p>
            <p>
                Time:{" "}
                <span>
                    {reserva.time}
                </span>
            </p>
            <p>
              status:{" "}
              <span>
        {reserva.status ? "Active reservation" : "Reservation cancelled"}
              </span>
            </p>
            <p>
              Peoples:{" "}
              <span>
              {reserva.peopleCount != null ? reserva.peopleCount : 0}
              </span>
            </p>
          </section>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-900">
          You don't have any reservations.
      </p>
    )}
  </div>
);
};
  
export default ReservasView;