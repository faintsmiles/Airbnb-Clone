import { useMemo } from "react";
import { GoogleMap, useLoadScript , Marker } from '@react-google-maps/api'

export default function Map() {

    const { isLoaded } = useLoadScript({
        // This needs to be hidden in the future, currently visible in network
        // May need to do SSR in future to prevent leaking or calling to API on server
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    })

    if(!isLoaded) return <div>Loading...</div>

    return <Google/>
}


function Google() {
    const center = useMemo(() => ({lat:44, lng: -80}))
    
    return (
        
        <GoogleMap zoom={10} center={center} mapContainerClassName='map-container' >
            {console.log('rerender Map')}
            <Marker position={center}></Marker>
        </GoogleMap>
    );
}