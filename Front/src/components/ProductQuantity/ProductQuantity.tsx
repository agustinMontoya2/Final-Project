import React, { useState, useRef } from 'react';

const ProductQuantity = () => {
    const [quantity, setQuantity] = useState(1);
    const intervalRef = useRef<NodeJS.Timeout | null>(null); 

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1)); 
    };

    const startIncreasing = () => {
        increaseQuantity(); 
        intervalRef.current = setInterval(increaseQuantity, 200);
    };

    const startDecreasing = () => {
        decreaseQuantity();
        intervalRef.current = setInterval(decreaseQuantity, 200); 
    };

    const stopChange = () => {
        if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        }
    };

    return (
        <div className="bg-white flex items-center">
            <button
                onMouseDown={startDecreasing}
                onMouseUp={stopChange}
                onMouseLeave={stopChange}
                className="text-black  px-4 py-2 hover:bg-gradient-l z-10"
            >
                -
            </button>
            <input
                type="text"
                value={quantity}
                readOnly
                className="bg-transparent border-none text-center w-7 rounded py-2 outline-none text-black"
            />
            <button
                onMouseDown={startIncreasing}
                onMouseUp={stopChange}
                onMouseLeave={stopChange}
                className="text-black  px-4 py-2 hover:bg-gradient-r z-10"
            >
                +
            </button>
        </div>
    );
};

export default ProductQuantity;
