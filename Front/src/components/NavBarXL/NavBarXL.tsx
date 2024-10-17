import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import BackButton from '../BackButton/BackButton';
import Dropdown from '../Dropdowm/Dropdown';

export default function NavBarXL() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [userSession, setUserSession] = useState(null);
    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        const session = localStorage.getItem('userSession');
        if (session) {
            setUserSession(JSON.parse(session));
        }
    }, [pathname]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        if (selectedValue) {
            router.push(selectedValue);
        }
    };

    return (
        <div className='flex flex-col'>
            <div className="w-full h-18 bg-secondary flex justify-evenly items-center fixed top-0 z-40">
                <Link href={"/"} className="h-16 w-1/3 p-2 flex justify-start">
                    <div className='relative h-full w-36'>
                        <Image src={"/assets/logo-white.png"} alt="logo" layout='fill' objectFit='contain'/>
                    </div>
                </Link>

                <div className='w-2/3 flex justify-evenly'>
                    <Link className="w-11 h-16 flex justify-center items-center hover:drop-shadow-2xl" href={"/"}>
                        <p className="text-white font-bold hover:text-neutral-300 duration-500">Home</p>
                    </Link>
                    <Link className="w-11 h-16 flex justify-center items-center hover:drop-shadow-2xl" href={"/menu"}>
                        <p className="text-white font-bold hover:text-neutral-300 duration-500">Menú</p>
                    </Link>
                    <Link className="w-11 h-16 flex justify-center items-center hover:drop-shadow-2xl" href={"/off"}>
                        <p className="text-white font-bold hover:text-neutral-300 duration-500">OFF</p>
                    </Link>

                    <select name="" id="" onChange={handleChange} value={selectedCategory} className='bg-transparent text-white font-bold hover:text-neutral-300 duration-500 outline-none cursor-pointer'>
                        <option value="" hidden>Category</option>
                        <option className='text-neutral-800 text-l hover:bg-primary' value="/pizzas">Pizzas</option>
                        <option className='text-neutral-800 text-l hover:bg-primary' value="/chopped">Chopped</option>
                        <option className='text-neutral-800 text-l hover:bg-primary' value="/burgers">Burgers</option>
                        <option className='text-neutral-800 text-l hover:bg-primary' value="/drinks">Drinks</option>
                        <option className='text-neutral-800 text-l hover:bg-primary' value="/veggie">Veggie</option>
                        <option className='text-neutral-800 text-l hover:bg-primary' value="/cafe">Café</option>
                        <option className='text-neutral-800 text-l hover:bg-primary' value="/tac">Sin T.A.C</option>
                    </select>

                    <Link className="w-11 h-16 flex justify-center items-center hover:drop-shadow-2xl" href={"/order"}>
                        <p className="text-white font-bold hover:text-neutral-300 duration-500">Order</p>
                    </Link>
                    <Link className="w-11 h-16 flex justify-center items-center hover:drop-shadow-2xl" href={"/reserve"}>
                        <p className="text-white font-bold hover:text-neutral-300 duration-500">Reserve</p>
                    </Link>
                    <Dropdown />
                </div>
            </div>
                <div className='w-10 mt-16 -mb-32 p-4 cursor-pointer z-50 fixed'>
                    <BackButton />
                </div>
        </div>
    );
}
