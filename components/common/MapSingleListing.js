import React, { useState } from 'react'
import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api'


export default function MapSingleListing({results, center}) {

    const [displayBubble, setDisplayBubble] = useState(true)

    if(!results || !center) return <>?????</>;

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
