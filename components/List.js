import React, { useState, useEffect } from 'react'
import Thumbnail from './Thumbnail'



export default function List({data, isLoading}) {
  
  
    // if (isLoading) return <p>Loading...</p>
    if (!data) return <p>Data could not be fetched. Please try refreshing</p>


    return (
    <>
      {console.log('rerender list')}
      {/* {console.log(data)} */}
      <div className='px-4 my-24 gap-4 gap-y-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:px-15 lg:grid-cols-4 lg:px-24 2xl:grid-cols-5 2xl:px-48 3xl:flex flex-wrap justify-center relative'>
        {   
            data.data.map((result) => {
            return <Thumbnail 
            listingData={result.fields} 
            location={result.geometry} 
            key={result.recordid} 
            />
          }) 
        }
      </div>
    </>
  )
}
