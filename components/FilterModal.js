import React, {useState} from 'react'
import FitlerModalCheckBox from './common/FitlerModalCheckBox'

import { faBuilding, faHotel, faHouse, faHouseUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FilterModalMenuButtons from './common/FilterModalMenuButtons';
import FilterModalMenuButtonIcon from './common/FilterModalMenuButtonIcon';

export default function FilterModal({setShowFilterModal, searchLocation, setResults}) {
 
  // Overall filter options and types

  // Options for bedrooms, beds, and bathrooms. Section name 'Rooms and beds' 
  const roomOptions = ['Any', '1' , '2', '3', '4', '5', '6','7', '8+']
  // Property types available and their fontawesome icons
  const propertyOptions = [ 
    { type: 'House', icon: faHouse, value: 'House'},
    {type: 'Apartment', icon: faBuilding , value: 'Apartment'}, 
    { type: 'Guesthouse', icon: faHouseUser, value: 'Guesthouse' }, 
    {type:'Hotel', icon: faHotel, value: 'Boutique hotel'}
  ]
  // Objects containingg the subcategory title and list of options with title/descriptions for each respective choice available
  const typeOfRoom= {
    subcategory: '',
    items: [
      { title: 'Entire Place', description: 'A place all to yourself', value: 'Entire home/apt' },
      { title: 'Private Room', description: 'Your own room in a home or a hotel, plus some shared common spaces', value: 'Private room'},
      { title: 'Shared Room', description: 'A sleeping space and common areas that may be shared with others', value: 'Shared room'}
    ]
  }
  const amenities = [{
    subcategory: 'Essentials',
    items: [ 
      { title: 'Wireless Internet', description: '' },
      { title: 'Kitchen', description: '' },
      { title: 'Washer', description: '' },
      { title: 'Dryer', description: '' },
      { title: 'Air conditioning', description: '' },
      { title: 'Heating', description: '' },
      { title: 'TV', description: '' },
      { title: 'Hair Dryer', description: '' },
      { title: 'Iron', description: '' },
      { title: 'Wheelchair accessible', description: '' },
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
      { title: 'Smoke detector', description: '' },
      { title: 'Carbon monoxide detector', description: '' },
    ]
  }
]

  // States and controls

  // Type of room (ie: solo, private, shared)
  const [roomType, setRoomType] = useState([])
  // Keeps track of which Rooms and beds option has been selected
  const [bedrooms, setBedrooms] = useState()
  const [beds, setBeds] = useState()
  const [bathrooms, setBathrooms] = useState()
  // Property Type
  const [property, setProperty] = useState()
  // Amenities
  const [essentials, setEssentials] = useState([])
  const [features, setFeatures] = useState([])
  const [safety, setSafety] = useState([])

  
  // Object containing the current state values and set state functions for grouped items, used to map through easily
  const roomStates = [ {category: 'Bedrooms', value: bedrooms, setValue: setBedrooms}, { category: 'Beds', value: beds, setValue: setBeds}, { category: 'Bathrooms', value: bathrooms, setValue: setBathrooms} ] 
  const amenityStates = [ { value: essentials, setValue: setEssentials}, { value: features, setValue: setFeatures}, {value: safety, setValue: setSafety} ]

  function clearFilter() {
    setRoomType([])

    setBedrooms()
    setBeds()
    setBathrooms()

    setProperty()
    setEssentials([])
    setFeatures([])
    setSafety([])
  }


  function fetchNewData() {
    const optionsSelected = createFetchList(optionsSelected)
    console.log(optionsSelected)
    createQueryURL(optionsSelected)
  }
  function createQueryURL(optionsSelected) {
    // 
    // Url builder
    // ORDER: apiURL, Rows, propertyType, roomType, essentials location
    const apiURL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&rows='
    let rows = 30;
    let propertyURL = ''
    let roomURL = ''
    let essentialsURL = ''
    let locationURL = '' 
    // Requests we'll be calling
    const urlsToQuery = []

    // Append url with options that are queryable 
    // ORDER: apiURL, Rows, propertyType, roomType, essentials location
    optionsSelected.property ? propertyURL += ('&refine.property_type=' + optionsSelected.property) : null ;
    
    optionsSelected.essentials.map(element => essentialsURL += '&refine.amenities=' + element )
    optionsSelected.features.map(element => essentialsURL += '&refine.amenities=' + element )
    optionsSelected.safety.map(element => essentialsURL += '&refine.amenities=' + element )
    locationURL += '&refine.city=' + searchLocation

    // Room types were selected
    if (optionsSelected.room.length != 0 && optionsSelected.room.length != typeOfRoom.items.length){ 
      rows = 15;
      optionsSelected.room.map(element => {
        roomURL = '&refine.room_type=' + element
        urlsToQuery.push(
         fetch((apiURL + rows + propertyURL + roomURL + essentialsURL + locationURL).replace(/ /g, '+'))
         .then(response => response.json())
         .then(response => response.records)
        )
      })
    }
    else {
      urlsToQuery.push(
        fetch((apiURL + rows + propertyURL + essentialsURL + locationURL).replace(/ /g, '+'))
        .then(response => response.json())
        .then(response => response.records)
      )
    }

    Promise.all(urlsToQuery)
      .then(results => {
        console.log(results.flat())
        setResults(results.flat())
      })
      .catch( err => alert('There was a problem getting filter results. Please try again.'))

  }

  function createFetchList(filters) {
    // create object to store the data, we'll be fetching
     const optionsSelected = {
      room: [],
      bedrooms: '',
      beds: '',
      bathrooms: '',
      property: '',
      // amenities
      essentials: [],
      features: [],
      safety: []
    }
    // 0 is false
    roomType.length ? optionsSelected.room = [...roomType] : console.log(false)
    bedrooms ? optionsSelected.bedrooms = bedrooms : console.log(false)
    beds ? optionsSelected.beds = beds : console.log(false)
    bathrooms ? optionsSelected.bathrooms = bathrooms : console.log(false)
    property ? optionsSelected.property = property : console.log(false)
    essentials.length ? optionsSelected.essentials = [...essentials] : console.log(false)
    features.length ? optionsSelected.features = [...features] : console.log(false)
    safety.length ? optionsSelected.safety = [...safety] : console.log(false)
    console.log(optionsSelected)
    
    return optionsSelected
  }


  return (
    // Modal container
    <div className='fixed h-full w-full top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 p-1 md:p-8' onClick={()=> setShowFilterModal(false)} >
        {/* Filter form */}
        <div className='relative flex flex-col w-full h-full md:max-w-4xl top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 bg-white rounded-xl overflow-auto overflow-y-visible z-50 no-scrollbar' onClick={(e) => e.stopPropagation()} >
            
          {/* Form Header */}
          <header className='bg-white py-2 flex justify-center border-b z-10'>
              <h1 className='p-4 font-bold'>Filters</h1>
              <button className='absolute top-5 left-3 p-1 px-3 hover:bg-gray-100 rounded-full' onClick={()=> setShowFilterModal(false)}>
                  <FontAwesomeIcon icon={faXmark} />
              </button>
          </header>

          {/* Filter settings/options */}
          <form className='h-full py-2 overflow-y-scroll overscroll-contain' >
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
          <button type='button' className='px-8 py-4 bg-black text-white rounded-xl' onClick={(e)=> fetchNewData()}>Update listings</button>
        </section>

        </div>
    </div>
  )
}
