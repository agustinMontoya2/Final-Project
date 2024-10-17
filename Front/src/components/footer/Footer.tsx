import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="w-full bg-secondary text-white py-2 mt-10">
            <div className="flex flex-row justify-around flex-wrap w-full px-4">
                <div className="w-1/2 flex flex-wrap justify-around ">
                    <h1 className="w-full text-lg font-semibold  flex justify-center">Contactanos</h1>
                    <Link target='_blank' href={"https://www.google.com/maps/place/Club+Fellini/@-32.9564897,-60.6464365,17z/data=!3m1!4b1!4m6!3m5!1s0x95b7ab0e50048a05:0xe7807dfd0c9e4c81!8m2!3d-32.9564942!4d-60.6438616!16s%2Fg%2F1tfmj_lv?entry=ttu&g_ep=EgoyMDI0MTAxMy4wIKXMDSoASAFQAw%3D%3D"} className="w-auto h-auto bg-red-700 p-3 rounded-xl flex flex-col items-center justify-center">
                        <h2 className="text-md font-semibold">Dirección:</h2>
                        <p className="text-xs">Pellegrini 1308</p>
                        <p className="text-xs">Rosario</p>
                        <p className="text-xs">Argentina</p>
                    </Link>
                    <Link target='_blank' href={"https://wa.me/5493416899356"} className="w-auto h-auto bg-red-700 p-3 rounded-xl flex flex-col items-center justify-center">
                        <h2 className="text-md font-semibold">Celular:</h2>
                        <p className="text-xs">0341 596-5650</p>
                    </Link>
                    <Link target='_blank' href={"https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSBnpsHrfBpWPZqSrWvQJhlCxKHdFvSjFrNfrzqQPhFkwQLLLDdSbkvhsSWRVlvnFnKDZBzl"} className="w-auto h-auto bg-red-700 p-3 rounded-xl flex flex-col items-center justify-center">
                        <h2 className="text-md font-semibold">Email:</h2>
                        <p className="text-xs">info@clubfellini.com.ar</p>
                    </Link>
                </div>
                <div className="w-1/2 flex items-center flex-wrap">
                    <div className='w-1/2 h-full flex flex-col justify-center items-center'>
                        <div className="h-10">
                            <h1 className="text-lg font-semibold">Seguinos en:</h1>
                        </div>
                        <div className="w-1/2 h-24 m-auto flex justify-around items-center bg-red-700 rounded-xl">
                            <Link href="https://www.instagram.com/barclubfellini/?hl=es" target='_blank' className='hover:scale-125 duration-500'>
                                <Image src={"/assets/icon/instagram.png"} alt="" width="40" height="40"></Image>
                            </Link>
                            <Link href="https://www.facebook.com/ClubFellini/" target='_blank' className='hover:scale-125 duration-500'>
                                <Image src={"/assets/icon/facebook.png"} alt="" width="40" height="40"></Image>
                            </Link>
                        </div>
                    </div>
                    <div className='w-1/2 flex justify-end'>
                        <Image src={"/assets/logo-white.png"} alt="" width="100" height="100"></Image>
                    </div>
                </div>
                <div className='w-full'>
                    <p className="mt-1 text-xs text-center">
                        © 2024 C. Fellini. <br />
                        Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer