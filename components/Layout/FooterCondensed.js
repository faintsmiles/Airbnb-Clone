import React from 'react'
// Fontawesome
import { faGlobe, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function FooterCondensed() {
  return (
    <div className='hidden sm:flex fixed bottom-0 w-full h-24 sm:h-14 p-4 md:px-15 lg:px-24 2xl:px-48 
    justify-between items-center text-sm bg-slate-300 z-50'>
        <div className='space-x-1 whitespace-nowrap flex w-full flex-wrap'>
            <a href='/' className='hover:underline' >© 2022 Airbnb, Inc.</a>
            <span >·</span>
            <a href='/' className='hover:underline'>Privacy</a>
            <span >·</span>
            <a href='/' className='hover:underline'>Terms</a>
            <span>·</span>
            <a href='/' className='hover:underline' >Sitemap</a>
            <span>·</span>
            <a href='/' className='hover:underline'>Destinations</a>
        </div>
        <div className='w-full flex justify-end items-center space-x-2 overflow-x-visible font-bold whitespace-nowrap '>
            <a href='/'>
                <FontAwesomeIcon icon={faGlobe} className=' text-base'/>
            </a>
            <a href='/' className='hover:underline' >English(US)</a>
            <a href='/' className='hover:underline'>$ USD</a>
            <a href='/'>
                <button>
                    <div href='/' className='flex hover:underline'>
                        <span> Support & resources &nbsp; </span>
                        <FontAwesomeIcon icon={faChevronUp} />                
                    </div>
                </button>
            </a>
        </div>
    </div>
  )
}
