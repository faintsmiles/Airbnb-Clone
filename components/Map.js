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

    return (
                
        <GoogleMap id="map" zoom={12} center={center} mapContainerClassName='map-container' >
            { 
                data.data.map( item => <Marker key={item.recordid} item={ item } />)
            }
        </GoogleMap>
    )
}