// Components
import Head  from 'next/head'
import Header from '../components/Layout/Header'
import Category from '../components/Index/Category'
import Content from '../components/Index/Content'
import ListMapController from '../components/Index/ListMapController'
import FilterModal from '../components/Filter/FilterModal'
import FavoritesModal from '../components/common/FavoritesModal'
import FooterCondensed from '../components/Layout/FooterCondensed'
// React hooks
import { useState, useEffect } from 'react'
// Utility library for google maps API
import { useLoadScript  } from '@react-google-maps/api'
// Utility functions
import { refreshFavorites } from '../utils/handleFavorites'


// google maps libraries
const googleLibraries =  ['places']

export default function Home({data, defaultLocation }) {
  
  // Connect to Google's Maps API
  const { isLoaded } = useLoadScript({
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
    // syncs/refreshes favorites if altered in another tab within the same domain
    window.addEventListener('storage', callRefreshFavorites)
    // remove events and clear local storage when the index page is closed 
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
        {/*  */}
        <Header setSearchLocation={setSearchLocation} favorites={favorites} setShowFavorites={setShowFavorites} />
        {/* Carousel / Filter Section */}
        <Category
         carouselFocus={carouselFocus} setCarouselFocus={setCarouselFocus} 
         searchLocation={searchLocation} setResults={setResults} setShowFilterModal={setShowFilterModal} 
        />
        {/* Main content */}
        <Content 
          results={results} setResults={setResults} 
          searchLocation={searchLocation} showMap={mapToggle} 
          favorites={favorites} setFavorites={setFavorites}
        />
        {/* Button that controls which content type is shown (List/Map) */}
        <ListMapController isMapActive={mapToggle} toggleMap={setMapToggle} />

        {/* Footer only appears when List component is visible  */}
        { !mapToggle && <FooterCondensed  /> }
        
        {/* Filter Modal. */}
        { showFilterModal && 
          <FilterModal 
          carouselFocus={carouselFocus} setCarouselFocus={setCarouselFocus}
          results={results} setResults={setResults} 
          searchLocation={searchLocation} setShowFilterModal={setShowFilterModal}
        />
        }
        {/* Favorites Modal */}
        { showFavorites && 
          <FavoritesModal favorites={favorites} setFavorites={setFavorites} setShowFavorites={setShowFavorites} />
        }

      </main>
    </div>
  )
}
// Enables SSR for index
export async function getServerSideProps (context) {
  // Find and Set host
  const { req } = context
  const host = req.headers.host
  // Retrieves listing data for the intiial load
  const res = await fetch ( `http://${host}/api/initialize`)
  const data = await res.json();
  return { props: { data: data.results, defaultLocation: data.defaultLocation } }
}