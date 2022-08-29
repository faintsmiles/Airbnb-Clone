import React, { useState } from 'react'
import { MarkerF, InfoWindowF } from '@react-google-maps/api'
import Thumbnail from "./Thumbnail";


export default function Marker({item}) {
    const [ showInfoWindow, setShowInfoWindow] = useState(false);
    return (    
            <MarkerF 
                key={item.recordid} 
                position={{ lat: item.fields.geolocation[0], lng: item.fields.geolocation[1] }}
                icon={{
                    url: '/icon.png',
                    scaledSize: new window.google.maps.Size(55, 40)
                }}
                label={{
                    text: '$ ' + item.fields.price.toString(),
                    color: 'white',
                    fontWeight: 'bold'
                }}
                clickable
                onClick={() => setShowInfoWindow(true)}
            >
                {   showInfoWindow &&
                    <InfoWindowF 
                        key={item.recordid} 
                        position={{ lat: item.fields.geolocation[0], lng: item.fields.geolocation[1] }}
                        id='infoWindowF'
                        onCloseClick={() => setShowInfoWindow(false)}
                    >   
                            <Thumbnail listingData={item.fields} />                        
                    </InfoWindowF>
                }
            </MarkerF>
    )
}
