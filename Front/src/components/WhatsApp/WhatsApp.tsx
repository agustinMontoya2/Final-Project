import Image from "next/image"
import Link from "next/link"
import React from "react"

const WhatsApp = () => {
    return(
<div className="relative w-16 h-16">
            <button className="fixed right-0 bottom-0 z-50">
                <Image
                    src="/assets/icon/wsp.png"
                    layout="fill"
                    objectFit="contain"
                    alt="numero fellini"
                />
            </button>
        </div>
    )
};

export default WhatsApp