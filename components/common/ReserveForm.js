import React, { useState, useEffect, useRef } from 'react'
import { faStar, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import moment from 'moment'
moment.locale('en')
import Calendar from './Calendar';

import GuestMenuOptions from './GuestMenuOptions';

export default function ReserveForm({ roomData, checkInDay, setCheckInDay, checkOutDay, 
  setCheckOutDay, minNightsRequired, daysToReserve, setDaysToReserve }) {

  // in the event we add functionality for choosing # of nights
  const pricePerNight = parseInt(roomData.price);
  // In the event the maximum nights available to reserve exceeds 90 days, we set it to something far more reasonable
  //const nightsSelected =  parseInt(roomData.maximum_nights) > 90 ? 30 : parseInt(roomData.maximum_nights);
  const nightsSelected = daysToReserve;
  const basePrice = (pricePerNight) * (nightsSelected);
  const cleaningFee = roomData.cleaning_fee ? parseInt(roomData.cleaning_fee) : 0;
  // round cost up to nearest dollar
  const serviceFee = parseInt((pricePerNight * nightsSelected * .10).toFixed());
  const totalCost = (basePrice + cleaningFee + serviceFee); 
  

  // Calendar State & Controls
  const [displayCalendar, setDisplayCalendar] = useState(false)
  // Detects if user clicks outside of the calendar and if so, closes said it
  const calendarContainer = useRef(null)
  const closeCalendar = (e) => {
    if(calendarContainer.current && displayCalendar && !calendarContainer.current.contains(e.target)){
      setDisplayCalendar(false)
    }
  }

  // Guest Menu State & Controls
  const [ displayGuestMenu, setDisplayGuestMenu] = useState(false);
  const guestMenuContainer = useRef(null)
  const closeGuestMenu = (e) => {
    if(guestMenuContainer.current && displayGuestMenu && !guestMenuContainer.current.contains(e.target)){
      setDisplayGuestMenu(false)
    }
  }

  // Type of guests and their current counter for guest menu child component.
  const [ Adults, setAdults] = useState(1)
  const [Children, setChildren] = useState(0)
  const [Infants, setInfants] = useState(0)
  const [Pets, setPets] = useState(0)
  // Total guests staying (infants dont count toward total and pets are disabled)
  const [ guestCounter, setGuestCounter ] = useState( Adults + Children)

  // Named function so that we can cleanly remove the following event listener
  function closeStateBasedMenus (e) {
    closeGuestMenu(e);
    closeCalendar(e)
  }
  // Event handler for calendar / guest menus
  useEffect(()=> {
    document.addEventListener('mousedown', closeStateBasedMenus)

    return() => {
      removeEventListener('mousedown', closeStateBasedMenus )
    }
  })


  return (
    <form className='w-9/12 absolute right-0 border rounded-lg shadow-lg'>

       {/* Price and reviews */}
        <div className='p-6 flex justify-between items-center '>
            <div>
                <span className='text-2xl font-semibold '>{'$' + roomData.price}</span>
                <span className='font-extralight'> night</span>
            </div>
            <div className='flex gap-2 flex-wrap'>
                <a href='#review-section' className='flex items-baseline gap-2'>
                  <FontAwesomeIcon icon={faStar} />  
                  { roomData.review_scores_rating  ? (Math.round(( (roomData.review_scores_rating / 20) + Number.EPSILON) * 100) / 100 ).toFixed(2) : " New "  }
                </a>
                <span className=' font-bold'> · </span>
                <a href='#review-section' className='text-gray-500 underline cursor-pointer'>{roomData.number_of_reviews +" reviews" }</a>
            </div>
        </div>

        {/* Check in/out  container */}
        <div ref={calendarContainer} className='relative mx-6 my-4 border rounded-lg'>
          <div className='flex hover:cursor-pointer' onClick={()=> setDisplayCalendar(!displayCalendar) }>
            <div id='check-in' className='p-2 w-1/2 border-r '>
              <div className=' text-xs font-bold'>CHECK-IN</div>
              <div>{moment(checkInDay).format("MM/DD/YYYY")}</div>
            </div>
            <div id='check-out' className='p-2 w-1/2'>
              <div className=' text-xs font-bold'>CHECK-OUT</div>
              <div>{moment(checkOutDay).format("MM/DD/YYYY")}</div>
            </div>
          </div>
          {/* Calendar for form */}
          { displayCalendar && 
            <div className=' absolute -right-1 p-4 shadow-[0_0px_24px_rgba(0,0,0,0.2)] rounded-2xl bg-white z-20'>
              <div className='p-4 bg-white  '>
                <div className='text-2xl font-medium '>Select checkout date</div>
                <div className='text-sm text-gray-500'>{`Minimum stay: ${minNightsRequired} nights`}</div>
              </div>
              <Calendar
                checkInDay={checkInDay} setCheckInDay={setCheckInDay} 
                checkOutDay={checkOutDay} setCheckOutDay={setCheckOutDay} 
                minNightsRequired={minNightsRequired} setDaysToReserve={setDaysToReserve}  
                key={'ReserveForm'} noBorder={true}
              />
            </div>
          }
          <div ref={guestMenuContainer} className='relative w-full border-t flex-col'>
            <div className='w-full p-2 flex justify-between items-center'  onClick={()=> setDisplayGuestMenu(!displayGuestMenu)}  >
              <div className=''>
                <div className='text-xs font-bold'>GUESTS</div>
                <div>{ guestCounter === 1 ? guestCounter + ' Guest' :  guestCounter + ' Guests' } </div>
              </div>
              <div>
                <span>
                  { displayGuestMenu ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />   }
                </span>
              </div>
            </div>
            {/* Conditional menu options to include extra guests */}
            { displayGuestMenu && 
              <GuestMenuOptions 
                guestCounter={guestCounter} setGuestCounter={setGuestCounter} 
                Adults={Adults} setAdults={setAdults} Children={Children} setChildren={setChildren}
                Infants={Infants} setInfants={setInfants} Pets={Pets} setPets={setPets}
                maxGuests={roomData.accommodates} 
              />}
          </div>
        </div>

        {/* Reserve button */}
        <div className='mx-6 my-4'>
          <button className='w-full py-3 bg-pink-500 text-white font-bold rounded-lg' >
            Reserve
          </button>
        </div>

        {/*   */}
        <div className='mx-6 my-4 text-center text-sm'>
          <span className=''>You wont be charged yet</span>
        </div>

        {/* Price Breakdown */}
        <div className='mx-6 my-4 tracking-wide'>
          <div className='py-1 flex justify-between'>
              <div className='underline'>{ '$' + pricePerNight + ' x ' + nightsSelected + ' nights'}</div>
              <div> { '$' + basePrice }</div>
          </div>
          <div className='py-1 flex justify-between'>
              <div className='underline'>Cleaning fee</div>
              <div> { '$' + cleaningFee } </div>
          </div>
          <div className='py-1 flex justify-between'>
              <div className='underline'>Service fee</div>
              <div> { '$' + serviceFee }</div>
          </div>
        </div>

        {/* border */}
        <div className='mx-6 my-8 border' />

        {/* Total Cost to Rent */}
        <div className='mx-6 my-6 flex  text justify-between  font-bold' >
          <div>Total before taxes</div>
          <div>{ '$' + totalCost }</div>
        </div>
    </form>
  )
}
