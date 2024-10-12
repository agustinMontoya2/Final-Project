import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-2 mt-10">
            <div id="root" className="flex justify-center items-center h-auto">
                <div className="flex flex-row md:flex-row justify-around w-full md:w-3/4 px-4">
                    <div className="mb-4 md:mb-0 md:w-1/2">
                        <h1 className="text-lg font-semibold mb-2">Contactanos</h1>
                        <div className="mb-2">
                            <h2 className="text-md font-semibold">Dirección:</h2>
                            <p className="text-xs">Pellegrini 1308</p>
                            <p className="text-xs">Rosario</p>
                            <p className="text-xs">Argentina</p>
                        </div>
                        <div className="mb-2">
                            <h2 className="text-md font-semibold">Celular:</h2>
                            <p className="text-xs">0341 596-5650</p>
                        </div>
                        <div>
                            <h2 className="text-md font-semibold">Email:</h2>
                            <p className="text-xs">info@clubfellini.com.ar</p>
                        </div>
                    </div>
                    <div className="text-center md:w-1/2 flex flex-col items-center">
                        <div className="mb-2">
                            <h1 className="text-lg font-semibold">Seguinos en</h1>
                        </div>
                        <div className="flex justify-center space-x-2 mb-2">
                            <Image src={"/assets/icon/instagram.png"} alt="" width="30" height="30"></Image>
                            <Image src={"/assets/icon/facebook.png"} alt="" width="30" height="30"></Image>
                        </div>
                        <div className="mt-2 mb-2">
                            <Image src={"/assets/logo-white.png"} alt="" width="100" height="100"></Image>
                        </div>
                        <p className="mt-1 text-xs">© 2024 C. Fellini.
                            <br />Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>

  )
}

export default Footer