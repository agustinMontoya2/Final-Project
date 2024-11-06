import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const WhatsAppButton = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="fixed left-5 top-4 z-50 w-14 h-14">
            <Link href={"https://wa.me/5493415965650"} target="_blank" rel="noopener noreferrer">
                <button
                    className="w-full h-full relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Image
                        src="/assets/icon/wsp.png"
                        layout="fill"
                        objectFit="contain"
                        alt="numero fellini"
                        className={`transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                    />
                    <Image
                        src="/assets/icon/wsphover.png"
                        layout="fill"
                        objectFit="contain"
                        alt="numero fellini"
                        className={`transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    />
                </button>
            </Link>
        </div>
    );
};

export default WhatsAppButton;