import React from 'react'
import { faStar, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function ReserveForm({roomData, checkInDay, checkOutDay}) {

  // in the event we add functionality for choosing # of nights
  const pricePerNight = parseInt(roomData.price);
  // In the event the maximum nights available to reserve exceeds 90 days, we set it to something far more reasonable
  const nightsSelected =  parseInt(roomData.maximum_nights) > 90 ? 30 : parseInt(roomData.maximum_nights);
  const basePrice = (pricePerNight) * (nightsSelected);
  const cleaningFee = roomData.cleaning_fee ? parseInt(roomData.cleaning_fee) : 0;
  // round cost up to nearest dollar
  const serviceFee = parseInt((pricePerNight * nightsSelected * .10).toFixed());
  const totalCost = (basePrice + cleaningFee + serviceFee); 


  return (
    <form className='w-9/12 absolute right-0 border rounded-lg shadow-lg'>

       {/* Price and reviews */}
        <div className='p-6 flex justify-between '>
            <div>
                <span className='font-bold'>{'$' + roomData.price}</span>
                <span className='font-extralight'> night</span>
            </div>
            <div>
                <FontAwesomeIcon icon={faStar} />
                <span>
                  { roomData.review_scores_rating  ? (Math.round(( (roomData.review_scores_rating / 20) + Number.EPSILON) * 100) / 100 ) : "**New**"  }
                </span>
                <span className=' font-bold'> · </span>
                <span className=' text-gray-500 underline cursor-pointer'>{roomData.number_of_reviews} reviews</span>
            </div>
        </div>

        {/* Check in/out  container */}
        <div className='mx-6 my-4 border rounded-lg'>
          <div className='flex'>
            <div id='check-in' className='p-2 w-1/2 border-r'>
              <div className=' text-xs font-bold'>CHECK-IN</div>
              <div>{checkInDay}</div>
            </div>
            <div id='check-out' className='p-2 w-1/2'>
              <div className=' text-xs font-bold'>CHECK-OUT</div>
              <div>{checkOutDay}</div>
            </div>
          </div>
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
