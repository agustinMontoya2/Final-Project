import Image from "next/image";

export default function Off() {
    return(
        <div className="fixed w-screen h-screen overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/assets/bg-food.jpg"
                    alt="food"
                    layout="fill"
                    objectFit="cover"
                    className="z-0"
                />
            </div>
            <div className="z-10 flex flex-col items-center w-full h-auto p-8">
                {/* <div className="w-1/4 h-16 relative m-auto">
                    <Image src="/assets/logo-white.png" alt="food" layout="fill" objectFit="contain" className=""
                        />
                </div> */}
                <div className="absolute inset-0 flex flex-col items-center justify-center -mt-36">
                        <h2 className="text-2xl font-bold">TODOS LOS DÍAS</h2>
                        <div className="flex items-center -mt-14 -mb-16">
                            <h4 className="text-10xl font-bold">50</h4>
                            <div className="w-auto flex flex-col items-center">
                                <h3 className="text-l font-thin mt-2">HASTA</h3>
                                <h3 className="text-6xl font-bold mt-2">%</h3>
                                <h5 className="text-2xl font-bold mt-2">OFF</h5>
                            </div>
                        </div>
                        <p className="text-sm my-4">EN PRODUCTOS SELECCIONADOS</p>
                        <div className="flex flex-wrap justify-around">
                            <div className="w-1/3 flex flex-col items-center hover:scale-110 cursor-pointer duration-500">
                                <div className="relative w-8 h-6 -mb-3">
                                    <Image src={"/assets/pin.png"} layout="fill" objectFit="contain" alt="pin"></Image>
                                </div>
                                <span className="text-red-500 font-extrabold text-xs bg-[url('/assets/papel.avif')] bg-cover bg-no-repeat  px-3 py-1">LUNES</span>
                                <span className="text-center font-bold text-sm">- Tablas <br />- Woks</span>
                            </div>
                            <div className="w-1/3 flex flex-col items-center hover:scale-110 cursor-pointer duration-500">
                                <div className="relative w-8 h-6 -mb-3">
                                    <Image src={"/assets/pin.png"} layout="fill" objectFit="contain" alt="pin"></Image>
                                </div>
                                <span className="text-red-500 font-extrabold text-xs bg-[url('/assets/papel.avif')] bg-cover bg-no-repeat  px-3 py-1">MARTES</span>
                                <span className="text-center font-bold text-sm">- Hamburguesas</span>
                            </div>
                            <div className="w-1/3 flex flex-col items-center hover:scale-110 cursor-pointer duration-500">
                                <div className="relative w-8 h-6 -mb-3">
                                    <Image src={"/assets/pin.png"} layout="fill" objectFit="contain" alt="pin"></Image>
                                </div>
                                <span className="text-red-500 font-extrabold text-xs bg-[url('/assets/papel.avif')] bg-cover bg-no-repeat  px-3 py-1">MIÉRCOLES</span>
                                <span className="text-center font-bold text-sm">- Toda la Carta</span>
                            </div>
                            <div className="w-1/4 flex flex-col items-center mt-5 hover:scale-110 cursor-pointer duration-500">
                                <div className="relative w-8 h-6 -mb-3">
                                    <Image src={"/assets/pin.png"} layout="fill" objectFit="contain" alt="pin"></Image>
                                </div>
                                <span className="text-red-500 font-extrabold text-xs bg-[url('/assets/papel.avif')] bg-cover bg-no-repeat  px-3 py-1">JUEVES</span>
                                <span className="text-center font-bold text-sm">- Carlitos <br /> Especiales <br />- Pizza</span>
                            </div>
                            <div className="w-1/4 flex flex-col items-center mt-5 hover:scale-110 cursor-pointer duration-500">
                                <div className="relative w-8 h-6 -mb-3">
                                    <Image src={"/assets/pin.png"} layout="fill" objectFit="contain" alt="pin"></Image>
                                </div>
                                <span className="text-red-500 font-extrabold text-xs bg-[url('/assets/papel.avif')] bg-cover bg-no-repeat  px-3 py-1">VIERNES</span>
                                <span className="text-center font-bold text-sm">- Papas con Cheddar <br />- Tragos <br />- Rabas</span>
                            </div>
                            <div className="w-1/4 flex flex-col items-center mt-5 hover:scale-110 cursor-pointer duration-500">
                                <div className="relative w-8 h-6 -mb-3">
                                    <Image src={"/assets/pin.png"} layout="fill" objectFit="contain" alt="pin"></Image>
                                </div>
                                <span className="text-red-500 font-extrabold text-xs bg-[url('/assets/papel.avif')] bg-cover bg-no-repeat  px-3 py-1">SÁBADO</span>
                                <span className="text-center font-bold text-sm">Postres</span>
                            </div>
                            <div className="w-1/4 flex flex-col items-center mt-5 hover:scale-110 cursor-pointer duration-500">
                                <div className="relative w-8 h-6 -mb-3">
                                    <Image src={"/assets/pin.png"} layout="fill" objectFit="contain" alt="pin" />
                                </div>
                                <span className="text-red-500 font-extrabold text-xs bg-[url('/assets/papel.avif')] bg-cover bg-no-repeat px-3 py-1">
                                    DOMINGO
                                </span>
                                <span className="text-center font-bold text-sm">- Pastas</span>
                            </div>


                        </div>
                    </div>
            </div>
        </div>
    )
}
