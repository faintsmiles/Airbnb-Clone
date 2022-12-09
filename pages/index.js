
// Components
import Head  from 'next/head'
import Header from '../components/Header'
import Category from '../components/Category'
import Content from '../components/Content'
import ListMapControl from '../components/ListMapControl'
import FilterModal from '../components/FilterModal'
import FavoritesModal from '../components/FavoritesModal'
import FooterCondensed from '../components/FooterCondensed'

// React hooks
import { useState, useEffect } from 'react'

// Utility library for google maps API
import { useLoadScript  } from '@react-google-maps/api'
import { refreshFavorites } from '../utils/favorites'


// google maps libraries
const googleLibraries =  ['places']


export default function Home({data, defaultLocation }) {
  
  // Are we connected to google's api
  const { isLoaded } = useLoadScript({
    // This needs to be hidden in the future, currently visible in network
    // May need to do SSR in future to prevent leaking or calling to API on server
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: googleLibraries,
  })
  
  const [results, setResults ] = useState(data)
  const [searchLocation, setSearchLocation] = useState(defaultLocation);
  const [carouselFocus, setCarouselFocus] = useState()
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [mapToggle, setMapToggle] = useState(false);
  const [favorites, setFavorites]  = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
    
  const callRefreshFavorites = () => { refreshFavorites(setFavorites)}

  useEffect(() => {
    // syncs/refreshes favorites if altered in another tab witin the same domain
    window.addEventListener('storage', callRefreshFavorites)
    // remove event and clear local storage when the index page is closed 
    return () => { 
      window.removeEventListener('storage', callRefreshFavorites)
      window.onunload = function() { localStorage.clear(); } 
    }
  }, [])

  

  if(!isLoaded) return <h1> Loading ... </h1>


  return (
    <div>
      <Head>
        <title>Airbnb Clone</title>
        <meta name="description" content="Airbnb clone created with NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <Header setSearchLocation={setSearchLocation} favorites={favorites} setShowFavorites={setShowFavorites} />

        <Category
         carouselFocus={carouselFocus} setCarouselFocus={setCarouselFocus} 
         searchLocation={searchLocation} setResults={setResults} setShowFilterModal={setShowFilterModal} 
        />

        <Content 
          results={results} setResults={setResults} 
          searchLocation={searchLocation} showMap={mapToggle} 
          favorites={favorites} setFavorites={setFavorites}
          />
 
        <ListMapControl isMapActive={mapToggle} toggleMap={setMapToggle} />

        {/* Footer only shows on list view  */}
        { !mapToggle && 
          <div className='w-full fixed bottom-0 z-50'>
             <FooterCondensed  /> 
          </div>  
        }
        {/* Filter Modal only shows when filter button inside of Category component is clicked */}
        { showFilterModal && 
          <FilterModal 
          carouselFocus={carouselFocus} setCarouselFocus={setCarouselFocus}
          results={results} setResults={setResults} 
          searchLocation={searchLocation} setShowFilterModal={setShowFilterModal}
        />
        }
        {
          showFavorites && <FavoritesModal favorites={favorites} setFavorites={setFavorites} setShowFavorites={setShowFavorites} />
        }

      </main>
    </div>
  )
}

export async function getServerSideProps (context) {
  // inefficient to call the nextjs api which then calls supporting API, but we're aiming to hide the OpenData API url 
  // Check this later in network tab. may also need to reduce data size in the future or modify api url
  const res = await fetch ( 'http://localhost:3000/api/initialize')
  const data = await res.json();
  return { props: { data: data.data, defaultLocation: data.defaultLocation } }
}