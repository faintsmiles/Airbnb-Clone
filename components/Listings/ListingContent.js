import React, { useState } from "react";
import ListingTitle from "./ListingTitle";
import ListingDescription from "./ListingDescription";
import ReserveController from "./ReserveForms/ReserveController";
import Calendar from "../common/Calendar";
import Reviews from "./Reviews";
import MapSingleListing from "../Maps/MapSingleListing";

export default function ListingContent({ roomData, favorites,setFavorites }) {
  // Minimum stay required
  const minNightsRequired = parseInt(roomData.minimum_nights) || 0;
  // Create a date object for initial dates
  let date = new Date();
  const [checkInDay, setCheckInDay] = useState(date.toLocaleDateString());
  const [daysToReserve, setDaysToReserve] = useState(minNightsRequired);
  date.setDate(date.getDate() + daysToReserve); // Add min stay
  const [checkOutDay, setCheckOutDay] = useState(date.toLocaleDateString());

  return (
    <div className="listing-page-container my-0 mx-auto">
      {/* Title  */}
      <ListingTitle
        roomData={roomData}
        favorites={favorites}
        setFavorites={setFavorites}
      />
      {/* Listing description + Reserve Form */}
      <div className="flex m-8 ">
        <ListingDescription roomData={roomData} />
        <ReserveController
          roomData={roomData}
          checkInDay={checkInDay}
          setCheckInDay={setCheckInDay}
          checkOutDay={checkOutDay}
          setCheckOutDay={setCheckOutDay}
          minNightsRequired={roomData.minimum_nights}
          daysToReserve={daysToReserve}
          setDaysToReserve={setDaysToReserve}
        />
      </div>
      {/* Calendar Section */}
      <div className="mx-8 my-16 pb-24 flex flex-col items-center justify-center border-b md:block">
        <div className="pb-16">
          <div className="text-2xl font-medium ">Select checkout date</div>
          <div className="text-sm text-gray-500">{`Minimum stay: ${minNightsRequired} nights`}</div>
        </div>
        <Calendar
          checkInDay={checkInDay}
          setCheckInDay={setCheckInDay}
          checkOutDay={checkOutDay}
          setCheckOutDay={setCheckOutDay}
          minNightsRequired={roomData.minimum_nights}
          setDaysToReserve={setDaysToReserve}
          key={"ContentPage"}
          noBorder={false}
        />
      </div>
      {/* Reviews Section */}
      <div id="review-section" className="mx-8 py-16 border-b">
        <Reviews
          listingRating={roomData.review_scores_rating}
          numberOfReviews={roomData.number_of_reviews}
          cleanlinessRating={roomData.review_scores_cleanliness}
          accuracyRating={roomData.review_scores_accuracy}
          communicationRating={roomData.review_scores_communication}
          locationRating={roomData.review_scores_location}
          valueRating={roomData.review_scores_value}
          checkinRating={roomData.review_scores_checkin}
        />
      </div>
      {/* Map Section */}
      <div id="map-section" className="mx-8 py-8 lg:px-0">
        <div className="pb-8 text-2xl ">Where you’ll be</div>
        <MapSingleListing
          key={"singleListingMap"}
          results={roomData}
          center={{
            lat: roomData.geolocation[0],
            lng: roomData.geolocation[1],
          }}
        />
        <div className="pt-8 pb-16 flex flex-col gap-4">
          {/* Map location info */}
          <div className="text-base font-bold">
            <span>
              {" "}
              {roomData.neighbourhood ? roomData.neighbourhood + "," : ""}
            </span>
            <span> {roomData.smart_location} </span>
          </div>
          <p>{roomData.neighborhood_overview}</p>
        </div>
      </div>
      
    </div>
  );
}
