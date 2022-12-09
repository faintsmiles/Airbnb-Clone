import React, {useState, useEffect} from 'react'
// componenets
import FitlerModalCheckBox from './common/FitlerModalCheckBox'
import FilterModalMenuButtons from './common/FilterModalMenuButtons';
import FilterModalMenuButtonIcon from './common/FilterModalMenuButtonIcon';
import RangeSlider from './common/RangeSlider';

// fontawesome
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Options available within filter modal
import { roomOptions, propertyOptions, typeOfRoom, amenities } from '../utils/filterModalOptions'

export default function FilterModal({ carouselFocus, setCarouselFocus, setShowFilterModal, searchLocation, results, setResults}) {
 
  // States and controls
  // Min/max price of rooms
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(600)
  const [avgPrice, setAvgPrice] = useState()
  // Type of room (ie: solo, private, shared)
  const [roomType, setRoomType] = useState([])
  // Keeps track of which Rooms and beds option has been selected
  const [bedrooms, setBedrooms] = useState()
  const [beds, setBeds] = useState()
  const [bathrooms, setBathrooms] = useState()
  // Property Type
  const [property, setProperty] = useState(carouselFocus)
  // Amenities
  const [essentials, setEssentials] = useState([])
  const [features, setFeatures] = useState([])
  const [safety, setSafety] = useState([])

  // Objects containing the current state values and set state functions for grouped items, used to map through easily when building components
  const roomStates = [ {category: 'Bedrooms', value: bedrooms, setValue: setBedrooms}, { category: 'Beds', value: beds, setValue: setBeds}, { category: 'Bathrooms', value: bathrooms, setValue: setBathrooms} ] 
  const amenityStates = [ { value: essentials, setValue: setEssentials}, { value: features, setValue: setFeatures}, {value: safety, setValue: setSafety} ]

  useEffect(() => {
    if(!results) { return }

    let averagePrice = 0;
    results.map(result => averagePrice += parseInt(result.fields.price))
    setAvgPrice( (averagePrice/results.length).toFixed(2) )
  }, [])

  // Reset states
  function clearFilter() {
    setMinPrice(0)
    setMaxPrice(600)
    setRoomType([])
    setBedrooms()
    setBeds()
    setBathrooms()
    setProperty()
    setEssentials([])
    setFeatures([])
    setSafety([])
  }
  // Get new data with current filters
  function fetchNewData() { 
    property != carouselFocus ? setCarouselFocus(null) : null // if filter property doesnt match carouselFocus, reset it
    const _filters = { minPrice, maxPrice, roomType, bedrooms, beds, bathrooms, property, essentials, features, safety, searchLocation }
    fetch('/api/filter', {
      method: 'POST',
      body: JSON.stringify(_filters)
    })
    .then((response) => response.json())
    .then(results => setResults(results))
  }
  
  return (
    // Modal container
    <div className='fixed h-full w-full top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 p-1 md:p-8' onClick={()=> setShowFilterModal(false)} >
        {/* Filter form */}
        <div className='relative flex flex-col w-full h-full md:max-w-4xl top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 bg-white rounded-xl overflow-auto overflow-y-visible z-50 no-scrollbar' onClick={(e) => e.stopPropagation()} >
          {/* Form Header */}
          <header className='bg-white py-6 flex justify-center border-b z-10'>
              <h1 className='text-2xl font-bold'>Filters</h1>
              <button className='absolute top-5 left-3 p-1 px-3 hover:bg-gray-100 rounded-full' onClick={()=> setShowFilterModal(false)}>
                  <FontAwesomeIcon icon={faXmark} />
              </button>
          </header>

          {/* Filter settings/options */}
          <form className='h-full py-2 overflow-y-scroll overscroll-contain' >
            {/* Price Range  */}
            <section className=' w-auto mx-8 py-8 border-b'>
              <p className='text-lg  font-semibold '>Price Range</p>
              <p className='text-gray-600'>The average nightly price is ${avgPrice}</p>
              {/* Input Boxes */}
              <RangeSlider 
                minPrice={minPrice} setMinPrice={setMinPrice} 
                maxPrice={maxPrice} setMaxPrice={setMaxPrice} 
              />
              {/*  */}

            </section>

            {/* Type of room */}
            <section className=' w-auto mx-8 py-8 border-b'>
              <div className='text-lg font-semibold'>Type of place</div>
              <FitlerModalCheckBox options={typeOfRoom} amenity={roomType} setAmenity={setRoomType} />
            </section>

            {/* Rooms and beds filter  */}
            <section className='w-auto mx-8 py-8 border-b'>
              <div className='text-lg font-semibold' >Rooms and beds</div> 
              {/* Subcategories  */}
              {roomStates.map((item, index) => {
                return (
                  <FilterModalMenuButtons
                    id={"numberOf" + item.category}
                    key={item.category + index}
                    title={item.category}
                    options={roomOptions}
                    optionSelected={item.value}
                    setOptionSelected={item.setValue}
                  />
                );
              })}
            
            </section>
            {/* Property Type filter  */}
            <section className='w-auto mx-8 py-8 border-b'>
              <div className='mb-8 text-lg font-bold '>Property Type</div>
              <div className='flex gap-4'>
                {/* Property options */}
                {propertyOptions.map((element) => {
                  return (
                    <FilterModalMenuButtonIcon 
                      key={element.type} type={element.type} 
                      icon={element.icon} value={element.value}
                      property={property} setProperty={setProperty} 
                    />
                  )
                })}         
              </div>
            </section>

            {/* Amenities */}
            <section className='w-auto mx-8 pt-8'>
              <div className='text-xl pb-12 font-bold'>Amenities</div>
              { amenities.map((element, index) => {
                return <FitlerModalCheckBox key={element + index} options={element} amenity={amenityStates[index].value} setAmenity={amenityStates[index].setValue} />
              } )}              
            </section>
          </form>

        {/* Form clear-all / send */}
        <section className='sticky bottom-0 px-8 py-2 flex h-20 w-full  justify-between items-center border-t font-semibold '>
          <div className='underline hover:cursor-pointer' onClick={(e)=> clearFilter()} >Clear all</div>
          <button type='button' className='px-8 py-4 bg-black text-white rounded-xl' onClick={(e)=> {fetchNewData(); setShowFilterModal(false)}}>Update listings</button>
        </section>

        </div>
    </div>
  )
}


// **No longer needed - api allows us to filter by beds . . .
// function filterResultsByBeds(results, filters) {

//   if (!filters) {return}

//   Object.keys(filters).forEach((key) => {
        
//     if (!filters[key]) {return}

//     results = results.filter(result => parseInt(result.fields[key]) >= parseInt(filters[key]))

//   })

//   return results;
// }

// **No longer needed - api allows us to filter by price . . . 
// function filterResultsByPrice(results, minPrice, maxPrice) {
//   if(!results) {return}

//   results = results.filter(result => {
//     return parseInt(minPrice) <= parseInt(result.fields['price']) && parseInt(maxPrice) >= parseInt(result.fields['price'])  
//   })
//   return results;
// }