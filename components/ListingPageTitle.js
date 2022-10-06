import React from 'react'
import Image from 'next/image'

import { faStar, faShare } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ListingPageTitle({roomData}) {
  return (
    // <div className=' w-full flex flex-col  lg:p-8 lg:flex-col-reverse' >
    //     <div className='w-full m-auto p-auto  bg-blue-50'>
    //         <img  src={roomData.xl_picture_url} alt="" className='listing-page-title-image '  />
    //     </div>
    

    <div className=' my-0 mx-auto flex flex-col md:p-8 lg:flex-col-reverse' >
        <div className='bg-blue-50'>
            <Image  
                src={roomData.xl_picture_url} 
                alt="" 
                layout='intrinsic'
                objectFit='cover'
                width={1120}
                height={460}
                className='lg:rounded-lg'  
            />
        </div>
        <div className='border-b mx-6 py-8 lg:mx-0 lg:border-none'>
            <div className='pb-4 font-bold text-xl'>
                {roomData.summary}
            </div>
            <div className='flex justify-between'>
                <div>
                    <span className='px-1 whitespace-nowrap'>
                        <FontAwesomeIcon icon={faStar} />  
                        { roomData.review_scores_rating  ? (Math.round(( (roomData.review_scores_rating / 20) + Number.EPSILON) * 100) / 100 ) : "**New**"  }
                    </span>
                    <span className='px-2'>·</span>
                    <span className=' underline cursor-pointer whitespace-nowrap'>
                        {roomData.number_of_reviews + ' reviews'}
                    </span>
                    <span className='px-2'>·</span>
                    <span className=' underline cursor-pointer whitespace-nowrap' >{roomData.smart_location}</span>
                </div>
                <div className='hidden sm:block'>
                    <span className=' p-1 underline cursor-pointer whitespace-nowrap hover:bg-slate-100 rounded-sm'>
                        <FontAwesomeIcon icon={faShare} />
                        <span className='pl-2'>Share</span>
                    </span>
                    <span className='p-1 underline cursor-pointer whitespace-nowrap hover:bg-slate-100 rounded-sm'>
                        <FontAwesomeIcon icon={faHeart} />
                        <span className='pl-2'>Save</span>
                    </span>
                </div>
            </div>
        </div>
        {/* <div>
            <span>{roomData.guests_included + ' guests' }</span>
            <span className='px-2'>·</span>
            <span> {roomData.bedrooms + ' bedrooms'} </span>
            <span className='px-2'>·</span>
            <span> {roomData.beds + ' beds'} </span>
            <span className='px-2'>·</span>
            <span> {roomData.bathrooms + ' baths'} </span>
        </div> */}
    </div>
  )
}
