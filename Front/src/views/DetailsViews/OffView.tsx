"use client"
import Image from 'next/image'
import React from 'react'

const OffView = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0">
            <Image
                src="/assets/bg-food.jpg"
                alt="food"
                layout="fill"
                objectFit="cover"
                className="z-0"
            />
        </div>
        <div className="z-10 flex flex-col items-center justify-center w-full h-full p-8">
            <div className="absolute inset-0 flex flex-col items-center justify-center -mt-36">
            <h2 className="text-2xl font-bold mt-36">EVERY DAY</h2>
            <div className="flex items-center -mt-14 -mb-16">
                <h4 className="text-10xl font-bold">50</h4>
                <div className="w-auto flex flex-col items-center">
                <h3 className="text-l font-thin mt-2">UP TO</h3>
                <h3 className="text-6xl font-bold mt-2">%</h3>
                <h5 className="text-2xl font-bold mt-2">OFF</h5>
                </div>
            </div>
            <p className="text-sm my-4">ON SELECTED PRODUCTS</p>
            <div className="flex flex-wrap justify-around">
                {/* Días de la semana */}
                <div className="w-1/3 flex flex-col items-center hover:scale-110 cursor-pointer duration-500">
                <div className="relative w-8 h-6 -mb-3">
                    <Image src="/assets/pin.png" layout="fill" objectFit="contain" alt="pin" />
                </div>
                <span className="text-red-500 font-extrabold text-xs bg-[url('/assets/papel.avif')] bg-cover bg-no-repeat px-3 py-1">MONDAY</span>
                <span className="text-center font-bold text-sm">- Boards <br />- Woks</span>
                </div>
                <div className="w-1/3 flex flex-col items-center hover:scale-110 cursor-pointer duration-500">
                    <div className="relative w-8 h-6 -mb-3">
                        <Image src="/assets/pin.png" layout="fill" objectFit="contain" alt="pin" />
                    </div>
                    <span className="text-red-500 font-extrabold text-xs bg-[url('/assets/papel.avif')] bg-cover bg-no-repeat px-3 py-1">TUESDAY</span>
                    <span className="text-center font-bold text-sm">- Burgers</span>
                </div>
                <div className="w-1/3 flex flex-col items-center hover:scale-110 cursor-pointer duration-500">
                    <div className="relative w-8 h-6 -mb-3">
                        <Image src="/assets/pin.png" layout="fill" objectFit="contain" alt="pin" />
                    </div>
                    <span className="text-red-500 font-extrabold text-xs bg-[url('/assets/papel.avif')] bg-cover bg-no-repeat px-3 py-1">WEDNESDAY</span>
                    <span className="text-center font-bold text-sm">- Full Menu</span>
                </div>
                <div className="w-1/4 flex flex-col items-center mt-5 hover:scale-110 cursor-pointer duration-500">
                    <div className="relative w-8 h-6 -mb-3">
                        <Image src="/assets/pin.png" layout="fill" objectFit="contain" alt="pin" />
                    </div>
                    <span className="text-red-500 font-extrabold text-xs bg-[url('/assets/papel.avif')] bg-cover bg-no-repeat px-3 py-1">THURSDAY</span>
                    <span className="text-center font-bold text-sm">- Carlitos <br /> Specials <br />- Pizza</span>
                </div>
                <div className="w-1/4 flex flex-col items-center mt-5 hover:scale-110 cursor-pointer duration-500">
                    <div className="relative w-8 h-6 -mb-3">
                        <Image src="/assets/pin.png" layout="fill" objectFit="contain" alt="pin" />
                    </div>
                    <span className="text-red-500 font-extrabold text-xs bg-[url('/assets/papel.avif')] bg-cover bg-no-repeat px-3 py-1">FRIDAY</span>
                    <span className="text-center font-bold text-sm">- Cheddar Fries <br />- Alcoholic drinks <br />- Fried Fish</span>
                </div>
                <div className="w-1/4 flex flex-col items-center mt-5 hover:scale-110 cursor-pointer duration-500">
                    <div className="relative w-8 h-6 -mb-3">
                        <Image src="/assets/pin.png" layout="fill" objectFit="contain" alt="pin" />
                    </div>
                    <span className="text-red-500 font-extrabold text-xs bg-[url('/assets/papel.avif')] bg-cover bg-no-repeat px-3 py-1">SATURDAY</span>
                    <span className="text-center font-bold text-sm">- Desserts</span>
                </div>
                <div className="w-1/4 flex flex-col items-center mt-5 hover:scale-110 cursor-pointer duration-500">
                    <div className="relative w-8 h-6 -mb-3">
                        <Image src="/assets/pin.png" layout="fill" objectFit="contain" alt="pin" />
                    </div>
                    <span className="text-red-500 font-extrabold text-xs bg-[url('/assets/papel.avif')] bg-cover bg-no-repeat px-3 py-1">SUNDAY</span>
                    <span className="text-center font-bold text-sm">- Pasta</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default OffView;
