
// Components
import Head  from 'next/head'
import Header from '../components/Header'
import Category from '../components/Category'
import FilterModal from '../components/FilterModal'
import Content from '../components/Content'
import ListMapControl from '../components/ListMapControl'
import FooterCondensed from '../components/FooterCondensed'

// React hooks
import { useState } from 'react'

// Utility library for google maps API
import { useLoadScript  } from '@react-google-maps/api'


export default function Home({data, defaultLocation }) {
  
  // Are we connected to google's api
  const { isLoaded } = useLoadScript({
    // This needs to be hidden in the future, currently visible in network
    // May need to do SSR in future to prevent leaking or calling to API on server
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
})

  const [ results, setResults ] = useState(data)
  const [searchLocation, setSearchLocation] = useState(defaultLocation);
  const [ mapToggle, setMapToggle] = useState(false);
  const [ showFilterModal, setShowFilterModal] = useState(false);

  const [ wishList, setWishList] = useState({});
  
  if(!isLoaded) return <h1> Loading ... </h1>

  return (
    <div>
      {console.log('render main')}
      <Head>
        <title>Airbnb Clone</title>
        <meta name="description" content="Airbnb clone created with NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <Header setSearchLocation={setSearchLocation} />

        <Category setShowFilterModal={setShowFilterModal} />

        <Content results={results} setResults={setResults} searchLocation={searchLocation} showMap={mapToggle} />
 
        <ListMapControl isMapActive={mapToggle} toggleMap={setMapToggle} />

        {/* Footer only shows on list view  */}
        { !mapToggle && 
          <div className='w-full fixed bottom-0'>
             <FooterCondensed  /> 
          </div>  
        }
        {/* Filter Modal only shows when filter button inside of Category component is clicked */}
        { showFilterModal && <FilterModal setShowFilterModal={setShowFilterModal} searchLocation={searchLocation} setResults={setResults} /> }

      </main>
    </div>
  )
}

export async function getServerSideProps (context) {
  // inefficient to call the nextjs api which then calls supporting API, but we're aiming to hide the OpenData API url 
  // Check this later in network tab. may also need to reduce data size in the future or modify api url
  const res = await fetch ( 'http://localhost:3000/api/hello')
  const data = await res.json();
  console.log('API CALL');
  console.log(data)
  return { props: { data: data.data, defaultLocation: data.defaultLocation } }
}