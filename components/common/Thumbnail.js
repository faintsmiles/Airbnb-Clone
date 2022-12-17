import React, { useState, useEffect } from 'react';
import Image from 'next/image';
// Fontawesome
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Helper function
import {modifyFavorites } from '../../utils/handleFavorites';

export default function Thumbnail({ listing, recordID, favorites, setFavorites }) {
  // Prevents permanently displaying 'loading' if image hangs/returns an error by removing listing from view
  const [error, setError] = useState(false);
  const [saved, setSaved] = useState(false)
  //Determines which thumbnails display a red heart icon vs transparent
  useEffect(() => {
    let isSaved = false
    favorites.map(element => { if(element.id == listing.id ) {isSaved = true} })
    setSaved(isSaved)

  }, [favorites])


  if(error) {
    console.log('Image could not be found')
    return null;
  }
  // Fields required in thumbnail
  if (!listing.geolocation) {
    console.log('No geolocation');
    return null;
  }
  if (!listing.price) {
    console.log('No Price');
    return null;
  }
  if (!listing.xl_picture_url) {
    console.log('No picture');
    return null;
  }
  if (!listing.smart_location) {
    console.log('No smart location');
    return null;
  }
  
  return (
    <div className='relative'>
      {/* Add to favorites/save button */}
      <button className='absolute top-4 right-4 z-10' onClick={() => modifyFavorites(favorites, setFavorites, listing) } >
        <FontAwesomeIcon
          className={`heart text-xl ${saved ? 'text-red-600 text-opacity-100' : 'text-black text-opacity-50' }`}
          icon={faHeart}
        />
      </button>
      {/* Thumbnail */} 
      <div className=" bg-white h-full w-full">
          <a target='_blank' href={`/listings/${recordID}`} onClick={()=> localStorage.setItem( recordID, JSON.stringify(listing) )} onAuxClick={()=> localStorage.setItem( recordID, JSON.stringify(listing) )}> 
            <Image
              src={listing.xl_picture_url}
              layout='responsive'
              objectFit='cover'
              width={200}
              height={200}
              className='bg-gray-100 rounded-lg'
              priority={true}
              alt='Loading...'
              onError={() => setError(true)}
            />
            <div className='text-sm'>
              <div className='mt-2 flex justify-between'>
                <div className='font-bold'> {listing.smart_location} </div>
                {/* If rating doesnt exist assign ** New ** */}
                <div className='flex items-center gap-0.5 font-bold'>
                  <span>
                    <FontAwesomeIcon icon={faStar} />
                  </span>
                  <span>
                    {listing.review_scores_rating
                      ? Math.round(
                          (listing.review_scores_rating / 20 + Number.EPSILON) *
                            100
                        ) / 100
                      : 'New'}
                  </span>
                </div>
              </div>
              <div className='text-gray-500'>Calculate curr distance ?</div>
              <div className='text-gray-500'>Dates Available</div>
              <div>
                <span className='font-bold'>{ '$' + listing.price }</span>
                <span> night</span>
              </div>
            </div>
          </a>
      </div>
    </div>
  );
}
