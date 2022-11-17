import React from 'react'
import ReserveForm from './ReserveForm'

import moment from 'moment'
moment.locale('en')

export default function ReserveFormCondensed({ roomData, checkInDay, setCheckInDay, checkOutDay, setCheckOutDay, minimumNights, daysToReserve, setDaysToReserve }) {
  return (
    <div 
        className='w-full fixed left-0 bottom-0 right-0 
        md:sticky md:top-8 z-50
    '>
        <form className='h-20 px-4 flex justify-between items-center bg-white border-t md:hidden z-50'>
            <div>
                <div>
                    <span className='font-bold'>{'$' + roomData.price}</span>
                    <span className='font-extralight'> night</span>
                </div>
                <div className='text-sm font-bold underline'>{moment(checkInDay).format("MMM D") + ' – ' + moment(checkOutDay).format("MMM D")}</div>
            </div>
            <button type='button' className='py-2 px-6 rounded font-bold text-white bg-pink-500'>
                Reserve
            </button>
        </form>
        <div className='hidden md:block md:sticky md:top-16'>
            <ReserveForm 
                roomData={roomData} 
                checkInDay={checkInDay} setCheckInDay={setCheckInDay} 
                checkOutDay={checkOutDay} setCheckOutDay={setCheckOutDay} 
                minimumNights={roomData.minimum_nights} 
                daysToReserve={daysToReserve} setDaysToReserve={setDaysToReserve} 
            />
        </div>
    </div>
  )
}
