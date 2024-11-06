'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import WhatsApp from "../WhatsApp/WhatsApp";
import BackButton from "./BackButton";
import { usePathname, useRouter } from "next/navigation";
import { IUserSession } from "@/interfaces/productoInterface";
import Swal from "sweetalert2";
import Footer from "../footer/Footer";

const NavBarMobile = () => {
    const pathname = usePathname()
    const router = useRouter()
    const hidden = pathname  === '/'

    const [isOpen, setIsOpen] = useState(false);
    const [userSession, setUserSession] = useState<IUserSession | null>(null);
    const [isAdmin, setAdmin] = useState<boolean>(false);

    const toggleAside = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, logout',
            cancelButtonText: 'Cancel',
            confirmButtonColor: "#1988f0",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('userSession');
                localStorage.removeItem('isAdmin'); 
                setUserSession(null);
                setAdmin(false); 
                router.push('/');
                window.dispatchEvent(new Event("userSessionUpdated"));
            }
        });
    };

    useEffect(() => {
        const session = localStorage.getItem('userSession');
        if (session) {
            const parsedSession = JSON.parse(session);
            setUserSession(parsedSession);
            setAdmin(parsedSession.isAdmin); // Configura isAdmin desde la sesión
        }
    }, [router, pathname]);

    return (
        <div className="h-20">
            {
                !hidden && (
                    <div>
                        <div className="w-full h-16 bg-secondary flex justify-evenly items-center fixed top-0 z-40">
                            <Link href={"/"} className="h-18 w-1/2 p-2 flex justify-start">
                                <Image src={"/assets/logo-white.png"} alt="logo" width={100} height={45} />
                            </Link>
                            <div className="h-16 w-1/2 p-2 space-x-5 flex items-center justify-end">
                                {
                                    userSession && (
                                        <Link className="" href={"/cart"}>
                                            <Image src={"/assets/icon/cart.png"} width={40} height={40} alt='cart' />
                                        </Link>
                                    )
                                }
                                <Link href={""} className="" onClick={toggleAside}>
                                    <Image src={"/assets/icon/menu.png"} alt="menu" width={45} height={45} />
                                </Link>
                            </div>
                            <div>
                                <aside
                                    className={`fixed top-0 right-0 w-2/3 h-full overflow-y-auto bg-primary text-white shadow-lg z-10 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                                        }`}>
                                    <div className="h-full flex flex-col justify-between p-4">
                                        <div className="w-full h-14 flex justify-between items-center">
                                            <div className='w-16 h-16 overflow-hidden rounded-full border-2 border-white'>
                                                {userSession?.user?.user_img ? (
                                                    <Image src={userSession.user.user_img} width={60} height={60} alt="profile" className="m-auto"/>
                                                ) : (
                                                    <Image src="/assets/icon/profile.png" width={60} height={60} alt="profile" className="m-auto"/>
                                                )}
                                            </div>
                                            <div onClick={toggleAside} className="w-14 h-full flex items-center">
                                                <button>
                                                    <Image src="/assets/icon/arrow-right.png" alt="menu" width={30} height={30} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="h-full flex flex-col justify-between">
                                        <div className="mt-6">
                                            {userSession ? (
                                                isAdmin ? (
                                                    <div className="space-y-6">
                                                        <h2 className="text-center text-neutral-800 text-xl font-bold">Administration panel</h2>
                                                        <Link className="w-11/12 m-auto text-left px-5 py-2 flex justify-between bg-neutral-100 rounded-lg" onClick={toggleAside} href={"/menu"}>
                                                            <p className="text-black font-bold text-lg">Menú</p>
                                                            <Image src={"/assets/icon/carta.png"} width={30} height={30} alt='statistics' />
                                                        </Link>
                                                        <Link className="w-11/12 m-auto text-left px-5 py-2 flex justify-between bg-neutral-100 rounded-lg" onClick={toggleAside} href={"/adminMobile/ChartsView"}>
                                                            <p className="text-black font-bold text-lg">Statistics</p>
                                                            <Image src={"/assets/icon/Statistics.png"} width={30} height={30} alt='statistics' />
                                                        </Link>
                                                        <Link className="w-11/12 m-auto text-left px-5 py-2 flex justify-between bg-neutral-100 rounded-lg" onClick={toggleAside} href={"/adminMobile/users"}>
                                                            <p className="text-black font-bold text-lg">Users</p>
                                                            <Image src={"/assets/icon/persons.png"} width={30} height={30} alt='users' />
                                                        </Link>
                                                        <Link className="w-11/12 m-auto text-left px-5 py-2 flex justify-between bg-neutral-100 rounded-lg" onClick={toggleAside} href={"/adminMobile/reserves"}>
                                                            <p className="text-black font-bold text-lg">Reserves</p>
                                                            <Image src={"/assets/icon/timeblack.png"} width={30} height={30} alt='reservations' />
                                                        </Link>
                                                        <Link className="w-11/12 m-auto text-left px-5 py-2 flex justify-between bg-neutral-100 rounded-lg" onClick={toggleAside} href={"/adminMobile/orders"}>
                                                            <p className="text-black font-bold text-lg">Orders</p>
                                                            <Image src={"/assets/icon/listblack.png"} width={30} height={30} alt='orders' />
                                                        </Link>
                                                        <Link className="w-11/12 m-auto text-left px-5 py-2 flex justify-between bg-neutral-100 rounded-lg" onClick={toggleAside} href={"/adminMobile/reviews"}>
                                                            <p className="text-black font-bold text-lg">Reviews</p>
                                                            <Image src={"/assets/icon/view.png"} width={30} height={30} alt='reviews' />
                                                        </Link>
                                                        <Link className="w-11/12 m-auto text-left px-5 py-2 flex justify-between bg-neutral-100 rounded-lg" onClick={toggleAside} href={"/adminMobile/dishes"}>
                                                            <p className="text-black font-bold text-lg">Dishes</p>
                                                            <Image src={"/assets/icon/food.png"} width={30} height={30} alt='dishes' />
                                                        </Link>
                                                        <Link className="w-11/12 m-auto text-left px-5 py-2 flex justify-between bg-neutral-100 rounded-lg" onClick={toggleAside} href={"/adminMobile/createDish"}>
                                                            <p className="text-black font-bold text-lg">Create Dish</p>
                                                            <Image src={"/assets/icon/add.png"} width={30} height={30} alt='add dish' />
                                                        </Link>
                                                        <button
                                                            className="w-11/12 m-auto text-left px-5 text-lg text-black font-bold py-2 flex justify-between bg-neutral-100 rounded-lg"
                                                            onClick={handleLogout}
                                                        >
                                                            Logout
                                                            <Image src="/assets/icon/logout.png" width={30} height={30} alt='' />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-6">
                                                        <Link className="w-11/12 m-auto text-left px-5 py-2 flex justify-between bg-neutral-100 rounded-lg" onClick={toggleAside} href={"/menu"}>
                                                            <p className="text-black font-bold text-lg">Menú</p>
                                                            <Image src={"/assets/icon/carta.png"} width={30} height={30} alt='statistics' />
                                                        </Link>
                                                        <Link className="w-11/12 m-auto text-left px-5 py-2 flex justify-between bg-neutral-100 rounded-lg" onClick={toggleAside} href={"/profile"}>
                                                            <p className="text-black font-bold text-lg">Profile</p>
                                                            <Image src={"/assets/icon/personblack.png"} width={30} height={30} alt='' />
                                                        </Link>
                                                        <Link className="w-11/12 m-auto text-left px-5 py-2 flex justify-between bg-neutral-100 rounded-lg" onClick={toggleAside} href={"/reservations"}>
                                                            <p className="text-black font-bold text-lg">My reservations</p>
                                                            <Image src={"/assets/icon/reserve.png"} width={30} height={30} alt='' />
                                                        </Link>
                                                        <Link className="w-11/12 m-auto text-left px-5 py-2 flex justify-between bg-neutral-100 rounded-lg" onClick={toggleAside} href={"/favorites"}>
                                                            <p className="text-black font-bold text-lg">Favorite dishes</p>
                                                            <Image src={"/assets/icon/star.png"} width={30} height={30} alt='' />
                                                        </Link>
                                                        <Link className="w-11/12 m-auto text-left px-5 py-2 flex justify-between bg-neutral-100 rounded-lg" onClick={toggleAside} href={"/orders"}>
                                                            <p className="text-black font-bold text-lg">My orders</p>
                                                            <Image src={"/assets/icon/listblack.png"} width={30} height={30} alt='' />
                                                        </Link>
                                                        <button
                                                            className="w-11/12 m-auto text-left px-5 py-2 flex justify-between text-black font-bold bg-neutral-100 rounded-lg"
                                                            onClick={handleLogout}
                                                        >
                                                            Logout
                                                            <Image src="/assets/icon/logout.png" width={30} height={30} alt='' />
                                                        </button>
                                                    </div>
                                                )
                                            ) : (
                                                <div className="space-y-4">
                                                    <Link className="w-11/12 m-auto text-left px-5 py-2 flex justify-between bg-neutral-100 rounded-lg" onClick={toggleAside} href={"/aboutus"}>
                                                        <p className="text-black font-bold text-lg">About us</p>
                                                        <Image src={"/assets/icon/info.png"} width={30} height={30} alt='' />
                                                    </Link>
                                                    <Link className="w-11/12 m-auto text-left px-5 py-2 flex justify-between bg-neutral-100 rounded-lg" onClick={toggleAside} href={"/menu"}>
                                                        <p className="text-black font-bold text-lg">Menú</p>
                                                        <Image src={"/assets/icon/carta.png"} width={30} height={30} alt='' />
                                                    </Link>
                                                    <Link className="w-11/12 m-auto text-left px-5 py-2 flex justify-between bg-neutral-100 rounded-lg" onClick={toggleAside} href={"/off"}>
                                                        <p className="text-black font-bold text-lg">50% OFF</p>
                                                        <Image src={"/assets/icon/percentegeblack.png"} width={30} height={30} alt='' />
                                                    </Link>
                                                    <Link className="w-11/12 m-auto text-left px-5 py-2 flex justify-between bg-neutral-100 rounded-lg" onClick={toggleAside} href={"/contact"}>
                                                        <p className="text-black font-bold text-lg">Contact</p>
                                                        <Image src={"/assets/icon/contact.png"} width={30} height={30} alt='' />
                                                    </Link>
                                                    <Link className="w-11/12 m-auto text-left px-5 py-2 flex justify-between bg-neutral-100 rounded-lg" onClick={toggleAside} href={"/work"}>
                                                        <p className="text-black font-bold text-lg">Work with us</p>
                                                        <Image src={"/assets/icon/cheff.png"} width={30} height={30} alt='' />
                                                    </Link>
                                                    <div className="h-1/4 flex items-center justify-center">
                                                        <Link href={"/login"} onClick={toggleAside}>
                                                            <span className="text-neutral-500 font-extrabold text-xl mr-4">Login</span>
                                                        </Link>
                                                        <span className="text-neutral-500 font-extrabold text-2xl">|</span>
                                                        <Link href={"/register"} onClick={toggleAside}>
                                                            <span className="text-neutral-500 font-extrabold text-xl ml-4">Register</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                            <div className="flex flex-row flex-wrap w-full ">
                                                <div className="md:w-3/4 w-full flex flex-wrap justify-evenly ">
                                                    <h1 className="w-full text-lg text-neutral-800 font-semibold  flex justify-center">Find us</h1>
                                                    <Link target='_blank' href={"https://www.google.com/maps/place/Club+Fellini/@-32.9564897,-60.6464365,17z/data=!3m1!4b1!4m6!3m5!1s0x95b7ab0e50048a05:0xe7807dfd0c9e4c81!8m2!3d-32.9564942!4d-60.6438616!16s%2Fg%2F1tfmj_lv?entry=ttu&g_ep=EgoyMDI0MTAxMy4wIKXMDSoASAFQAw%3D%3D"} className="w-auto h-auto p-3 rounded-xl flex flex-col items-center justify-center hover:scale-110 duration-500">
                                                        <Image src={"/assets/icon/locationblack.png"} alt="" width="40" height="40"></Image>
                                                    </Link>
                                                    <Link target='_blank' href={"https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSBnpsHrfBpWPZqSrWvQJhlCxKHdFvSjFrNfrzqQPhFkwQLLLDdSbkvhsSWRVlvnFnKDZBzl"} className="w-auto h-auto p-3 rounded-xl flex flex-col items-center justify-center hover:scale-110 duration-500">
                                                        <Image src={"/assets/icon/gmailblack.png"} alt="" width="40" height="40"></Image>
                                                    </Link>
                                                    <Link href="https://www.instagram.com/barclubfellini/?hl=es" target='_blank' className="w-auto h-auto p-3 rounded-xl flex flex-col items-center justify-center hover:scale-110 duration-500">
                                                        <Image src={"/assets/icon/igblack.png"} alt="" width="35" height="35"></Image>
                                                    </Link>
                                                    <Link href="https://www.facebook.com/ClubFellini/" target='_blank' className="w-auto h-auto p-3 rounded-xl flex flex-col items-center justify-center hover:scale-110 duration-500">
                                                        <Image src={"/assets/icon/facebookblack.png"} alt="" width="40" height="40"></Image>
                                                    </Link>
                                                </div>
                                                <Link href="/Team" className="text-sm font-semibold text-blue-700 m-auto underline">
                                                    Meet the Team
                                                </Link>
                                                <div className='w-full'>
                                                    <p className="mt-1 text-xs text-black text-center">
                                                        © 2024 C. Fellini.
                                                        All right reserved.
                                                    </p>
                                                </div>
                                            </div>
                                    </div>
                                </aside>
                                <aside onClick={toggleAside}
                                    className={`fixed top-0 left-0 w-1/3 h-full bg-transparentmenu text-white shadow-lg z-10 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                                        }`}
                                >
                                    <WhatsApp />
                                </aside>
                            </div>
                        </div>
                        <div className='w-10 mt-20 -mb-32  cursor-pointer z-30 fixed'>
                            <BackButton />
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default NavBarMobile;
