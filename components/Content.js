import React from 'react'
import List from '../components/List'
import Map from '../components/Map'


export default function Content({results, showMap, searchLocation}) {
    if(!showMap) return <List results={results} />
    if(showMap) return <Map results={results} searchLocation={searchLocation} />
    
    return null;
}
