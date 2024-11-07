'use client'

import { IUserSession } from "@/interfaces/productoInterface";
import Image from "next/image";
import Link from "next/link"; 
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const BottomNavBar = () => {
    const pathname = usePathname()

    const hidden = pathname === '/'

    const [userSession, setUserSession] = useState<IUserSession | null>(null);
    const [isAdmin, setAdmin] = useState<boolean>(false);

    useEffect(() => {
        const session = localStorage.getItem('userSession');
        if (session) {
            const parsedSession = JSON.parse(session);
            setUserSession(parsedSession);
            setAdmin(parsedSession.isAdmin); // Configura isAdmin desde la sesión
        }
    }, [pathname]);

    return (
        <>
        {
            userSession && (
                <div>
            {
            !hidden && (
                <div>
                        <div className="w-full h-16 bg-secondary flex p-2 fixed bottom-0 z-20">
                        <Link href={"/"} className="w-1/4 h-full flex flex-col items-center">
                            <div className="relative w-12 h-12">
                                <Image src={"/assets/icon/home.png"} layout="fill" objectFit="contain" alt="Home" />
                            </div>
                            <p className="text-sm font-bold">Home</p>
                        </Link>
                        <Link href={"/reserve"} className="w-1/4 h-full flex flex-col items-center">
                            <div className="relative w-12 h-12">
                                <Image src={"/assets/icon/time.png"} layout="fill" objectFit="contain" alt="Off" />
                            </div>
                            <p className="text-sm font-bold">Reservations</p>
                        </Link>
                        <Link href={"/orders"} className="w-1/4 h-full flex flex-col items-center">
                            <div className="relative w-12 h-12">
                                <Image src={"/assets/icon/list.png"} layout="fill" objectFit="contain" alt="Order" />
                            </div>
                            <p className="text-sm font-bold">Order</p>
                        </Link>
                        {isAdmin ? (
                            <Link href={"/adminMobile/profileAdmin"} className="w-1/4 h-full flex flex-col items-center">
                                <div className="relative w-12 h-12">
                                    <Image src={"/assets/icon/person.png"} layout="fill" objectFit="contain" alt="Order" />
                                </div>
                                <p className="text-sm font-bold">Profile</p>
                            </Link>
                        ) : (
                            <Link href={"/profile"} className="w-1/4 h-full flex flex-col items-center">
                                <div className="relative w-12 h-12">
                                    <Image src={"/assets/icon/person.png"} layout="fill" objectFit="contain" alt="Order" />
                                </div>
                                <p className="text-sm font-bold">Profile</p>
                            </Link>
                        )}
                    </div>
                    <div className="h-20"></div>
                </div>
            )
        }
        </div>
            )
        }
        </>
        
    );

};

export default BottomNavBar;