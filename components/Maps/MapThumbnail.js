import React, { useState, useEffect } from 'react';
import Image from 'next/image';
// Fontawesome
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Helper function
import {modifyFavorites } from '../../utils/handleFavorites';

export default function MapThumbnail({ listing, recordID, setError, favorites, setFavorites }) {
  // Same as Thumbnail.js with slight styling changes to better accommodate InfoWindow parent/container
  // Errors and missing properities are also checked 1 layer up instead (Marker.js)
  
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let isSaved = false
    favorites.map(element => { if(element.id == listing.id ) {isSaved = true} })
    setSaved(isSaved)
    
  }, [favorites])


  return (
    <div className="relative h-56 w-56 md:h-full md:w-96 bg-white-500 ">
      {/* Add to favorites/save button */}
      <button className="absolute top-4 right-4 z-10" onClick={() => modifyFavorites(favorites, setFavorites, listing)} >
        <FontAwesomeIcon
            className={`heart text-xl ${saved ? 'text-red-600 text-opacity-100' : 'text-black text-opacity-50' }`}
            icon={faHeart}
        />
      </button>
      {/* Thumbnail */} 
      <div className=" bg-white h-full w-full">
          <a target="_blank" href={`/listings/${recordID}`} onClick={()=> localStorage.setItem( recordID, JSON.stringify(listing) )} > 
              <Image
                src={listing.xl_picture_url}
                layout="responsive"
                objectFit="cover"
                width={340}
                height={220}
                className=""
                priority={true}
                alt="Loading"
                onError={() => setError(true)}
              />
            <div className="text-sm px-2 md:p-4 ">
              <div className="mt-2 flex justify-between ">
                <div className="font-bold pr-4">
                  {" " + listing.smart_location + " "}
                </div>
                {/* If rating doesnt exist assign ** New ** */}
                <div className="flex items-center gap-0.5 font-bold">
                  <span>
                    <FontAwesomeIcon icon={faStar} />
                  </span>
                  <span>
                    {listing.review_scores_rating
                      ? Math.round(
                          (listing.review_scores_rating / 20 +
                            Number.EPSILON) *
                            100
                        ) / 100
                      : "New"}
                  </span>
                </div>
              </div>
              <div className="hidden md:block text-gray-500">
                Calculate curr distance ?
              </div>
              <div className="hidden md:block text-gray-500">
                Dates Available
              </div>
              <div>
                <span className="font-bold">{ '$' + listing.price }</span>
                <span> night</span>
              </div>
            </div>
          </a>
      </div>
    </div>
  );
}
