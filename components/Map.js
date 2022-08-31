import { useMemo, useState, useEffect } from "react";
import { GoogleMap } from '@react-google-maps/api'
import Marker from "./Marker";

export default function Map({results, center }) {
    return <Google results={results} center={center} />
}


function Google({ results, center }) {

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
            {   results.data.length === 0 && <div className="absolute p-4 w-full h-max border z-50 bg-white text-black font-bold text-center mx-auto  ">No results found</div>}
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