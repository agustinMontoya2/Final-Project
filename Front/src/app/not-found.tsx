import Image from "next/image"
import Link from "next/link"

function NotFound() {
    return(
        <div className="w-full h-[55vh] flex flex-row items-center justify-center">
            <div className="relative w-1/4 h-full mr-5">
                <Image src="/assets/logo-red.svg" alt="" layout="fill" objectFit="contain" className="h-96 drop-shadow-custom-grey"/>
            </div>
            <div className="h-1/2 flex items-center flex-col justify-evenly">
                <p className="text-4xl text-neutral-900">404 | PÁGINA NO ENCONTRADA</p>
                <Link href="/" className="w-auto h-auto  bg-secondary hover:bg-red-700 py-3 px-5 text-2xl font-bold rounded-xl">BACK TO HOME</Link>
            </div>
        </div>
    )
}

export default NotFound