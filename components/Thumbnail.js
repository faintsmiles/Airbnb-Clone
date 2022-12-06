import React, {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Thumbnail({ results, listingID }) {

  // prevents displaying where image hangs/returns an error
  const [error, setError] = useState(false);


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
      <button className="absolute top-4 right-4 z-10">
        <FontAwesomeIcon
          className="heart text-black text-opacity-50 text-xl"
          icon={faHeart}
        />
      </button>
      <div>
        {/* <Link
          href={{
            pathname: `listings/${listingID}`,
            // query: {
            //   filler: "176262402122865703321029156979",
            //   data: JSON.stringify(results),
            // },
          }}
          prefetch={false}
          onClick={()=> localStorage.setItem("data", JSON.stringify(results) )}
          onLoad={()=> localStorage.setItem("data", JSON.stringify(results) )}
        > */}
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
        {/* </Link> */}
      </div>
    </div>
  );
}
