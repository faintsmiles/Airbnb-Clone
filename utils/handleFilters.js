import { typeOfRoom as ROOM_TYPES } from '../utils/filterModalOptions'

export function cleanFilters({minPrice, maxPrice, roomType, bedrooms, beds, bathrooms, property, essentials, features, safety, searchLocation}) {

    // create object to store the data, we'll be fetching
     const _filters = {
      minPrice: '',
      maxPrice: '',
      room: [],
      bedrooms: '',
      beds: '',
      bathrooms: '',
      property: '',
      // amenities
      essentials: [],
      features: [],
      safety: [],
      searchLocation
    }
    // 0 is false and 'Any' means filtering isnt necessary
    _filters.minPrice = minPrice
    _filters.maxPrice = maxPrice
    roomType.length ? _filters.room = [...roomType] : null
    bedrooms && bedrooms != 'Any' ? _filters.bedrooms = parseInt(bedrooms) : null
    beds && beds != 'Any' ? _filters.beds = parseInt(beds) : null
    bathrooms && bathrooms != 'Any' ? _filters.bathrooms = parseInt(bathrooms) : null
    property ? _filters.property = property : null
    essentials.length ? _filters.essentials = [...essentials] : null
    features.length ? _filters.features = [...features] : null
    safety.length ? _filters.safety = [...safety] : null
    searchLocation ? _filters.searchLocation = searchLocation : null

    return _filters
  }

export function createQueryURL(_filters, apiURL) {
    // 
    // Url builder
    // ORDER: apiURL, Beds BedRooms Bathrooms, Price, Rows, propertyType, roomType, essentials location    
    let queriesURL =''
    let priceURL = ''
    let rows = `&rows=${30}`;
    let propertyURL = ''
    let roomURL = ''
    let essentialsURL = ''
    let locationURL = '' 
    // Requests we'll be calling
    const urlsToQuery = []

    // Build query url
    // ORDER: apiURL, queries(beds, bedrooms,baths, minprice,maxprice, rows), propertyType, roomType, essentials, location
    _filters.beds ? queriesURL += `beds%3E%3D${_filters.beds}+` : null
    _filters.bedrooms ? queriesURL += `bedrooms%3E%3D${_filters.bedrooms}+` : null
    _filters.bathrooms ? queriesURL += `bathrooms%3E%3D${_filters.bathrooms}+` : null
    priceURL +=  `price%3E%3D${_filters.minPrice}+` + `price+%3C%3D${_filters.maxPrice}`

    _filters.property ? propertyURL += ('&refine.property_type=' + _filters.property) : null ;
    
    _filters.essentials.map(element => essentialsURL += '&refine.amenities=' + element )
    _filters.features.map(element => essentialsURL += '&refine.amenities=' + element )
    _filters.safety.map(element => essentialsURL += '&refine.amenities=' + element )
    _filters.searchLocation ? locationURL += '&refine.city=' + _filters.searchLocation : null

    // Query for each room type selected (can only search 1 at a time through api)
    if (_filters.room.length != 0 && _filters.room.length != ROOM_TYPES.items.length){ 
      rows = `&rows=${15}`;
      _filters.room.map(element => {
        roomURL = '&refine.room_type=' + element
        urlsToQuery.push(
         fetch((apiURL + queriesURL + priceURL + rows + propertyURL + roomURL + essentialsURL + locationURL).replace(/ /g, '+'))
         .then(response => response.json())
         .then(response => response.records)
        )
      })
    }
    else {
      urlsToQuery.push(
        fetch((apiURL + queriesURL + priceURL + rows + propertyURL + essentialsURL + locationURL).replace(/ /g, '+'))
        .then(response => response.json())
        .then(response => response.records)
      )
    }

    return urlsToQuery

}