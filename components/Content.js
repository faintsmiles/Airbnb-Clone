import React,  {useState, useEffect} from 'react'
import List from '../components/List'
import Map from '../components/Map'


export default function Content({ results, setResults, searchLocation, showMap }) {

    const [intitialRender, setInitialRender] = useState(0)
    // Default center
    const [ center, setCenter] = useState({lat: 52.370216, lng: 4.895168 })
   
    // User requested location change, only runs when search location has been changed
    useEffect(() => {
        // Prevents geocoder from fetching new results on the initial render
        if(intitialRender === 0) { setInitialRender(1); return; }
        
        const geocoder = new google.maps.Geocoder();

        // Gets the coordinates for the address inside of search 
        geocoder.geocode( { address: searchLocation}, (results, status) => {
            if(status === google.maps.GeocoderStatus.OK){
                console.log("Geocoding: ")
                console.log(results)
                const lat = results[0].geometry.location.lat()
                const lng = results[0].geometry.location.lng()
                setCenter({lat : lat, lng: lng})
                fetchNewResults( results, setResults )
            }
            else {
                alert('Geocode returned with the following error: ' + status)
            }
        })

    }, [searchLocation])


    if(!showMap) return <List results={results} />
    if(showMap) return <Map results={results} center={center} />
    
    return null;
}

const fetchNewResults = ( results, setResults ) => {
    
    let tempCityHelper = results[0].formatted_address.split(',');
    let tempCountryHelper;
    results[0].address_components.map(element => {
        if(element.types.includes('country'))
            tempCountryHelper = element.long_name;
    })

    // .trim().replace(/\s/g, "+") - removes leading/trailing whitespaces and then replaces remaining with '+' symbol
    const body = { 
      city: tempCityHelper[0].trim().replace(/\s/g, "+"), 
      country: tempCountryHelper ? tempCountryHelper.trim().replace(/\s/g, "+") : tempCityHelper[tempHelper.length - 1].trim().replace(/\s/g, "+"),
    }

    fetch('/api/hello', {
      method: 'POST',
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then( result => {
      console.log("Fetching new results...")
      console.log(result)
      setResults(result ) 
    })
    .catch( err => alert('There was a problem getting listing data. Please try again, or change destination'))
}