import { useMemo, useState, useEffect } from "react";
import { GoogleMap } from '@react-google-maps/api'
import Marker from "./Marker";

export default function Map({results, searchLocation }) {
    
    const [ center, setCenter] = useState({lat: 52.370216, lng: 4.895168 })

    // WORKS BUT CURRENTLY DISABLING TO PREVENT INCREMENTING COSTS
    // // User requested location change, only runs when search location has been changed
    // useEffect(() => {
    //     const geocoder = new google.maps.Geocoder();

    //     geocoder.geocode( { address: searchLocation}, (results, status) => {
    //         if(status === google.maps.GeocoderStatus.OK){
    //             console.log(results)
    //             const lat = results[0].geometry.location.lat()
    //             const lng = results[0].geometry.location.lng()
    //             setCenter({lat : lat, lng: lng})
    //         }
    //         else {
    //             alert('Geocode returned with the following error: ' + status)
    //         }
    //     })

    // }, [searchLocation])
    



    return <Google results={results} searchLocation={searchLocation} center={center} />
}


function Google({ results, center, searchLocation}) {

    // const center = useMemo(() => ({lat: 52.370216, lng: 4.895168 }));


    // Controls which marker is set to display it's show InfoWindow
    // Done this specific way so that only 1 show info window is shown at any singular point. 
    const [ showInfoIndex, setShowInfoIndex] = useState('');

    return (
                
        <GoogleMap 
            id="map"
            zoom={12} 
            center={center}
            options={{
                streetViewControl:false,
                mapTypeControl: false,
                fullscreenControl: false
            }}
            mapContainerClassName='map-container' 
        >
            { 
            results.data.map( (item, index) => {
                    let showInfo = false;
                    if (index === showInfoIndex ) { showInfo = true }

                    return <Marker 
                        index={index}  
                        showInfo={showInfo} 
                        setShowInfoIndex={setShowInfoIndex}
                        key={item.recordid}
                        item={ item } /> 
                })
            }
        </GoogleMap>
    )
}