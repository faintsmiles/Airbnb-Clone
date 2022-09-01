import React from 'react'
import Image from 'next/image'

export default function CarouselItem({element}) {
  return (
    <div className='carouselItem flex flex-col justify-end p-4 hover:font-bold hover:border-b-2'>
        <div>
            Icon
            {/* <Image> </Image> */}
        </div>
        <div > { element.type } </div>
    </div>
  )
}
