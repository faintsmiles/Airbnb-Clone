import { useState } from "react";
import { GoogleMap } from '@react-google-maps/api'
import Marker from "./Marker";

export default function Map({results, center, favorites, setFavorites }) {
    return <Google results={results} center={center} favorites={favorites} setFavorites={setFavorites} />
}


function Google({ results, center, favorites, setFavorites }) {

    // Controls which marker is set to display it's show InfoWindow
    // Done this specific way so that only 1 show info window is shown at any singular point. 
    const [ showInfoIndex, setShowInfoIndex] = useState('');

     if(!results)  {
       return <GoogleMap 
        id="map"
        zoom={10} 
        center={center}
        options={{
            streetViewControl:false,
            mapTypeControl: false,
            fullscreenControl: false
        }}
        mapContainerClassName='map-container' 
    >
        <div className="absolute p-4 w-full h-max border z-50 bg-white text-black font-bold text-center mx-auto ">Results could not be fetched. Please try refreshing</div>
    </GoogleMap>
    }
     if(results.length === 0) {
       return <GoogleMap 
        id="map"
        zoom={10} 
        center={center}
        options={{
            streetViewControl:false,
            mapTypeControl: false,
            fullscreenControl: false
        }}
        mapContainerClassName='map-container' 
    >
          <div className="absolute p-4 w-full h-max border z-50 bg-white text-black font-bold text-center mx-auto  ">No results found</div>
    </GoogleMap>

     }

    return (              
        <GoogleMap 
            id="map"
            zoom={10} 
            center={center}
            options={{
                streetViewControl:false,
                mapTypeControl: false,
                fullscreenControl: false
            }}
            mapContainerClassName='map-container' 
            onIdle={() => null }
            onDragEnd={() => null }
        >
            { 
                results.map((item, index) => {
                    let showInfo = false;
                    if (index === showInfoIndex ) { showInfo = true }
                    return (
                    <Marker 
                        index={index}  
                        showInfo={showInfo} 
                        setShowInfoIndex={setShowInfoIndex}
                        key={item.recordid}
                        item={ item }
                        favorites={favorites} setFavorites={setFavorites}
                    />)
                })
            }
        </GoogleMap>
    )
}