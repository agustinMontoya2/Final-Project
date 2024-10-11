'use client'

import React, { useState } from 'react';
import { addDays, format } from 'date-fns';

const ReservationForm: React.FC = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [mealType, setMealType] = useState('');
  const [time, setTime] = useState('');
  const [peopleCount, setPeopleCount] = useState(1);

  const mealTimes: { [key: string]: string[] } = {
    Desayuno: ['07:00', '07:30', '08:00'],
    Almuerzo: ['11:00', '11:30', '12:00', '12:30', '13:00'],
    Merienda: ['16:00', '16:30', '17:00', '17:30', '18:00'],
    Cena: ['20:00', '20:30', '21:00'],
  };

  const handleMealChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMealType(e.target.value);
    setTime('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, date, mealType, time, peopleCount });
    // manejar la lógica de reserva
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={format(new Date(), 'yyyy-MM-dd')}
        max={format(addDays(new Date(), 15), 'yyyy-MM-dd')}
        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
        required
      />
      <select
        value={mealType}
        onChange={handleMealChange}
        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
        required
      >
        <option value="" disabled>Selecciona un tipo de comida</option>
        <option value="Desayuno">Desayuno</option>
        <option value="Almuerzo">Almuerzo</option>
        <option value="Merienda">Merienda</option>
        <option value="Cena">Cena</option>
      </select>
      {mealType && (
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
          required
        >
          <option value="" disabled>Selecciona un horario</option>
          {mealTimes[mealType].map((timeOption) => (
            <option key={timeOption} value={timeOption}>{timeOption}</option>
          ))}
        </select>
      )}
      <input
        type="number"
        min="1"
        max="15"
        value={peopleCount}
        onChange={(e) => setPeopleCount(Number(e.target.value))}
        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
        required
      />
      <button
        type="submit"
        className="bg-red-600 text-white py-2 px-4 rounded"
      >
        Reservar
      </button>
    </form>
  );
};

export default ReservationForm;
