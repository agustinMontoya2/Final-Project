import { IUserSession } from '@/interfaces/productoInterface';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

export default function Dropdown() {
    const [userSession, setUserSession] = useState<IUserSession | null>(null);
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const session = localStorage.getItem('userSession');
        if (session) {
            setUserSession(JSON.parse(session));
        }
    }, []);

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
                setUserSession(null);
                router.push('/');
                window.dispatchEvent(new Event("userSessionUpdated"));
            }
        });
    };

    return (
        <div className="relative flex items-center" ref={dropdownRef}>
            <div className='w-12 h-12 cursor-pointer relative' onClick={toggleDropdown}>
                <Image src="/assets/icon/profile.png" layout='fill' objectFit='contain' alt='' />
            </div>
            {userSession && userSession.user && (
                <p className='text-white font-semibold ml-2'>{userSession.user.name}</p>
            )}
            <div className={`absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-10 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'h-auto opacity-100' : 'max-h-0 opacity-0'}`}>
                {userSession ? (
                    <>
                        <Link className="block w-full text-left px-4 py-2 hover:bg-gray-100" href={"/profile"}>
                            <p className="text-black font-bold">Profile</p>
                        </Link>
                        <Link className="block w-full text-left px-4 py-2 hover:bg-gray-100" href={"/reservations"}>
                            <p className="text-black font-bold">My reservations</p>
                        </Link>
                        <Link className="block w-full text-left px-4 py-2 hover:bg-gray-100" href={"/favorites"}>
                            <p className="text-black font-bold">Favorite dishes</p>
                        </Link>
                        <Link className="block w-full text-left px-4 py-2 hover:bg-gray-100" href={"/orders"}>
                            <p className="text-black font-bold">My orders</p>
                        </Link>
                        <button
                            className="w-full text-left px-4 py-2 flex justify-between hover:bg-gray-100 text-black font-bold"
                            onClick={handleLogout}
                        >
                            Logout
                            <Image src="/assets/icon/logout.png" width={"25"} height="25" alt='' />
                        </button>
                    </>
                ) : (
                    <>
                        <Link className="flex justify-between w-full text-left px-4 py-2 hover:bg-gray-100" href={"/login"}>
                            <p className="text-black font-bold">Login</p>
                            <Image src="/assets/icon/login.png" width={"25"} height="25" alt='' />
                        </Link>
                        <Link className="block w-full text-left px-4 py-2 hover:bg-gray-100" href={"/register"}>
                            <p className="text-black font-bold">Register</p>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
