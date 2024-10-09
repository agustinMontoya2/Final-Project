import Image from "next/image"
import Link from "next/link"
import React from "react"

const Navbar = () => {
    return(
        <div className="w-full h-auto bg-secondary relative flex justify-evenly">
            <Link href={""} className="h-16 w-1/2 p-2"><Image src={"/assets/icon/menu.png"} alt="menu" width={45} height={45} /></Link>

            <Link href={"/"} className="h-16 w-1/2 p-2 flex justify-end"><Image src={"/assets/logo-white.png"} alt="menu" width={100} height={0} /></Link>

        </div>
    )
}

export default Navbar