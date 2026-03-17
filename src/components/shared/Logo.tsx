import Image from 'next/image'
import React from 'react'

export default function Logo() {
  return (
    <div className='h-8 w-8'>
        <Image
        src={"/eland.png"}
        alt='eland'
        height={300}
        width={300}
        />
    </div>
  )
}
