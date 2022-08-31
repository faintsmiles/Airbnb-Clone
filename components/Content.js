import React,  {useState, useEffect} from 'react'
import List from '../components/List'
import Map from '../components/Map'


export default function Content({ results, setResults, searchLocation, showMap }) {

    // Default center
    const [ center, setCenter] = useState({lat: 52.370216, lng: 4.895168 })
   
    // User requested location change, only runs when search location has been changed
    useEffect(() => {

        if(!searchLocation) { return}

        const geocoder = new google.maps.Geocoder();

        geocoder.geocode( { address: searchLocation}, (results, status) => {
            if(status === google.maps.GeocoderStatus.OK){
                console.log("Geocoding: ")
                console.log(results)
                const lat = results[0].geometry.location.lat()
                const lng = results[0].geometry.location.lng()
                setCenter({lat : lat, lng: lng})
                fetchNewResults(setResults)
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

const fetchNewResults = ({ setResults }) => {
    let tempHelper = searchLocation.split(',');
    
    const body = { 
      city: tempHelper[0], 
      country: tempHelper[tempHelper.length - 1] 
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