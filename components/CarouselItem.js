import React from 'react'
import Image from 'next/image'

export default function CarouselItem({element}) {
  return (
    <div className='carouselItem h-max w-max flex flex-col justify-end py-2 px-4 text-gray-400 font-bold hover:text-black hover:border-b-2 hover:cursor-pointer'>
        <div className='relative h-8'>
            <Image 
              src={element.icon}
              alt={element.type + ' icon'}
              width={24}
              height={24}
            />
        </div>
        <div className='h-6 text-center text-xs' > { element.type } </div>
    </div>
  )
}
