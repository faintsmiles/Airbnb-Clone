import React, { useState, useEffect, useRef } from 'react'
import { faStar, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import moment from 'moment'
moment.locale('en')
import Calendar from './Calendar';

export default function ReserveForm({ roomData, checkInDay, setCheckInDay, checkOutDay, setCheckOutDay, minimumNights, daysToReserve, setDaysToReserve }) {

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
  useEffect(()=> {
    document.addEventListener('mousedown', closeCalendar)
    return() => {
      removeEventListener('mousedown', closeCalendar)
    }
  })
  console.log("render")

  return (
    <form className='w-9/12  absolute right-0 border rounded-lg shadow-lg'>

       {/* Price and reviews */}
        <div className='p-6 flex justify-between '>
            <div>
                <span className='text-2xl font-semibold '>{'$' + roomData.price}</span>
                <span className='font-extralight'> night</span>
            </div>
            <div>
                <FontAwesomeIcon icon={faStar} />
                <span>
                  { roomData.review_scores_rating  ? (Math.round(( (roomData.review_scores_rating / 20) + Number.EPSILON) * 100) / 100 ).toFixed(2) : " New "  }
                </span>
                <span className=' font-bold'> · </span>
                <span className=' text-gray-500 underline cursor-pointer'>{roomData.number_of_reviews} reviews</span>
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
            <div className=' absolute -right-1 p-4 shadow-[0_0px_24px_rgba(0,0,0,0.2)] rounded-2xl bg-white'>
              <div className='p-4 bg-white  '>
                <div className='text-2xl font-medium '>Select checkout date</div>
                <div className='text-sm text-gray-500'>{`Minimum stay: ${minimumNights} nights`}</div>
              </div>
              <Calendar
                checkInDay={checkInDay} setCheckInDay={setCheckInDay} 
                checkOutDay={checkOutDay} setCheckOutDay={setCheckOutDay} 
                minimumNights={minimumNights} setDaysToReserve={setDaysToReserve}  
                key={'ReserveForm'} noBorder={true}
              />
            </div>
          }
          <div className='flex w-full border-t'>
            <div className='w-full p-2 flex justify-between items-center'>
              <div className=''>
                <div className='text-xs font-bold'>GUESTS</div>
                <div>1 Guest</div>
              </div>
              <div>
                <span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </div>
            </div>
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
