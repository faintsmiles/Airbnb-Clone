import Link from 'next/link'
import React from 'react'
import Thumbnail from './Thumbnail'

export default function List({results, isLoading}) {
    // if (isLoading) return <p>Loading...</p>
    console.log(results)
    if (!results || !results.data) return <p className='className="absolute p-4 w-full h-max border z-50 bg-white text-black font-bold text-center mx-auto "'>Results could not be fetched. Please try refreshing</p>
    if(results.data.length === 0) return <div className="p-4 w-full h-max border z-50 bg-white text-black font-bold text-center mx-auto">No results found</div>
    
    return (
      <>
        <div className='px-4 my-24 gap-4 gap-y-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-24 2xl:grid-cols-5 2xl:px-44 3xl:flex flex-wrap justify-center relative'>
          {   
              results.data.map((element) => {
              return <Thumbnail 
                  results={element.fields} 
                  location={element.geometry} 
                  key={element.recordid} 
                  listingID={element.recordid}
                /> 
            }) 
          }
        </div>
      </>
  )
}
