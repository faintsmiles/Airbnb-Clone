import React, { useState, useEffect } from 'react'
import Thumbnail from './Thumbnail'



export default function List() {
  

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
      fetch('/api/hello')
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    }, [])
  
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>Data could not be fetched</p>


    return (
    <>
      <div className='px-2 my-10 gap-4 sm:grid md:grid-cols-2 xl:grid-cols-5 3xl:flex flex-wrap justify-center relative'>
        { data.data.map((result) => {
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
