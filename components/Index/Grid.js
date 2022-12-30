import React, {useState} from 'react'
import InfiniteScroll from "react-infinite-scroll-component";

import Thumbnail from '../common/Thumbnail'

export default function Grid({results, setResults, favorites, setFavorites, currentFetch}) {

  const [hasMore, setHasMore] = useState(true);

  const getMoreResults = () => {

    const fetchCall = currentFetch.api
    const criteria = currentFetch.criteria
    criteria.pagination = results.length;
    
    fetch(fetchCall, {
      method: 'POST',
      body: JSON.stringify(criteria)
    } )
    .then(response => response.json())
    .then(newResults => {
      if(newResults.length === 0) {setHasMore(false)}
      setResults([...results, ...newResults])
    })
    .catch(err => setHasMore(false))
  }
  
    return (
      <InfiniteScroll
      dataLength={results.length}
      next={getMoreResults}
      hasMore={hasMore}
      loader={<div className='w-full pb-16 mb-36 text-center text-lg font-bold'>Loading...</div>}
      endMessage={<div className='w-full pb-16 mb-36 text-center text-lg font-bold'>No more results</div>} 
      >
        <section className='px-4 my-8 gap-4 gap-y-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-24 2xl:grid-cols-5 2xl:px-44 3xl:flex flex-wrap justify-center relative'>
          {   
              results.map((element) => {
              return <Thumbnail 
                  key={element.recordid} 
                  listing={element.fields} 
                  location={element.geometry} 
                  recordID={element.fields.id}
                  favorites={favorites} setFavorites={setFavorites}
                /> 
            }) 
          }
        </section>
      </InfiniteScroll>

  )
}
