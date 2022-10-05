import React from 'react'
import ReserveForm from './common/ReserveForm'


export default function ListingPageForm({roomData}) {
  return (
    <div 
        className='w-full fixed left-0 bottom-0 right-0 
        md:sticky md:top-8
    '>
        <form className='h-20 px-4 flex justify-between items-center bg-white border-t md:hidden'>
            <div>
                <div>
                    <span className='font-bold'>{'$' + roomData.price}</span>
                    <span className='font-extralight'> night</span>
                </div>
                <div className=' underline'>Date</div>
            </div>
            <button type='button' className='py-2 px-6 rounded font-bold text-white bg-pink-500'>
                Reserve
            </button>
        </form>
        <div className='hidden md:block md:sticky md:top-16'>
            <ReserveForm roomData={roomData} />
        </div>
    </div>
  )
}
