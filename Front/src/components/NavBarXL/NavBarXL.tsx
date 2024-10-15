import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function NavBarXL() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        if (selectedValue) {
            router.push(selectedValue);
        }
    };

    return (
        <div className="w-full h-auto bg-secondary flex justify-evenly items-center fixed top-0 z-40">
            <Link href={"/"} className="h-16 w-1/3 p-2 flex justify-start">
                <div className='relative h-full w-36'>
                    <Image src={"/assets/logo-white.png"} alt="logo" layout='fill' objectFit='contain'/>
                </div>
            </Link>

            <div className='w-2/3 flex justify-evenly'>
                <Link className="hover:drop-shadow-2xl" href={"/"}>
                    <p className="text-white font-bold text-xl">Home</p>
                </Link>
                <Link className="hover:drop-shadow-2xl" href={"/off"}>
                    <p className="text-white font-bold text-xl">OFF</p>
                </Link>

                <select name="" id="" onChange={handleChange} value={selectedCategory} className='bg-transparent text-white font-bold text-xl outline-none cursor-pointer'>
                    <option value="" hidden>Category</option>
                    <option className='text-neutral-800 text-l hover:bg-primary' value="/pizzas">Pizzas</option>
                    <option className='text-neutral-800 text-l hover:bg-primary' value="/chopped">Chopped</option>
                    <option className='text-neutral-800 text-l hover:bg-primary' value="/burgers">Burgers</option>
                    <option className='text-neutral-800 text-l hover:bg-primary' value="/drinks">Drinks</option>
                    <option className='text-neutral-800 text-l hover:bg-primary' value="/veggie">Veggie</option>
                    <option className='text-neutral-800 text-l hover:bg-primary' value="/cafe">Café</option>
                    <option className='text-neutral-800 text-l hover:bg-primary' value="/tac">Sin T.A.C</option>
                </select>

                <Link className="hover:drop-shadow-2xl" href={"/order"}>
                    <p className="text-white font-bold text-xl">Order</p>
                </Link>
                <Link className="hover:drop-shadow-2xl" href={"/reserve"}>
                    <p className="text-white font-bold text-xl">Reserve</p>
                </Link>
                <Link className="hover:drop-shadow-2xl" href={"/login"}>
                    <p className="text-white font-bold text-xl">Login</p>
                </Link>
                <Link className="hover:drop-shadow-2xl" href={"/register"}>
                    <p className="text-white font-bold text-xl">Register</p>
                </Link>
                <Link className="hover:drop-shadow-2xl" href={"/user"}>
                    <p className="text-white font-bold text-xl">Profile</p>
                </Link>
            </div>
            
        </div>
    )
}
