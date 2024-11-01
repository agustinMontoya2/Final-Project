import { ProductFilterProps } from "@/interfaces/productoInterface";
import Image from "next/image";
import React from "react";

const ProductFilter: React.FC<ProductFilterProps> = ({  setFilter, searchTerm, setSearchTerm }) => {
    return (
        <div className="w-[76%] flex justify-between m-auto">
            <div className="flex justify-center mb-4">
                <button onClick={() => setFilter("Beverages")} className="mx-2 bg-secondary text-white py-1 px-3 rounded">Beverages</button>
                <button onClick={() => setFilter("Main Dishes")} className="mx-2 bg-secondary text-white py-1 px-3 rounded">Main Dishes</button>
                <button onClick={() => setFilter("Appetizers")} className="mx-2 bg-secondary text-white py-1 px-3 rounded">Appetizers</button>
                <button onClick={() => setFilter("Sides")} className="mx-2 bg-secondary text-white py-1 px-3 rounded">Sides</button>
                <button onClick={() => setFilter("Desserts")} className="mx-2 bg-secondary text-white py-1 px-3 rounded">Desserts</button>
                <button onClick={() => setFilter("")} className="mx-2 bg-gray-500 text-white py-1 px-3 rounded">Clear Filter</button>
            </div>
            <div className="flex justify-center mb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search dish..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-72 border border-gray-300 rounded-md pl-10 pr-3 py-1 text-gray-700 outline-none"
                    />
                    <Image
                        src="/assets/icon/search.png"
                        alt="Search Icon"
                        width={20}
                        height={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;
