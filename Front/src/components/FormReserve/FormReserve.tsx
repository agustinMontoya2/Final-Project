import React, { useState, useEffect } from 'react';
import { IReserve } from '@/interfaces/productoInterface';
import { formReserve,  } from '@/lib/server/reservation';
// fetchReservations

const ReservationForm: React.FC = () => {
    const initialState: IReserve = {
        ubication: '',
        date: new Date().toISOString().split('T')[0], 
        time: '',
        peopleCount: 1,
    };

    const [userData, setUserData] = useState<IReserve>(initialState);
    const [userId, setUserId] = useState<string | null>(null);
    const [mealType, setMealType] = useState<string>(''); 

    const mealTimes: Record<string, string[]> = {
        Breakfast: ['07:00', '07:30', '08:00'],
        Lunch: ['11:00', '11:30', '12:00', '12:30', '13:00'],
        Snack: ['16:00', '16:30', '17:00', '17:30', '18:00'],
        Dinner: ['20:00', '20:30', '21:00'],
    };

    useEffect(() => {
        const storedUserData = window.localStorage.getItem("userSession");
        if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            if (parsedData && parsedData.user) {
                setUserId(parsedData.user.user_id); 
            }
        }
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === 'mealType') {
            setMealType(value);
        } else {
            setUserData(prevData => ({
                ...prevData,
                [name]: name === 'peopleCount' ? Number(value) : value,
            }));
        }
    };

    // const isTableAvailable = async (userData: IReserve): Promise<boolean> => {
    //     try {
    //         const reservations = await fetchReservations();
    
    //         if (!Array.isArray(reservations)) {
    //             console.error("fetchReservations no devolvió un array válido:", reservations);
    //             return true; 
    //         }
    

    //         if (reservations.length === 0) {
    //             console.log("No hay reservas existentes, la mesa está disponible.");
    //             return true;
    //         }
    
    //         const conflictingReservations = reservations.filter((reservation: IReserve) => {
    //             const reservedDateTime = new Date(reservation.date);
    //             const requestedDateTime = new Date(`${userData.date}T${userData.time}:00`);
    
    //             return (
    //                 reservation.ubication === userData.ubication &&
    //                 reservedDateTime.toDateString() === requestedDateTime.toDateString() &&
    //                 Math.abs(requestedDateTime.getTime() - reservedDateTime.getTime()) < 5 * 60 * 60 * 1000 // Menos de 5 horas
    //             );
    //         });
    
    //         return conflictingReservations.length === 0; // Devuelve true si no hay conflictos
    //     } catch (error) {
    //         console.error('No se pudo verificar la disponibilidad de la mesa:', error);
    //         alert('Hubo un problema al verificar la disponibilidad. Por favor, intenta de nuevo más tarde.');
    //         return false; // Asumimos que no está disponible si hay un error
    //     }
    // };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!userId) {
            alert("Debes estar logueado para realizar una reserva.");
            return;
        }

        // const isAvailable = await isTableAvailable(userData);
        // if (!isAvailable) {
        //     alert("La mesa no está disponible para la fecha y hora seleccionadas.");
        //     return;
        // }

        const combinedDateTime = new Date(`${userData.date}T${userData.time}:00`).toISOString();
        const reservationData: IReserve = {
            ubication: userData.ubication,
            date: combinedDateTime,
            time: userData.time,
            peopleCount: userData.peopleCount,
        };

        try {
            const result = await formReserve({ user_id: userId, ...reservationData });
            alert('Reserva exitosa: ' + JSON.stringify(result));
        } catch (error) {
            console.error('Error en la reserva:', error);
            alert('Hubo un problema al realizar la reserva. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center lg:relative lg:h-screen lg:w-1/2 m-auto">
            <form onSubmit={handleSubmit} className="w-full bg-neutral-300 p-6 rounded-lg flex flex-col items-center">
                <h2 className="w-full text-xl text-center text-neutral-800 font-extrabold">Reservar</h2>
                <input type="date" name="date" value={userData.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className="w-4/5 mb-6" required />
                <select name="mealType" value={mealType} onChange={handleChange} className="w-4/5 mb-6" required>
                    <option value="" disabled>Selecciona un tipo de comida</option>
                    {Object.keys(mealTimes).map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                {mealType && (
                    <select name="time" value={userData.time} onChange={handleChange} className="w-4/5 mb-6" required>
                        <option value="" disabled>Selecciona una hora</option>
                        {mealTimes[mealType].map((timeOption) => (
                            <option key={timeOption} value={timeOption}>{timeOption}</option>
                        ))}
                    </select>
                )}
                <select name="ubication" value={userData.ubication} onChange={handleChange} className="w-4/5 mb-6" required>
                    <option value="" disabled>Selecciona una ubicación</option>
                    <option value="Exterior">Exterior</option>
                    <option value="Interior">Interior</option>
                    <option value="Piso Superior">Piso Superior</option>
                </select>
                <input type="number" name="peopleCount" min="1" max="15" value={userData.peopleCount} onChange={handleChange} placeholder="Cantidad de personas" className="w-4/5 mb-6" required />
                <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded-lg">Reservar</button>
            </form>
        </div>
    );
};

export default ReservationForm;