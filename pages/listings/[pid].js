import Head  from 'next/head'
import React from 'react'
import { useRouter } from 'next/router'

// Utility library for google maps API
import { useLoadScript  } from '@react-google-maps/api'

// Components
import Header from '../../components/Header'
import ListingPageContent from '../../components/ListingPageContent';

export default function listingPage() {
  const router = useRouter();
  const { data } = router.query;
  // if router is not ready it'll return undefined which is falsy, in which case we set temp to empty string
  const roomData = data ? JSON.parse(data) : "";

  const { isLoaded } = useLoadScript({
    // This needs to be hidden in the future, currently visible in network
    // May need to do SSR in future to prevent leaking or calling to API on server
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
})

  if(roomData === "") return <h1>Listing data could not be found.</h1>
  if(!isLoaded) return <h1>Loading...</h1>


  console.log(roomData)

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
      </main>
    </>
  )
}
