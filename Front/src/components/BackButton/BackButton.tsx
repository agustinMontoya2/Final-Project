import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function BackButton() {
    const router = useRouter()

    const handleBack = () => {
        router.back()
    }
  return (
    <div onClick={handleBack} className='w-8 h-8 cursor-pointer flex items-center '>
        <Image src="/assets/icon/back.png" width="30" height="30" alt=""></Image>
        {/* <p className='text-neutral-800 font-bold'>
            BACK
        </p> */}
    </div>
  )
}
