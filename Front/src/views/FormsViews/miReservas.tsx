'use client';
import { getReservations, removeReserve } from '@/Helpers/reservation';
import { useRouter } from "next/navigation";
import { IReserve, IUserSession } from "@/interfaces/productoInterface";
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ReservasView: React.FC = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<IUserSession>();
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [reservas, setReservas] = useState<IReserve[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<IReserve | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedUserData = window.localStorage.getItem("userSession");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      if (parsedData && parsedData.user) {
        setUserId(parsedData.user.user_id);
        setToken(parsedData.token);
        fetchData();
      }
    }
  }, [userData]);

  const fetchData = async () => {
    if (token && userId) {
      try {
        const reservasData = await getReservations(userId, token);
        setReservas(reservasData);
      } catch (error) {
        console.error("Error al obtener reservas", error);
      }
    }
  };
//push
  const handleCancelReserve = async (reservation_id: string) => {
    if (token) {
        try {
            await removeReserve(reservation_id, token);
            Swal.fire({
                title: 'Reservation cancelled',
                icon: 'success',
                timer: 1000,
            });
            fetchData();
        } catch (error) {
            console.error("Error canceling reservation:", error);
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

  const handleViewMore = (reserva: IReserve) => {
    setSelectedReservation(reserva);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReservation(null);
  };

  return (
    <div className="w-3xl flex flex-col justify-center">
      <h1 className='text-neutral-800 text-center text-3xl font-bold my-5'>Scheduled reservations</h1>
      {reservas && reservas.length > 0 ? (
        reservas.map((reserva: IReserve) => (
          <div
            key={reserva.reservation_id}
            className="w-1/2 m-auto bg-white p-6 rounded-lg shadow-lg mb-6 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <section className="border-b border-gray-300 pb-4 mb-4">
              <p className="text-gray-600 mb-1">
                Date:{" "}
                <span className="font-medium text-gray-800">
                  {new Date(reserva.date).toLocaleDateString()}
                </span>
              </p>
              <p className="text-gray-600 mb-1">
                Time:{" "}
                <span className="font-medium text-gray-800">
                  {reserva.time}
                </span>
              </p>
              <p className="text-gray-600 mb-1">
                Status:{" "}
                <span className={`font-medium ${reserva.status ? 'text-green-500' : 'text-red-500'}`}>
                  {reserva.status ? "Active reservation" : "Reservation cancelled"}
                </span>
              </p>
              <p className="text-gray-600 mb-1">
                People:{" "}
                <span className="font-medium text-gray-800">
                  {reserva.peopleCount != null ? reserva.peopleCount : 0}
                </span>
              </p>
            </section>
            {reserva.status ? (
                  <button
                  onClick={() => handleCancelReserve(reserva.reservation_id)}
                  className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Cancel Reservation
                  </button>
                ) : (
                <span className="text-gray-500">No action available</span>
            )}
            <button 
              onClick={() => handleViewMore(reserva)} 
              className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ml-2"
            >
              View More
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-700">
          You do not have any reservations.
        </p>
      )}

      {isModalOpen && selectedReservation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
          <div className="bg-white rounded-lg p-6 shadow-lg z-10 max-w-sm w-full">
            <h2 className="text-gray-800 text-lg font-semibold mb-2">Reservation Details</h2>
            <p className="text-gray-600 mb-1">
              Date:{" "}
              <span className="font-medium text-gray-800">
                {new Date(selectedReservation.date).toLocaleDateString()}
              </span>
            </p>
            <p className="text-gray-600 mb-1">
              Time:{" "}
              <span className="font-medium text-gray-800">
                {selectedReservation.time}
              </span>
            </p>
            <p className="text-gray-600 mb-1">
              Status:{" "}
              <span className={`font-medium ${selectedReservation.status ? 'text-green-500' : 'text-red-500'}`}>
                {selectedReservation.status ? "Active reservation" : "Reservation cancelled"}
              </span>
            </p>
            <p className="text-gray-600 mb-1">
              Number of people:{" "}
              <span className="font-medium text-gray-800">
                {selectedReservation.peopleCount != null ? selectedReservation.peopleCount : 0}
              </span>
            </p>
            <section className="mt-4 border-t border-gray-300 pt-4">
              <h3 className="text-gray-800 font-semibold mb-2">Table Details</h3>
              {selectedReservation.table && selectedReservation.table.length > 0 ? (
                selectedReservation.table.map((table) => (
                  <div key={table.table_id} className="mb-2">
                    <p className="text-gray-600">Table Number: <span className="font-medium text-gray-800">{table.table_number}</span></p>
                    <p className="text-gray-600">Location: <span className="font-medium text-gray-800">{table.ubication}</span></p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">You do not have scheduled reservations</p>
              )}
            </section>  
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservasView;