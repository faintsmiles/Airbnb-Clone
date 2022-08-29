import React, { useState } from 'react'
import { MarkerF, InfoWindowF } from '@react-google-maps/api'
// import Thumbnail from "./Thumbnail";
import MapThumbnail from './MapThumbnail';

export default function Marker({item}) {
    const [ showInfoWindow, setShowInfoWindow] = useState(false);

    if( !item.fields.geolocation  ) return;
    if(!item.fields.price  ) return ;
    if(!item.fields.xl_picture_url) return;
    if (!item.fields.smart_location ) return ;
    
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
                            <MapThumbnail listingData={item.fields} />                        
                    </InfoWindowF>
                }
            </MarkerF>
    )
}
