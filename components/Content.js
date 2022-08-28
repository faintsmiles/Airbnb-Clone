import React from 'react'
import List from '../components/List'
import Map from '../components/Map'


export default function Content({data, isLoading, showMap}) {

    if(!showMap) return <List data={data} isLoading={isLoading} />
    if(showMap) return <Map data={data} isLoading={isLoading}  />
    
    return null;
}
