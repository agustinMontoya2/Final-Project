import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar el aside

    const toggleAside = () => {
        setIsOpen(!isOpen); // Alterna el estado del aside
    };

    return (
        <div className="w-full h-auto bg-secondary relative flex justify-evenly">
            <Link href={""} className="h-16 w-1/2 p-2" onClick={toggleAside}>
                <Image src={"/assets/icon/menu.png"} alt="menu" width={45} height={45} />
            </Link>

            <Link href={"/"} className="h-16 w-1/2 p-2 flex justify-end">
                <Image src={"/assets/logo-white.png"} alt="logo" width={100} height={45} />
            </Link>

            <div>
            <aside
                className={`fixed top-0 left-0 w-2/3 h-full bg-primary text-white shadow-lg z-50 transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="h-3/4 flex flex-col p-4">
                    <div className="w-2/3 h-14 flex justify-between items-center">
                        <div onClick={toggleAside} className="w-14 h-full flex items-center">
                            <button>
                                <Image src="/assets/icon/arrow-left.png" alt="menu" width={20} height={20} />
                            </button>
                        </div>
                        <p className="text-black font-extrabold text-2xl mr-1">MenÃº</p>
                    </div>
                    <div>
                        <hr className="border-t-2 border-white mt-4" />
                        <Link href={"/"} className="w-2/3 h-14 bg-white my-6 m-auto rounded-xl shadow-xl flex justify-center items-center">
                            <span className="text-black font-bold text-xl">Pizzas</span>
                        </Link>
                        <hr className="border-t-2 border-white" />
                        <Link href={"/"} className="w-2/3 h-14 bg-white my-6 m-auto rounded-xl shadow-xl flex justify-center items-center">
                            <span className="text-black font-bold text-xl">Burgers</span>
                        </Link>
                        <hr className="border-t-2 border-white" />
                        <Link href={"/"} className="w-2/3 h-14 bg-white my-6 m-auto rounded-xl shadow-xl flex justify-center items-center">
                            <span className="text-black font-bold text-xl">Sandwiches</span>
                        </Link>
                        <hr className="border-t-2 border-white" />
                        <Link href={"/"} className="w-2/3 h-14 bg-white my-6 m-auto rounded-xl shadow-xl flex justify-center items-center">
                            <span className="text-black font-bold text-xl">Chopped</span>
                        </Link>
                        <hr className="border-t-2 border-white" />
                        <Link href={"/"} className="w-2/3 h-14 bg-white my-6 m-auto rounded-xl shadow-xl flex justify-center items-center">
                            <span className="text-black font-bold text-xl">Drinks</span>
                        </Link>
                        <hr className="border-t-2 border-white" />
                        <Link href={"/"} className="w-2/3 h-14 bg-secondary my-6 m-auto rounded-xl shadow-xl flex justify-center items-center">
                            <span className="text-white font-bold text-xl">Reserve</span>
                        </Link>
                    </div>
                </div>
                <div className="h-1/4 flex items-center justify-center">
                    <Link href={"/login"} onClick={toggleAside}><span className="text-neutral-600 font-extrabold text-xl mr-4">Login</span></Link>
                    <span className="text-neutral-600 font-extrabold text-2xl">|</span>
                    <Link href={"/register"} onClick={toggleAside}><span className="text-neutral-600 font-extrabold text-xl ml-4">Register</span></Link>
                </div>
            </aside>

            <aside
                className={`fixed top-0 right-0 w-1/3 h-full bg-transparentmenu text-white shadow-lg z-50 transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
            </aside>
        </div>
        </div>
    );
};

export default Navbar