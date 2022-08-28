import { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript , MarkerF } from '@react-google-maps/api'

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

    // const [ mapData, setMapData] = useState(data);

    // useEffect(() => { 
    //     console.log('MAP USEEFFECT')
    //     setMapData(data)
    // });

    return (
                
        <GoogleMap id="map" zoom={10} center={center} mapContainerClassName='map-container' >
            { data.data.map( (item) => ( 
                <MarkerF
                    key={item.recordid}
                    position={{ lat: item.fields.geolocation[0], lng: item.fields.geolocation[1] }}
                    icon={{
                        
                    }}
                />
                ))}
                <MarkerF key={111} position={{ lat: 52.370216, lng: 4.895168   }}></MarkerF>
        </GoogleMap>
    );
}