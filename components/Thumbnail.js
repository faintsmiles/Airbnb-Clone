import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Thumbnail({ results, listingID }) {

    // Fields used in thumbnail
    if( !results.geolocation  ) return null;
    if(!results.price  ) return null;
    if(!results.xl_picture_url) return null;
    if (!results.smart_location ) return null;
    return (
        <div className='relative'>
                <button className='absolute top-4 right-4 z-10'>
                    <FontAwesomeIcon className='heart text-black text-opacity-50 text-xl' icon={faHeart} />
                </button>
            <div>
            <Link 
                href={{ 
                    pathname:`listings/${listingID}`, 
                    query: {
                        filler: "176262402122865703321029156979",
                        data: JSON.stringify(results)
                    }
                }} 
            >
            <a target='_blank' >
                <Image 
                    src={results.xl_picture_url}
                    layout='responsive'
                    objectFit="cover"
                    width={200}
                    height={200}
                    className='rounded-lg'
                    priority={true}
                    alt='Loading...'
                />


                <div className='text-sm' >
                    <div className='mt-2 flex justify-between'>
                        <div className='font-bold'> {results.smart_location} </div>
                                {/* If rating doesnt exist assign ** New ** */}
                        {   
                            results.review_scores_rating 
                            &&
                            <div className='flex items-center '>                    
                                <svg className='h-4 fill-black' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    {/* <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                    <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/>
                                </svg>
                                    <span>
                                    { Math.round(( (results.review_scores_rating / 20) + Number.EPSILON) * 100) / 100   }
                                    {/* {results.review_scores_rating} */}
                                    </span>        
                            </div>
                        }
                        {   
                            !results.review_scores_rating 
                            && 
                            <div> 
                                **New**
                            </div>
                        }
                    </div>
                    <div className='text-gray-500'>Calculate curr distance ?</div>
                    <div className='text-gray-500'>Dates Available</div>
                    <div> <span className='font-bold mt-2'>${results.price}</span> night</div>
                </div>
                </a></Link>
            </div>
        </div>
  )
}
