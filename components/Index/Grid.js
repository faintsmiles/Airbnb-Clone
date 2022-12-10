import React from 'react'
import Thumbnail from '../common/Thumbnail'

export default function Grid({results, favorites, setFavorites}) {
  
    return (
      <section className='px-4 my-24 gap-4 gap-y-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-24 2xl:grid-cols-5 2xl:px-44 3xl:flex flex-wrap justify-center relative'>
        {   
            results.map((element) => {
            return <Thumbnail 
                key={element.recordid} 
                listing={element.fields} 
                location={element.geometry} 
                recordID={element.recordid}
                favorites={favorites} setFavorites={setFavorites}
              /> 
          }) 
        }
      </section>
  )
}
