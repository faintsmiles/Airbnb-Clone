import Head  from 'next/head'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'

// Utility library for google maps API
import { useLoadScript  } from '@react-google-maps/api'

// Components
import Header from '../../components/Header'
import ListingPageContent from '../../components/ListingPageContent';
// import ListingPageForm from '../../components/ListingPageForm'
import FooterExpanded from '../../components/FooterExpanded'


export default function listingPage() {

  const router = useRouter();
  const { pid } = router.query;

  const [roomData, setRoomData ] = useState()

  useEffect(() => {
    if(!router.isReady) return;
    let data = JSON.parse(localStorage.getItem(pid))
    setRoomData(data)
 }, [router.isReady])
  


  const { isLoaded } = useLoadScript({
    // This needs to be hidden in the future, currently visible in network
    // May need to do SSR in future to prevent leaking or calling to API on server
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
})

  if(!roomData) return <h1>Listing data could not be found.</h1>
  if(!isLoaded) return <h1>Loading...</h1>


  return (
    <>
      <Head>
        <title>Listing Page</title>
        <meta name="description" content="Airbnb clone created with NextJS" />
        <link rel="icon" href="/airbnb.svg" />
      </Head>
      <main>
        <Header />  
        <ListingPageContent roomData={roomData} />
        <FooterExpanded />
      </main>
    </>
  )
}