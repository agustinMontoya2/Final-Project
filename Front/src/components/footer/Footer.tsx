'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Footer = () => {
    const pathname = usePathname()

    const hidden = pathname  === '/'

    return (
        <>
            {
                hidden && (
                    <footer className=" w-full bg-secondary text-white py-2 mt-10">
                        <div className="flex flex-row justify-around flex-wrap w-full px-4">
                            <div className="w-full md:w-3/4 flex flex-wrap justify-around ">
                                <h1 className="w-full text-lg font-semibold flex justify-center">Find us</h1>
                                <Link target='_blank' href={"https://www.google.com/maps/place/Club+Fellini/@-32.9564897,-60.6464365,17z/data=!3m1!4b1!4m6!3m5!1s0x95b7ab0e50048a05:0xe7807dfd0c9e4c81!8m2!3d-32.9564942!4d-60.6438616!16s%2Fg%2F1tfmj_lv?entry=ttu&g_ep=EgoyMDI0MTAxMy4wIKXMDSoASAFQAw%3D%3D"} className="w-auto h-auto p-3 rounded-xl flex flex-col items-center justify-center hover:scale-110 duration-500">
                                    <Image src={"/assets/icon/location.png"} alt="" width="40" height="40"></Image>
                                </Link>
                                <Link target='_blank' href={"https://wa.me/5493416899356"} className="w-auto h-auto p-3 rounded-xl flex flex-col items-center justify-center hover:scale-110 duration-500">
                                    <Image src={"/assets/icon/wsp (2).png"} alt="" width="40" height="40"></Image>
                                </Link>
                                <Link target='_blank' href={"https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSBnpsHrfBpWPZqSrWvQJhlCxKHdFvSjFrNfrzqQPhFkwQLLLDdSbkvhsSWRVlvnFnKDZBzl"} className="w-auto h-auto p-3 rounded-xl flex flex-col items-center justify-center hover:scale-110 duration-500">
                                    <Image src={"/assets/icon/gmail.png"} alt="" width="40" height="40"></Image>
                                </Link>
                                <Link href="https://www.instagram.com/barclubfellini/?hl=es" target='_blank' className="w-auto h-auto p-3 rounded-xl flex flex-col items-center justify-center hover:scale-110 duration-500">
                                    <Image src={"/assets/icon/instagram.png"} alt="" width="40" height="40"></Image>
                                </Link>
                                <Link href="https://www.facebook.com/ClubFellini/" target='_blank' className="w-auto h-auto p-3 rounded-xl flex flex-col items-center justify-center hover:scale-110 duration-500">
                                    <Image src={"/assets/icon/facebook.png"} alt="" width="40" height="40"></Image>
                                </Link>
                            </div>
                            <div className="w-full mt-4 flex flex-col items-center">
                                <Link href="/Team" className="text-sm font-semibold text-white hover:underline">
                                    Meet the Team
                                </Link>
                                <p className="mt-1 text-xs text-center">
                                    © 2024 C. Fellini. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </footer>
                )
            }
        </>
    )
}

export default Footer
