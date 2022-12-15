import React from 'react'
// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

export default function GuestMenuOptions({ 
    setDisplayGuestMenu, 
    guestCounter, setGuestCounter,
    Adults, setAdults, 
    Children, setChildren, 
    Infants, setInfants, 
    Pets, setPets, 
    maxGuests
}) {

  return (
    <div className='absolute right-0 p-5 w-72 lg:w-full border rounded-md bg-white shadow-xl z-10 '>
        <ul>
            <li className='flex my-4 justify-between'>
                <div className='flex flex-col'>
                    <div className='font-bold'>Adults</div>
                    <div className='text-sm'>Age 13+</div>
                </div>
                <FormButtons 
                    currentCount={Adults} modifyCount={setAdults}
                    minGuestRequired={1} maxGuests={maxGuests} 
                    totalGuests={guestCounter} modifyTotal={setGuestCounter}
                />
            </li>
            <li className='flex my-4 justify-between'>
                <div className='flex flex-col'>
                    <div className='font-bold'>Children</div>
                    <div className='text-sm'>Ages 2-12</div>
                </div>
                <FormButtons 
                    currentCount={Children} modifyCount={setChildren} 
                    minGuestRequired={0} maxGuests={maxGuests}
                    totalGuests={guestCounter} modifyTotal={setGuestCounter}
                />
            </li>
            <li className='flex my-4 justify-between'>
                <div className='flex flex-col'>
                    <div className='font-bold'>Infants</div>
                    <div className='text-sm'>Under 2</div>
                </div>
                <FormButtons 
                    currentCount={Infants} modifyCount={setInfants} 
                    minGuestRequired={0} maxGuests={5}
                    // Infants dont count toward total, and no need to modify counter twice, so we'll just create a function set to return
                    totalGuests={Infants} modifyTotal={ ()=>{return}}
                />
            </li>
            <li className='flex my-4 justify-between'>
                <div className='flex flex-col'>
                    <div className='font-bold'>Pets</div>
                    <div className='text-sm font-medium underline'>Bringing a service animal?</div>
                </div>
                <FormButtons 
                    currentCount={Pets} modifyCount={setPets}
                    minGuestRequired={0} maxGuests={0}
                    // Pets are disabled. No need to do modify anything
                    totalGuests={0} modifyTotal={ ()=>{return}}
                />
            </li>
        </ul>
        <div>
           <span className='text-xs'>This place has a maximum of {maxGuests} guests, not including infants. Pets aren't allowed.</span> 
        </div>
        <div className='flex flex-end'>
            <button type='button' className='p-2 ml-auto mr-0 right-0 font-bold underline rounded-lg hover:bg-gray-100' onClick={(e)=> setDisplayGuestMenu(false) }>
                Close
            </button>
        </div>
    </div>
  )
}

// Form Buttons
function FormButtons({currentCount, modifyCount, totalGuests, modifyTotal, minGuestRequired, maxGuests}) {
    // Change counts/total if applicable 
    const modifyCounters = (modifier) => {
        if(totalGuests + modifier > maxGuests) {return}
        if(currentCount + modifier < minGuestRequired) {return}
        modifyCount(currentCount + modifier)
        modifyTotal(totalGuests + modifier)
    }
    
    return(
        <div>
            <button 
                type='button' 
                className={`px-2 py-1 border border-gray-200 rounded-full ${currentCount > minGuestRequired ? 'text-black' : 'text-gray-200 hover:cursor-not-allowed'  }`}
                onClick={(e)=> modifyCounters(-1)}
            >
                <FontAwesomeIcon icon={ faMinus } />
            </button>
            <span className='mx-3 text-black'>{currentCount}</span>
            <button 
                type='button' 
                className={`px-2 py-1 border border-gray-200 rounded-full ${totalGuests < maxGuests ? 'text-black' : 'text-gray-200 hover:cursor-not-allowed' } `}
                onClick={(e)=> modifyCounters(1)}
            >
                <FontAwesomeIcon icon={ faPlus} />
            </button>
        </div>
    )
}