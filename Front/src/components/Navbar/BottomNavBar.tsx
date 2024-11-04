'use client'

import Image from "next/image";
import Link from "next/link"; 
import { usePathname } from "next/navigation";

const BottomNavBar = () => {
    const pathname = usePathname()

    const hidden = pathname === '/'

    return (
        <div>
            {
            !hidden && (
                <div>
                        <div className="w-full h-20 bg-secondary flex p-2 fixed bottom-0 z-20">
                        <Link href={"/"} className="w-1/4 h-full flex flex-col items-center">
                            <div className="relative w-12 h-12">
                                <Image src={"/assets/icon/home.png"} layout="fill" objectFit="contain" alt="Home" />
                            </div>
                            <p className=" font-bold">Home</p>
                        </Link>
                        <Link href={"/"} className="w-1/4 h-full flex flex-col items-center">
                            <div className="relative w-12 h-12">
                                <Image src={"/assets/icon/time.png"} layout="fill" objectFit="contain" alt="Off" />
                            </div>
                            <p className=" font-bold">Reservtaions</p>
                        </Link>
                        <Link href={"/"} className="w-1/4 h-full flex flex-col items-center">
                            <div className="relative w-12 h-12">
                                <Image src={"/assets/icon/list.png"} layout="fill" objectFit="contain" alt="Order" />
                            </div>
                            <p className=" font-bold">Order</p>
                        </Link>
                        <Link href={"/"} className="w-1/4 h-full flex flex-col items-center">
                            <div className="relative w-12 h-12">
                                <Image src={"/assets/icon/person.png"} layout="fill" objectFit="contain" alt="Profile" />
                            </div>
                            <p className=" font-bold">Profile</p>
                        </Link>
                    </div>
                    <div className="h-20"></div>
                </div>
            )
        }
        </div>
    );

};

export default BottomNavBar;
