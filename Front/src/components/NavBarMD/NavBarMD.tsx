import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function NavBarMD() {
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
            <Link href={"/"} className="h-24 w-1/3 p-2 flex justify-start">
                <div className='relative h-full w-36'>
                    <Image src={"/assets/logo-white.png"} alt="logo" layout='fill' objectFit='contain'/>
                </div>
            </Link>
            <div className='w-2/3 flex justify-evenly'>
                <select name="" id="" onChange={handleChange} value={selectedCategory} className='bg-transparent text-white font-bold text-2xl outline-none cursor-pointer'>
                    <option value="" hidden>Category</option>
                    <option className='text-neutral-800 text-xs hover:bg-primary' value="/pizzas">Pizzas</option>
                    <option className='text-neutral-800 text-xs hover:bg-primary' value="/chopped">Chopped</option>
                    <option className='text-neutral-800 text-xs hover:bg-primary' value="/burgers">Burgers</option>
                    <option className='text-neutral-800 text-xs hover:bg-primary' value="/drinks">Drinks</option>
                    <option className='text-neutral-800 text-xs hover:bg-primary' value="/veggie">Veggie</option>
                    <option className='text-neutral-800 text-xs hover:bg-primary' value="/cafe">Café</option>
                    <option className='text-neutral-800 text-xs hover:bg-primary' value="/tac">Sin T.A.C</option>
                </select>

                <Link href={"/reserve"}>
                    <p className="text-white font-bold text-2xl">Reserve</p>
                </Link>
                <Link href={"/login"}>
                    <p className="text-white font-bold text-2xl">Login</p>
                </Link>
                <Link href={"/register"}>
                    <p className="text-white font-bold text-2xl">Register</p>
                </Link>
            </div>
            
        </div>
    )
}

export default NavBarMD
