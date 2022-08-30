import React, { useState, useEffect } from 'react'
import Thumbnail from './Thumbnail'



export default function List({results, isLoading}) {
    // if (isLoading) return <p>Loading...</p>
    if (!results) return <p>Results could not be fetched. Please try refreshing</p>


    return (
    <>
      {console.log('rerender list')}
      {/* {console.log(data)} */}
      <div className='px-4 my-24 gap-4 gap-y-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:px-15 lg:grid-cols-4 lg:px-24 2xl:grid-cols-5 2xl:px-48 3xl:flex flex-wrap justify-center relative'>
        {   
            results.data.map((element) => {
            return <Thumbnail 
            results={element.fields} 
            location={element.geometry} 
            key={element.recordid} 
            />
          }) 
        }
      </div>
    </>
  )
}
