import React, { useState, useEffect } from "react";
import Image from "next/image";
// fontawesome
import { faStar, faShare, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//util
import { modifyFavorites } from "../../utils/handleFavorites";

export default function ListingTitle({ roomData, favorites, setFavorites }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if(!favorites) {return}
    
    let isSaved = false
    favorites.map(element => { if(element.id == roomData.id ) {isSaved = true} })
    setSaved(isSaved)
  }, [favorites])

  return (
    <div className=" my-0 mx-auto flex flex-col md:p-8 lg:flex-col-reverse">
      {/* Hosts' picture */}
      <div className="bg-blue-50">
        <Image
          src={roomData.xl_picture_url}
          alt=""
          layout="intrinsic"
          objectFit="cover"
          width={1120}
          height={460}
          className="lg:rounded-lg"
        />
      </div>
      <div className="border-b mx-6 py-8 lg:mx-0 lg:border-none">
        {/* Summary */}
        <div className="pb-4 font-bold text-xl">{roomData.summary}</div>
        <div className="flex justify-between items-center">
          {/* Rating, review, location */}
          <div>
            <a href="#review-section" className="px-1 whitespace-nowrap">
              <FontAwesomeIcon icon={faStar} />
              <span> </span>
              { roomData.review_scores_rating
                ? Math.round((roomData.review_scores_rating / 20 + Number.EPSILON) * 100) / 100
                : "New"}
            </a>
            <span className="px-2">·</span>
            <a
              href="#review-section"
              className=" underline cursor-pointer whitespace-nowrap"
            >
              {roomData.number_of_reviews + " reviews"}
            </a>
            <span className="px-2">·</span>
            <a
              href="#map-section"
              className=" underline cursor-pointer whitespace-nowrap"
            >
              {roomData.smart_location}
            </a>
          </div>
          {/* Share/Save */}
          <div className="hidden sm:block">
            <button className=" p-2 underline cursor-pointer whitespace-nowrap hover:bg-slate-100 rounded-sm">
              <FontAwesomeIcon icon={faShare} />
              <span className="pl-2">Share</span>
            </button>
            <button
              className="p-2 underline cursor-pointer whitespace-nowrap hover:bg-slate-100 rounded-sm"
              onClick={() => modifyFavorites(favorites, setFavorites, roomData)}
            >
              <FontAwesomeIcon
                icon={saved ? faHeartSolid : faHeartRegular}
                className={`${saved ? "text-red-600" : "text-black"}`}
              />
              <span className="pl-2">{saved ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
