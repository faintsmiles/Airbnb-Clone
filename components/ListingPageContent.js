import React, {useState, useEffect} from 'react'
import ListingPageTitle from './ListingPageTitle'
import ListingPageDescription from './ListingPageDescription'
import ListingPageForm from './ListingPageForm'
import Calender from './common/Calendar'



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
        <div className='flex p-8'>
          <ListingPageDescription roomData={roomData} />
          <ListingPageForm  roomData={roomData} checkInDay={checkInDay} checkOutDay={checkOutDay}   />
        </div>
        {/* Calendar x2 --- calendar size changes depending on screen width and hides the opposing. only difference */}
        <div className='p-8 block'>
          { }
          <Calender  
            checkInDay={checkInDay} setCheckInDay={setCheckInDay} 
            checkOutDay={checkOutDay} setCheckOutDay={setCheckOutDay} 
            minimumNights={roomData.minimum_nights} setDaysToReserve={setDaysToReserve}
            calendarSize={2}
          />
        </div>
    </div>
  )
}
