import { useEffect, useState } from "react";
import Image from "next/image";

const Carousel = ({ images }) => {
const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
    const interval = setInterval(() => {
    setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    }, 7000); // 3000 ms = 3 segundos

    return () => clearInterval(interval); 
}, [images.length]);

return (
    <div className="relative w-full max-w-lg mx-auto overflow-hidden rounded-lg shadow-lg">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                <Image
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                width={800}
                height={200}
                className="w-full object-cover"
                    />
                ))}
            </div>

            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <div
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                    index === currentIndex ? "bg-white" : "bg-gray-400"
                    }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
