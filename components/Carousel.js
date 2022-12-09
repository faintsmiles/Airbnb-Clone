import React, { useState, useEffect, useRef } from 'react';
import CarouselItem from './CarouselItem';

import {faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Carousel({ carouselFocus, setCarouselFocus, searchLocation, setResults}) {

  const ref = useRef()
  const [leftButtonVisibility, setLeftButtonVisibility] = useState("hidden")
  const [rightButtonVisibility, setRightButtonVisibility] = useState("hidden md:block")

  //https://stackoverflow.com/questions/60729924/react-scroll-component-horizontally-on-button-click
  const scroll = (scrollOffset) => { ref.current.scrollLeft += scrollOffset; }
  // Determines if side button controls are visible 
  const buttonVisibility = (scrollPosition ) => {

    if(scrollPosition > 0) 
      setLeftButtonVisibility('hidden md:block')
    else 
      setLeftButtonVisibility('hidden')
    if(scrollPosition >= ref.current.scrollLeftMax) 
      setRightButtonVisibility('hidden')
    else 
      setRightButtonVisibility('hidden md:block')
  }

  useEffect(() => {
    if(!carouselFocus) {return}
  
    const apiURL = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&rows=30&facet=city`
    const location = '&refine.city=' + searchLocation;
    const propertyType = '&refine.property_type=' + carouselFocus

    fetch(apiURL + propertyType + location)
    .then(response => response.json())
    .then(results => setResults(results.records))
    .catch(err => alert(err))

  }, [carouselFocus])


  return (
    <div className='carousel relative flex h-max text-xs whitespace-nowrap overflow-hidden' onScrollCapture={() =>buttonVisibility(ref.current.scrollLeft) }>
        
        <div ref={ref} className=' carousel mx-4 relative flex h-max text-xs text-center whitespace-nowrap overflow-x-scroll no-scrollbar'>
          { categories.map(element => {
              return (
              <CarouselItem 
                key={element.type} element={element} carouselFocus={carouselFocus} setCarouselFocus={setCarouselFocus}
              />)
          })}
        </div>

        <div>
          <button className={`${leftButtonVisibility} h-8 w-8 px-2 absolute left-0 top-4 bottom-0 bg-white text-black border border-neutral-300 rounded-full hover:shadow-lg`} onClick={() => scroll(-400)}> 
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
        <div>
          <button className={`${rightButtonVisibility} h-8 w-8 px-2 absolute right-0 top-4 bottom-0 bg-white text-black border border-neutral-300 rounded-full hover:shadow-lg`} 
                  onClick={() => scroll(400)} > 
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
    </div>
  )
}

const categories = [
  { type: 'Apartment', icon: '/icons/icons8-apartment-64.png' },
  { type: 'House', icon: '/icons/icons8-house-64.png' },
  { type: 'Bed & Breakfast', icon: '/icons/icons8-breakfast-64.png' },
  { type: 'Townhouse', icon: '/icons/icons8-townhome-64.png' },
  { type: 'Other', icon: '/icons/icons8-categorize-64.png' },
  { type: 'Loft', icon: '/icons/icons8-loft-64.png' },
  { type: 'Dorm', icon: '/icons/icons8-dormitory-64.png' },
  { type: 'Guesthouse', icon: '/icons/icons8-neighbor-64.png' },
  { type: 'Boat', icon: '/icons/icons8-sailboat-64.png' },
  { type: 'Bungalow', icon: '/icons/icons8-bungalow-64.png' },
  { type: 'Serviced apartment', icon: '/icons/icons8-condo-64.png' },
  { type: 'Condominium', icon: '/icons/icons8-condominium-64.png' },
  { type: 'Boutique hotel', icon: '/icons/icons8-hotel-building-64.png' },
  { type: 'Cabin', icon: '/icons/icons8-cabin-64.png' },
  { type: 'Hostel', icon: '/icons/icons8-hostel-64.png' },
  { type: 'Villa', icon: '/icons/icons8-villa-64.png' },
  { type: 'Camper/RV', icon: '/icons/icons8-camper-64.png' },
  { type: 'Chalet', icon: '/icons/icons8-chalet-64.png' },
  { type: 'Tent', icon: '/icons/icons8-camping-tent-64.png' },
  { type: 'Castle', icon: '/icons/icons8-castle-64.png' },
  { type: 'Yurt', icon: '/icons/icons8-yurt-64.png' },
  { type: 'Hut', icon: '/icons/icons8-hut-64.png' },
  { type: 'Lighthouse', icon: '/icons/icons8-lighthouse-64.png' },
  { type: 'Parking Space', icon: '/icons/icons8-outdoor-parking-64.png' },
  { type: 'Cave', icon: '/icons/icons8-cave-64.png' },
  { type: 'Igloo', icon: '/icons/icons8-igloo-64.png' },
  { type: 'Ryokan (Japan)', icon: '/icons/icons8-japan-64.png' },
  { type: 'Tipi', icon: '/icons/icons8-tipi-64.png' },
];
