import React, {useState} from 'react'
import ListingPageTitle from './ListingPageTitle'
import ListingPageDescription from './ListingPageDescription'
import ListingPageForm from './ListingPageForm'
import Calender from './common/Calender'

export default function ListingPageContent({roomData}) {


  const [ daysToReserve, setDaysToReserve ] = useState(parseInt(roomData.minimum_nights) || 0)
  // Current date + check out date according to nights selected
  // Also allows the option to add user functionality in changing the check in date in the future if we wish to add that functionality
  // by simply changing the date object to that specific day we want via  "new Date('yyyy-mm-ddT03:24:00')""
  let date = new Date();
  let checkIn = date.toLocaleDateString();
  date.setDate(date.getDate() + daysToReserve);
  let checkOut = date.toLocaleDateString()

  console.log(daysToReserve)

  return (
    <div className='listing-page-container my-0 mx-auto'>
        <ListingPageTitle roomData={roomData} />
        <div className='flex p-8'>
          <ListingPageDescription roomData={roomData} />
          <ListingPageForm  roomData={roomData} checkIn={checkIn} checkOut={checkOut}   />
        </div>
        <div className='p-8'>
          <Calender checkIn={checkIn} checkOut={checkOut} daysToReserve={ daysToReserve} setDaysToReserve={setDaysToReserve}  />
        </div>
    </div>
  )
}
