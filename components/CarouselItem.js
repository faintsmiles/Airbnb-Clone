import React from 'react'
import Image from 'next/image'

export default function CarouselItem({element}) {
  return (
    <div className='h-max w-max carouselItem flex flex-col justify-end py-2 px-4 hover:font-bold hover:border-b-2 hover:cursor-pointer'>
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
