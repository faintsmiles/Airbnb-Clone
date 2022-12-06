import React, {useState, useEffect} from 'react'
import ListingPageTitle from './ListingPageTitle'
import ListingPageDescription from './ListingPageDescription'
import ListingPageForm from './common/ReserveFormCondensed'
import Calendar from './common/Calendar'
import Reviews from './common/Reviews'
import MapSingleListing from './common/MapSingleListing'

export default function ListingPageContent({roomData}) {

  // Create a date object for initial dates to reserve
  let date = new Date();
  const [ checkInDay, setCheckInDay] = useState(date.toLocaleDateString())
  // On initial load we'll use minimum days required, also using it with calendar component
  const minimumNights = parseInt(roomData.minimum_nights) || 0
  const [ daysToReserve, setDaysToReserve ] = useState(minimumNights)
  date.setDate(date.getDate() + daysToReserve);
  const [ checkOutDay, setCheckOutDay] = useState(date.toLocaleDateString())

  return (
    <div className='listing-page-container my-0 mx-auto'>
        <ListingPageTitle roomData={roomData} />
        <div className='flex m-8 '>
          <ListingPageDescription roomData={roomData} />
          <ListingPageForm  
            roomData={roomData} 
            checkInDay={checkInDay} setCheckInDay={setCheckInDay} 
            checkOutDay={checkOutDay} setCheckOutDay={setCheckOutDay} 
            minimumNights={roomData.minimum_nights}   
            daysToReserve={daysToReserve} setDaysToReserve={setDaysToReserve} 
            // guestCounter={guestCounter} setGuestCounter={setGuestCounter}
          />
        </div>
        {/* Calendar Section */}
        <div className='mx-8 my-16 pb-24 flex flex-col items-center justify-center border-b md:block'>
          <div className='pb-16'>
            <div className='text-2xl font-medium '>Select checkout date</div>
            <div className='text-sm text-gray-500'>{`Minimum stay: ${minimumNights} nights`}</div>
          </div>
          <Calendar  
            checkInDay={checkInDay} setCheckInDay={setCheckInDay} 
            checkOutDay={checkOutDay} setCheckOutDay={setCheckOutDay} 
            minimumNights={roomData.minimum_nights} setDaysToReserve={setDaysToReserve}
            key={'ContentPage'} noBorder={false}
          />
        </div>
        {/* Reviews Section */}
        <div className='mx-8 py-16 border-b'>
          <Reviews 
            listingRating={roomData.review_scores_rating} numberOfReviews={roomData.number_of_reviews}  
            cleanlinessRating={roomData.review_scores_cleanliness} accuracyRating={roomData.review_scores_accuracy}
            communicationRating={roomData.review_scores_communication} locationRating={roomData.review_scores_location}
            valueRating={roomData.review_scores_value} checkinRating={roomData.review_scores_checkin}
          />
        </div>

        <div className='mx-8 py-8 lg:px-0'>
          <div className='pb-8 text-2xl '>Where you’ll be</div>
          <MapSingleListing 
            key={"singleListingMap"} results={roomData} center={ {lat:roomData.geolocation[0], lng: roomData.geolocation[1] } } 
          />
          <div className='pt-8 pb-16 flex flex-col gap-4'>
            <div className='text-base font-bold'>
              <span> {roomData.neighbourhood ? (roomData.neighbourhood  + ',') : ""  }</span>
              <span> {roomData.smart_location} </span>
            </div>
            <p>{roomData.neighborhood_overview}</p>
          </div>
        </div>

    </div>
  )
}
