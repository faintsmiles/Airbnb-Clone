import React from 'react'
import Image from 'next/image'


export default function Thumbnail({ listingData, location}) {
    // console.log(listingData)
  

    if(!listingData.xl_picture_url) return;
    return (
    <div>
        <div className='relative' >
            <button className='absolute top-4 right-4 z-10' >
            <svg className='h-6 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                {/* <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"/>
            </svg>
            </button>
            { listingData.xl_picture_url && 
                <Image 
                src={listingData.xl_picture_url}
                layout='responsive'
                objectFit="cover"
                width={400}
                height={400}
                className='rounded-lg'
            />

            }
            {/* { !listingData.xl_picture_url && <div>Image not available</div>} */}
        </div>
        <div className='text-sm' >
            <div className='mt-2 flex justify-between'>
                <div className='font-bold'> {listingData.smart_location} </div>
                        {/* If rating doesnt exist assign ** New ** */}
                {   
                    listingData.review_scores_rating 
                    &&
                    <div className='flex items-center '>                    
                        <svg className='h-4 fill-black' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            {/* <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                            <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/>
                        </svg>
                            <span>
                            { Math.round(( (listingData.review_scores_rating / 20) + Number.EPSILON) * 100) / 100   }
                            {/* {listingData.review_scores_rating} */}
                            </span>        
                    </div>
                }
                {   
                    !listingData.review_scores_rating 
                    && 
                    <div> 
                        **New**
                    </div>
                }
            </div>
            <div className='text-gray-500'>Calculate curr distance ?</div>
            <div className='text-gray-500'>Dates Available</div>
            <div> <span className='font-bold mt-2'>${listingData.price}</span> night</div>
        </div>
    </div>
  )
}
