import React, { useEffect, useState } from 'react'
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF, CircleF } from '@react-google-maps/api'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';





export default function MapSingleListing({results, center}) {

    // Are we connected to google's api
    const { isLoaded } = useLoadScript({
        // This needs to be hidden in the future, currently visible in network
        // May need to do SSR in future to prevent leaking or calling to API on server
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    })


    const [displayBubble, setDisplayBubble] = useState(true)


    if(!results || !center) return <>?????</>;
    if(!isLoaded) return <>Loading..</>


    const options = {
        strokeColor: '#FFC0CB',
        strokeOpacity: 0.8,
        strokeWeight: 0,
        fillColor: '#FFC0CB',
        fillOpacity: 0.6,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 1000,
        zIndex: 1
      }

  return (
        <GoogleMap 
            zoom={12} 
            center={center}            
            mapContainerClassName='listing-page-map'
            
        >
            <MarkerF          
                position={{ lat: center.lat, lng: center.lng }} 
                 
                icon={{
                    
                    url: ('/home_circle_icon.png'),
                    scaledSize: new window.google.maps.Size(40, 40),
                    anchor: new google.maps.Point(20,10)
                }}
                onClick={()=> setDisplayBubble(!displayBubble)}
                
            >
                <InfoWindowF 
                    position={{ lat: center.lat, lng: center.lng }} 
                    id='infoWindowF2'
                    onCloseClick={() => (null) }
                    
                    >
                        <div onClick={()=> setDisplayBubble(!displayBubble)}>
                            { displayBubble && 
                            <>
                                <div className='relative p-4 z-50 bg-white rounded-lg'>Exact location provided after booking</div>
                                <div className=' z-50 mx-auto w-0 h-0 border-l-[10px] border-l-transparent border-t-[15px] border-t-white border-r-[10px] border-r-transparent'></div>
                            </>
                            }        
                        </div>
                </InfoWindowF>
            
            
            </MarkerF>
            {/* <CircleF 
                id="approximateLocation"
                center={{lat: center.lat , lng: center.lng}}
                options={options}
            >
                
            </CircleF> */}
        </GoogleMap>
  )
}
