import React from 'react'
import List from '../components/List'
import Map from '../components/Map'


export default function Content({data, showMap, searchLocation}) {
    if(!showMap) return <List data={data} />
    if(showMap) return <Map data={data} searchLocation={searchLocation} />
    
    return null;
}
