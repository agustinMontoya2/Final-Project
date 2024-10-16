"use client"
import { Character } from "@/interfaces/productoInterface";
import { useEffect, useState } from "react";

const Cards = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        console.log("Fetching characters...");
        
        const response = await fetch(
          "http://localhost:3000/products", {mode: 'no-cors'}
        );
        
        
        if (!response.ok) {
          console.log("Error fetching data");
          
          // throw new Error("Error fetching data");
        }
        const data = await response.json();
        console.log(data);
        
        // console.log(response);
        
        setCharacters(data.results);
      } catch (error) {
        console.log(error);
        
        // throw new Error("error");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
    <h1 className="text-2xl font-bold mb-2 text-black flex justify-center text-center">Menu</h1>
    <div className="flex flex-wrap">
      {characters.map((character) => (
        <div
          key={character.id}
          className="flex items-center bg-third p-4 rounded-sm shadow-md m-1 w-full md:w-1/2 lg:w-1/3 relative hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-2 hover:after:bg-gradient-to-r hover:after:from-blue-500 hover:after:to-purple-500 hover:after:bottom-0 hover:after:left-0 hover:after:blur-md hover:after:opacity-100 hover:after:transition-all"
        >
          <img
            src={character.image}
            alt={character.name}
            className="w-32 h-32 object-cover rounded-lg mr-4"
          />
          <div>
            <h2 className="text-black text-xl font-semibold">{character.name}</h2>
            <p className="text-black text-sm font-semibold">Description: ..........</p>
            <p className="text-black">Price: .....</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Cards;
