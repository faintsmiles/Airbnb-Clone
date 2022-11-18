import React, {useState} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

export default function GuestMenuOptions({setDisplayGuestMenu}) {
  return (
    <div className='absolute right-0 p-5 w-72 lg:w-full border rounded-md bg-white shadow-xl z-10 '>
        <ul>
            <li className='flex my-4 justify-between'>
                <div className='flex flex-col'>
                    <div className='font-bold'>Adults</div>
                    <div className='text-sm'>Age 13+</div>
                </div>
                <FormButtons startNumber={1} />
            </li>
            <li className='flex my-4 justify-between'>
                <div className='flex flex-col'>
                    <div className='font-bold'>Children</div>
                    <div className='text-sm'>Ages 2-12</div>
                </div>
                <FormButtons startNumber={0} />
            </li>
            <li className='flex my-4 justify-between'>
                <div className='flex flex-col'>
                    <div className='font-bold'>Infants</div>
                    <div className='text-sm'>Under 2</div>
                </div>
                <FormButtons startNumber={0} />
            </li>
            <li className='flex my-4 justify-between'>
                <div className='flex flex-col'>
                    <div className='font-bold'>Pets</div>
                    <div className='text-sm font-medium underline'>Bringing a service animal?</div>
                </div>
                <FormButtons startNumber={0} />
            </li>
        </ul>
        <div>
           <span className='text-xs'>This place has a maximum of 6 guests, not including infants. Pets aren't allowed.</span> 
        </div>
        <div className='flex flex-end'>
            <button type='button' className='p-2 ml-auto mr-0 right-0 font-bold underline rounded-lg hover:bg-gray-100' onClick={(e)=> setDisplayGuestMenu(false) }>
                Close
            </button>
        </div>
    </div>
  )
}


function FormButtons({startNumber}) {
    return(
        <div className=' text-gray-200'>
            <button className='px-2 py-1 border border-gray-200 rounded-full hover:cursor-not-allowed' type='button'>
                <FontAwesomeIcon icon={ faMinus} />
            </button>
            <span className='mx-3 text-black'>{startNumber}</span>
            <button className='px-2 py-1 border border-gray-200 rounded-full hover:cursor-not-allowed' type='button'>
                <FontAwesomeIcon icon={ faPlus} />
            </button>
        </div>
    )
}