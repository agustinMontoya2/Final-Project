'use client';

import { IUserSession } from '@/interfaces/productoInterface';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

export default function Dropdown() {
    const router = useRouter();
    const pathname = usePathname();
    const [userSession, setUserSession] = useState<IUserSession | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const [isAdmin, setAdmin] = useState<boolean>(false);

    useEffect(() => {
        const token_auth0 = searchParams.get('token_auth0');
        if (token_auth0) {
            localStorage.setItem('authToken', token_auth0);
            router.push('/');
        }
    }, [searchParams, router]);

    useEffect(() => {
        const session = localStorage.getItem('userSession');
        if (session) {
            const parsedSession = JSON.parse(session);
            setUserSession(parsedSession);
            setAdmin(parsedSession.isAdmin); // Configura isAdmin desde la sesión
        }
    }, [router, pathname]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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

    return (
        <div className="relative flex items-center" ref={dropdownRef}>
            <div className='w-12 h-12 overflow-hidden rounded-full border-2 border-white'>
                {userSession?.user?.user_img ? (
                    <Image src={userSession.user.user_img} width={50} height={50} alt="profile" className="m-auto" onClick={toggleDropdown} />
                ) : (
                    <Image src="/assets/icon/profile.png" width={50} height={50} alt="profile" className="m-auto" onClick={toggleDropdown} />
                )}
            </div>
            <div className={`absolute right-0 w-44 bg-white border rounded shadow-lg z-10 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`} style={{ top: '100%', marginTop: '8px' }}>
                {userSession ? (
                    <div>
                        {isAdmin ? (
                            <Link className="w-full text-left px-3 py-2 flex justify-between hover:bg-gray-100 text-black font-bold" href={"/admin/profileAdmin"}>
                                <p className="text-black font-bold">Profile admin</p>
                                <Image src={"/assets/icon/personblack.png"} width={23} height={23} alt='' />
                            </Link>
                        ) : (
                            <Link className="w-full text-left px-3 py-2 flex justify-between hover:bg-gray-100 text-black font-bold" href={"/profile"}>
                                <p className="text-black font-bold">Profile</p>
                                <Image src={"/assets/icon/personblack.png"} width={23} height={23} alt='' />
                            </Link>
                        )}
                        <Link className="w-full text-left px-3 py-2 flex justify-between hover:bg-gray-100 text-black font-bold" href={"/reservations"}>
                            <p className="text-black font-bold">My reservations</p>
                            <Image src={"/assets/icon/reserve.png"} width={23} height={23} alt='' />
                        </Link>
                        <Link className="w-full text-left px-3 py-2 flex justify-between hover:bg-gray-100 text-black font-bold" href={"/favorites"}>
                            <p className="text-black font-bold">Favorite dishes</p>
                            <Image src={"/assets/icon/star.png"} width={23} height={23} alt='' />
                        </Link>
                        <Link className="w-full text-left px-3 py-2 flex justify-between hover:bg-gray-100 text-black font-bold" href={"/orders"}>
                            <p className="text-black font-bold">My orders</p>
                            <Image src={"/assets/icon/listblack.png"} width={23} height={23} alt='' />
                        </Link>
                        <button
                            className="w-full text-left px-3 py-2 flex justify-between hover:bg-gray-100 text-black font-bold"
                            onClick={handleLogout}
                        >
                            Logout
                            <Image src="/assets/icon/logout.png" width={23} height={23} alt='' />
                        </button>
                    </div>
                ) : (
                    <div>
                        <Link className="flex justify-between w-full text-left px-2 py-2 hover:bg-gray-100" href={"/login"}>
                            <p className="text-black font-bold">Login</p>
                            <Image src="/assets/icon/login.png" width={"25"} height="25" alt='' />
                        </Link>
                        <Link className="w-full text-left px-2 py-2 hover:bg-gray-100 flex" href={"/register"}>
                            <p className="text-black font-bold">Register</p>
                        </Link>
                    </div>
                )}
            </div>
            {userSession && userSession.user && (
                <p className='text-white font-semibold ml-2'>{userSession.user.name}</p>
            )}
        </div>
    );
}
