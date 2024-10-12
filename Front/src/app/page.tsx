import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <div className="w-full h-40 flex justify-center items-center relative">
        <Image src={"/assets/logo-red.svg"} alt="Club fellini" layout="fill" objectFit="contain" className="w-3/4 h-auto mt-5"/>
      </div>
      <div className="w-full h-4/5 flex flex-col items-center m-auto md:w-3/4 2xl:w-1/2">
        <Link href={"/menu"} className="w-10/12 h-14 m-auto mt-12 border-4 border-red-600 rounded-xl hover:bg-red-600 duration-500 shadow-2xl">
            <h3 className="w-full h-full flex justify-center items-center text-red-600 text-xl font-extrabold hover:text-white">MENÚ</h3>
        </Link>
        <Link href={"/off"} className="w-10/12 h-14 m-auto mt-8 border-4 border-red-600 rounded-xl hover:bg-secondary duration-500 shadow-2xl">
            <h3 className="w-full h-full flex justify-center items-center text-red-600 text-xl font-extrabold hover:text-white">50% OFF</h3>
        </Link>
        <Link href={"/login"} className="w-10/12 h-14 m-auto mt-8 border-4 border-red-600 rounded-xl hover:bg-red-600 duration-500 shadow-2xl">
            <h3 className="w-full h-full flex justify-center items-center text-red-600 text-xl font-extrabold hover:text-white">RESERVE</h3>
        </Link>
        <Link href={"/contact"} className="w-10/12 h-14 m-auto mt-8 border-4 border-red-600 rounded-xl hover:bg-red-600 duration-500 shadow-2xl">
            <h3 className="w-full h-full flex justify-center items-center text-red-600 text-xl font-extrabold hover:text-white">CONTACT</h3>
        </Link>
        <Link href={"/work"} className="w-10/12 h-14 m-auto mt-8 border-4 border-red-600 rounded-xl hover:bg-red-600 duration-500 shadow-2xl">
            <h3 className="w-full h-full flex justify-center items-center text-red-600 text-xl font-extrabold hover:text-white">WORK WITH US
            </h3>
        </Link>
        <Link href={"/register"} className="w-10/12 h-14 m-auto mt-8 border-4 border-red-600 rounded-xl hover:bg-red-600 duration-500 shadow-2xl">
            <h3 className="w-full h-full flex justify-center items-center text-red-600 text-xl font-extrabold hover:text-white">REGISTER</h3>
        </Link>
        <Link href={"/login"} className="w-10/12 h-14 m-auto mt-8 border-4 border-red-600 rounded-xl hover:bg-red-600 duration-500 shadow-2xl">
            <h3 className="w-full h-full flex justify-center items-center text-red-600 text-xl font-extrabold hover:text-white">LOGIN</h3>
        </Link>
      </div>
    </div>
  );
}