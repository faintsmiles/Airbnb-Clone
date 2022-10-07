import React, {useState, useEffect} from 'react'
import ListingPageTitle from './ListingPageTitle'
import ListingPageDescription from './ListingPageDescription'
import ListingPageForm from './ListingPageForm'
import Calendar from './common/Calendar'



export default function ListingPageContent({roomData}) {

  // Create a date object for initial dates to reserve
  let date = new Date();
  const [ checkInDay, setCheckInDay] = useState(date.toLocaleDateString())
  // On initial load we'll use minimum days required, also using it with calendar component
  const minimumNights = parseInt(roomData.minimum_nights) || 0
  const [ daysToReserve, setDaysToReserve ] = useState(minimumNights)
  date.setDate(date.getDate() + daysToReserve);
  const [ checkOutDay, setCheckOutDay] = useState(date.toLocaleDateString())
  console.log(checkInDay)

  return (
    <div className='listing-page-container my-0 mx-auto'>
        <ListingPageTitle roomData={roomData} />
        <div className='flex p-8'>
          <ListingPageDescription roomData={roomData} />
          <ListingPageForm  
            roomData={roomData} 
            checkInDay={checkInDay} setCheckInDay={setCheckInDay} 
            checkOutDay={checkOutDay} setCheckOutDay={setCheckOutDay} 
            minimumNights={roomData.minimum_nights}   
            daysToReserve={daysToReserve} setDaysToReserve={setDaysToReserve} 
          />
        </div>
        {/* Calendar x2 --- calendar size changes depending on screen width and hides the opposing. only difference */}
        <div className='p-8 flex justify-center md:block'>
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
    </div>
  )
}
