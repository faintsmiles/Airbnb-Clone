import React from "react";
import Image from "next/image";
import Link from "next/link";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MapThumbnail({ listingData, listingID, setError, favorites, modifyFavorites }) {
  // Exactly the same as  thumbnail with slight styling differences
  // We checked for missing properties 1 layer up inside of marker.
  
  return (
    <div className="relative h-48 w-48 md:h-full md:w-96 bg-white-500">
      <button className="absolute top-4 right-4 z-10" onClick={() => modifyFavorites(favorites, listingData)} >
        <FontAwesomeIcon
          className="heart text-black text-opacity-50 text-xl"
          icon={faHeart}
        />
      </button>
      {/* We overrode the css on a map element to be transparent so we need to set our background white to display text here instead  */}
      <div className=" bg-white h-full w-full">
        <Link
          href={{
            pathname: `listings/${listingID}`,
            query: {
              filler: "176262402122865703321029156979",
              data: JSON.stringify(listingData),
            },
          }}
        >
          <a target="_blank">
            <div className="">
              <Image
                src={listingData.xl_picture_url}
                layout="responsive"
                objectFit="cover"
                width={340}
                height={220}
                className=""
                priority={true}
                alt="Loading"
                onError={() => setError(true)}
              />
            </div>
            <div className="text-sm px-2 md:p-4 ">
              <div className="mt-2 flex justify-between ">
                <div className="font-bold pr-4">
                  {" " + listingData.smart_location + " "}
                </div>
                {/* If rating doesnt exist assign ** New ** */}
                <div className="flex items-center gap-0.5 font-bold">
                  <span>
                    <FontAwesomeIcon icon={faStar} />
                  </span>
                  <span>
                    {listingData.review_scores_rating
                      ? Math.round(
                          (listingData.review_scores_rating / 20 +
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
                <span className="font-bold">{ '$' + listingData.price }</span>
                <span> night</span>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
