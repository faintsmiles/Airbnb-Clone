import React, { useState, useEffect } from "react";
import Image from "next/image";
//import Link from "next/link";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {modifyFavorites } from "../utils/favorites";

export default function Thumbnail({ results, listingID, favorites, setFavorites }) {

  // prevents displaying where image hangs/returns an error
  const [error, setError] = useState(false);
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let isSaved = false
    favorites.map(element => { if(element.id == results.id ) {isSaved = true} })
    setSaved(isSaved)

  }, [favorites])


  if(error) {
    console.log("Image could not be found")
    return null;
  }
  // Fields used in thumbnail
  if (!results.geolocation) {
    console.log("No geolocation");
    return null;
  }
  if (!results.price) {
    console.log("No Price");
    return null;
  }
  if (!results.xl_picture_url) {
    console.log("No picture");
    return null;
  }
  if (!results.smart_location) {
    console.log("No smart location");
    return null;
  }
  
  return (
    <div className="relative">
        {/* Add to favorites button */}
        <button className="absolute top-4 right-4 z-10" onClick={() => modifyFavorites(favorites, setFavorites, results) } >
          <FontAwesomeIcon
            className={`heart text-xl ${saved ? 'text-red-600 text-opacity-100' : 'text-black text-opacity-50' }`}
            icon={faHeart}
          />
        </button>
      <div>
          <a target="_blank" href={`/listings/${listingID}`} onClick={()=> localStorage.setItem( listingID, JSON.stringify(results) )} > 
            <Image
              src={results.xl_picture_url}
              layout="responsive"
              objectFit="cover"
              width={200}
              height={200}
              className="bg-gray-100 rounded-lg"
              priority={true}
              alt="Loading..."
              onError={() => setError(true)}
            />
            <div className="text-sm">
              <div className="mt-2 flex justify-between">
                <div className="font-bold"> {results.smart_location} </div>
                {/* If rating doesnt exist assign ** New ** */}
                <div className="flex items-center gap-0.5 font-bold">
                  <span>
                    <FontAwesomeIcon icon={faStar} />
                  </span>
                  <span>
                    {results.review_scores_rating
                      ? Math.round(
                          (results.review_scores_rating / 20 + Number.EPSILON) *
                            100
                        ) / 100
                      : "New"}
                  </span>
                </div>
              </div>
              <div className="text-gray-500">Calculate curr distance ?</div>
              <div className="text-gray-500">Dates Available</div>
              <div>
                <span className="font-bold">{ '$' + results.price }</span>
                <span> night</span>
              </div>
            </div>
          </a>
      </div>
    </div>
  );
}
