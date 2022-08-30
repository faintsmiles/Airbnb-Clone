import { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import Marker from "./Marker";

export default function Map({data}) {


    const { isLoaded } = useLoadScript({
        // This needs to be hidden in the future, currently visible in network
        // May need to do SSR in future to prevent leaking or calling to API on server
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    })

    if(!isLoaded) return <div>Loading...</div>

    return <Google data={data} />
}


function Google({data}) {

    const center = useMemo(() => ({lat: 52.370216, lng: 4.895168 }));

    // Controls which marker is set to display it's show InfoWindow
    // Done this specific way so that only 1 show info window is shown at any singular point. 
    const [ showInfoIndex, setShowInfoIndex] = useState('');

    return (
                
        <GoogleMap id="map" zoom={12} center={center}
            options={{
                streetViewControl:false,
                mapTypeControl: false,
                fullscreenControl: false
            }}
            mapContainerClassName='map-container' 
        >
            { 
            data.data.map( (item, index) => {
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