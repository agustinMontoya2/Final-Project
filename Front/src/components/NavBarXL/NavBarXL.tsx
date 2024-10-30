import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import BackButton from '../BackButton/BackButton';
import Dropdown from '../Dropdowm/Dropdown';
import Swal from 'sweetalert2';
import DashboardAdmind from '@/app/dashboardAdmin/page';

interface UserSession {
    name: string;
}

export default function NavBarXL() {
    const [userSession, setUserSession] = useState<UserSession | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isAdmin, setAdmin] = useState<boolean>(false);
    const [isBanned, setIsBanned] = useState<boolean>(false);


    useEffect(() => {
        const storedIsAdmin = localStorage.getItem('isAdmin');
        setAdmin(storedIsAdmin === 'true');
    }, []);

    useEffect(() => {
        const storedIsBanned = localStorage.getItem('isBanned');
        setIsBanned(storedIsBanned === 'true');
    }, []);

    useEffect(() => {
        if (isAdmin && (pathname === '/dashboardAdmin')) {
            router.back();
        } else if (isAdmin && (pathname === '/profile')) {
            router.back();
        }
    }, [pathname, router])

    // useEffect(() => {
    //     if (isBanned) {
    //         Swal.fire({
    //             title: 'Your account has been blocked indefinitely',
    //             icon: 'warning',
    //             confirmButtonText: 'accept',
    //             confirmButtonColor: "#1988f0"
    //         })
    //     }
    // }, [pathname, router])

    useEffect(() => {
        const userData = localStorage.getItem('userSession');
        if (userData) {
            setUserSession(JSON.parse(userData));
        }
    }, [pathname]);

    useEffect(() => {
        const token_auth0 = searchParams.get('token_auth0'); // Extrae el token de los parámetros de la URL

        if (token_auth0) { // Si existe el token
            // Almacena el token en Local Storage
            localStorage.setItem('authToken', token_auth0);
            // Redirige al usuario a la página de inicio
            router.push('/');
        }
    }, [searchParams, router]);

    ;
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        if (selectedValue) {
            router.push(selectedValue);
        }
    };

    const handleReservation = () => {
        if (!userSession) {
            Swal.fire({
                title: 'To make a reservation, you must log in',
                icon: 'warning',
                confirmButtonText: 'accept',
                confirmButtonColor: "#1988f0"
            })
            router.push("/login")
        }
    }

    return (
        <div className='flex flex-col'>
            <div className="w-full h-auto bg-secondary flex justify-between items-center fixed top-0 z-40">
                <Link href={"/"} className="h-16 w-1/3 p-2 flex justify-start">
                    <div className='relative h-full w-36'>
                        <Image src={"/assets/logo-white.png"} alt="logo" layout='fill' objectFit='contain'/>
                    </div>
                </Link>
                <div className='w-1/2 flex justify-around items-center'>
                    <Link className="w-7 h-16 flex justify-center items-center hover:drop-shadow-2xl" href={"/menu"}>
                        <p className="text-white font-bold hover:text-neutral-300 duration-500">Menú</p>
                    </Link>
                    <Link  onClick={handleReservation} className="w-7 h-16 flex justify-center items-center hover:drop-shadow-2xl" href={"/reserve"}>
                        <p className="text-white font-bold hover:text-neutral-300 duration-500">Reservation</p>
                    </Link>
                    <Dropdown />
                    {
                        userSession && (
                            <Link className="" href={"/cart"}>
                                <Image src={"/assets/icon/cart.png"} width={40} height={40} alt='' />
                            </Link>
                        )
                    }
                    {
                        !isAdmin  && ( <DashboardAdmind /> )
                    }
                </div>
            </div>
            <div className='w-10 mt-16 -mb-32 p-4 cursor-pointer z-50 fixed'>
                <BackButton />
            </div>
        </div>
    );
}
