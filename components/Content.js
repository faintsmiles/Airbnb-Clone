import React,  {useState, useEffect} from 'react'
import List from '../components/List'
import Map from '../components/Map'


export default function Content({results, showMap, searchLocation}) {

    const [ center, setCenter] = useState({lat: 52.370216, lng: 4.895168 })

    console.log(searchLocation)
    // WORKS BUT CURRENTLY DISABLING TO PREVENT INCREMENTING COSTS
    // User requested location change, only runs when search location has been changed
    useEffect(() => {

        if(!searchLocation) { return}

        const geocoder = new google.maps.Geocoder();

        geocoder.geocode( { address: searchLocation}, (results, status) => {
            if(status === google.maps.GeocoderStatus.OK){
                console.log(results)
                const lat = results[0].geometry.location.lat()
                const lng = results[0].geometry.location.lng()
                setCenter({lat : lat, lng: lng})
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
