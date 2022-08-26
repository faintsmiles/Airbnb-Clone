import React from 'react'
import Image from 'next/image'


export default function Thumbnail({ listingData, location}) {
    // console.log(listingData)
  

    if(!listingData.xl_picture_url) return;
    return (
    <div className='relative items-stretch h-full flex-col'>
        <div >
            <div>Heart icon</div>
            { listingData.xl_picture_url && 
                <Image 
                src={listingData.xl_picture_url}
                layout='fill'
                objectFit='cover'
                className='rounded-lg w-full h-full'
                
            />

            }
            {/* { !listingData.xl_picture_url && <div>Image not available</div>} */}
        </div>
        <div>
            <div>{listingData.smart_location}</div>
            <div>{listingData.review_scores_rating}</div>
        </div>
        <div>Calculate curr distance ?</div>
        <div>Dates Available</div>
        <div><span className=''>${listingData.price}</span> night</div>
    </div>
  )
}
