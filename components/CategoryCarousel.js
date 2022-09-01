import React, { useState, useRef } from 'react';
import CarouselItem from './CarouselItem';

export default function CategoryCarousel() {

    const ref = useRef()

    const [leftButtonVisibility, setLeftButtonVisibility] = useState("hidden")
    const [rightButtonVisibility, setRightButtonVisibility] = useState("block")

    //https://stackoverflow.com/questions/60729924/react-scroll-component-horizontally-on-button-click
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
        buttonVisibility(ref.current.scrollLeft += scrollOffset)
      }

      const buttonVisibility = (scrollPosition ) => {

        if(scrollPosition > 0) 
          setLeftButtonVisibility('block')
        else 
          setLeftButtonVisibility('hidden')
        if(scrollPosition >= ref.current.scrollLeftMax) 
          setRightButtonVisibility('hidden')
        else 
          setRightButtonVisibility('block')
      }

  return (
    <div  className='carousel relative border flex h-max text-xs whitespace-nowrap overflow-scroll '>
        
        <div ref={ref} className='carousel mx-4 relative flex h-max text-xs text-center whitespace-nowrap overflow-scroll no-scrollbar'>
          {   categories.map(element => {
              return <CarouselItem element={element}/>
          })}
        </div>

        <button className={`${leftButtonVisibility} h-full px-2 absolute left-0 bg-black text-white rounded`} onClick={() => scroll(-400)} > arrowleft </button>
        
        <button className={`${rightButtonVisibility} h-full px-2 absolute right-0 bg-black text-white rounded`} onClick={() => scroll(400)} > arrowright </button>
    </div>
  )


}

const categories = [
  { type: 'Apartment', icon: '' },
  { type: 'House', icon: '' },
  { type: 'Bed & Breakfast', icon: '' },
  { type: 'Townhouse', icon: '' },
  { type: 'Other', icon: '' },
  { type: 'Loft', icon: '' },
  { type: 'Dorm', icon: '' },
  { type: 'Guesthouse', icon: '' },
  { type: 'Boat', icon: '' },
  { type: 'Bungalow', icon: '' },
  { type: 'Serviced apartment', icon: '' },
  { type: 'Condominium', icon: '' },
  { type: 'Boutique hotel', icon: '' },
  { type: 'Cabin', icon: '' },
  { type: 'Hostel', icon: '' },
  { type: 'Villa', icon: '' },
  { type: 'Camper/RV', icon: '' },
  { type: 'Chalet', icon: '' },
  { type: 'Tent', icon: '' },
  { type: 'Castle', icon: '' },
  { type: 'Yurt', icon: '' },
  { type: 'Hut', icon: '' },
  { type: 'Lighthouse', icon: '' },
  { type: 'Parking Space', icon: '' },
  { type: 'Cave', icon: '' },
  { type: 'Igloo', icon: '' },
  { type: 'Ryokan (Japan)', icon: '' },
  { type: 'Tipi', icon: '' },
];
