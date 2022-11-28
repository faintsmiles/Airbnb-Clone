import React, {useState} from 'react'
import FitlerModalCheckBox from './common/FitlerModalCheckBox'

import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FilterModal({setShowFilterModal}) {

  const typeOfPlace= {
    subcategory: '',
    items: [
      { title: 'Entire Place', description: 'A place all to yourself'},
      { title: 'Private room', description: 'Your own room in a home or a hotel, plus some shared common spaces'},
    ]
  }

  const amenities = [{
    subcategory: 'Essentials',
    items: [ 
      { title: 'Wifi', description: '' },
      { title: 'Kitchen', description: '' },
      { title: 'Washer', description: '' },
      { title: 'Dryer', description: '' },
      { title: 'Air conditioning', description: '' },
      { title: 'Heating', description: '' },
      { title: 'Dedicated workspace', description: '' },
      { title: 'TV', description: '' },
      { title: 'Hair Dryer', description: '' },
      { title: 'Iron', description: '' },
    ]
  },
  {
    subcategory: 'Features',
    items:[
      { title: 'Pool', description: '' },
      { title: 'Hot tub', description: '' },
      { title: 'Free parking on premises', description: '' },
      { title: 'EV charger', description: '' },
      { title: 'Crib', description: '' },
      { title: 'Gym', description: '' },
      { title: 'BBQ grill', description: '' },
      { title: 'Breakfast', description: '' },
      { title: 'Indoor fireplace', description: '' },
      { title: 'Smoking allowed', description: '' },
    ]
  },
  {
    subcategory: 'Safety',
    items: [
      { title: 'Smoke alarm', description: '' },
      { title: 'Carbon monoxide alarm', description: '' },
    ]
  }
]
  // Type of place
  const [placeType, setPlaceType] = useState([])
  // Rooms and beds
  const [bedrooms, setBedrooms] = useState()
  const [beds, setBeds] = useState()
  const [bathrooms, setBathrooms] = useState()
  // Property Type
  const [property, setProperty] = useState()
  // Amenities
  const [essentials, setEssentials] = useState([])
  const [features, setFeatures] = useState([])
  const [safety, setSafety] = useState([])
  // Object containing the current state values and set state functions for amenities
  const amenityStates = [ { value: essentials, setValue: setEssentials}, { value: features, setValue: setFeatures}, {value: safety, setValue: setSafety} ]


  return (
    <div className='fixed h-full w-full top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50' onClick={()=> setShowFilterModal(false)} >
        <div className='relative w-full md:max-w-3xl h-4/5 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 bg-white rounded-lg overflow-hidden overflow-y-scroll' onClick={(e) => e.stopPropagation()} >
            <header className='relative py-2 flex justify-center border-b'>
                <h1 className='p-4 font-bold'>Filters</h1>
                <button className='absolute top-5 left-3 p-1 px-3 hover:bg-gray-100  rounded-full '>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </header>

            {/* Price Range  */}
            <section className=' w-auto mx-8 py-8 border-b'>
              <p className='text-lg  font-semibold '>Price Range</p>
              <p className='text-gray-500'>The average nightly price is $</p>
                        {/* Input Boxes */}
              <div className='flex mx-6'>
                <div className='flex-grow leading-none pl-2 pt-2 text-gray-500  border rounded-lg'>
                  <span className='text-xs leading-none' >min price</span>
                  <div className='leading-none'>
                    <span>$ </span>
                    <input className="text-black focus:outline-none" type="text" placeholder={'10'} />
                  </div>
                </div>
                <span className='p-4' > - </span>
                <div className='flex-grow leading-none  pl-2 pt-2 text-gray-500  border rounded-lg'>
                  <span className='text-xs leading-none' >min price</span>
                  <div className='leading-none'>
                    <span>$ </span>
                    <input className="text-black focus:outline-none" type="text" placeholder={'1000+'} />
                  </div>
                </div>
              </div>
            </section>

            {/* Type of place */}
            <section className=' w-auto mx-8 py-8 border-b'>
              <div className='text-lg font-semibold'>Type of place</div>
              <FitlerModalCheckBox options={typeOfPlace} />
            </section>

            {/* Rooms and beds filter  */}
            <section className=' w-auto mx-8 py-8 border-b'>
              <div className='text-lg  font-semibold' >Rooms and beds</div>
              <div>
                  
                  {/* Number of bedrooms selection */}
                  <div className='mt-4 ml-2'>Bedrooms</div>
                  <div id='numberOfBedrooms' className='mt-6 flex justify-start gap-2'>
                    <div>
                    </div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>Any</button>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white ' >1</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>2</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>3</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>4</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>5</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>6</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>7</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>8+</button>
                    </div>
                  </div>

                  {/* Number of beds selection */}
                  <div className='mt-4 ml-2'>Beds</div>
                  <div id='numberOfBeds' className='mt-6 flex justify-start gap-2'>
                    <div>
                    </div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>Any</button>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white ' >1</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>2</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>3</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>4</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>5</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>6</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>7</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>8+</button>
                    </div>
                  </div>

                  {/* Number of bathrooms selection */}
                  <div className='mt-4 ml-2'>Bathrooms</div>
                  <div id='numberOfBathrooms' className='mt-6 flex justify-start gap-2'>
                    <div>
                    </div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>Any</button>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white ' >1</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>2</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>3</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>4</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>5</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>6</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>7</button>
                    </div>
                    <div>
                      <button className='text-sm border py-2 px-6 rounded-full hover:bg-black hover:text-white '>8+</button>
                    </div>
                  </div>

              </div>
            </section>
            {/* Property Type filter  */}
            <section className='w-auto mx-8 py-8 border-b'>
              <div className='mb-8 text-lg font-bold '>Property Type</div>

              <div className='flex gap-4'>
                

                  <div className='flex-grow flex flex-col p-4 gap-8 border rounded-lg'>
                    <div>House Icon</div>
                    <div>
                      <span className='font-semibold'>House</span>
                    </div>
                  </div>

                  <div className='flex-grow flex flex-col p-4 gap-8 border rounded-lg'>
                    <div>Apartment Icon</div>
                    <div>
                      <span className='font-semibold'>Apartment</span>
                    </div>
                  </div>

                  <div className='flex-grow flex flex-col p-4 gap-8 border rounded-lg'>
                    <div>Guesthouse Icon</div>
                    <div>
                      <span className='font-semibold'>Guesthouse</span>
                    </div>
                  </div>

                  <div className='flex-grow flex flex-col p-4 gap-8 border rounded-lg'>
                    <div>Hotel Icon</div>
                    <div>
                      <span className='font-semibold' >Hotel</span>
                    </div>
                  </div>

              </div>          
            </section>

            {/* Amenities */}
            <section className='w-auto mx-8 py-8 border-b'>
              <div className='text-xl pb-12 font-bold'>Amenities</div>
              { amenities.map((element, index) => {
                return <FitlerModalCheckBox key={element+index} options={element} amenity={amenityStates[index].value} setAmenity={amenityStates[index].setValue} />
              } )}              
            </section>
        </div>
    </div>
  )
}
