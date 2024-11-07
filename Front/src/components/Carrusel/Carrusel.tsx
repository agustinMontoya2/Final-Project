import { useEffect, useState } from "react";
import Image from "next/image";

// Define las props del componente
interface CarouselProps {
    images: string[]; // Especifica que `images` es un arreglo de cadenas
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-4/5 md:w-[60%] m-auto overflow-hidden rounded-lg shadow-lg">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        width={1500}
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