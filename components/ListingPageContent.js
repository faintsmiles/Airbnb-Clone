import React from 'react'
import ListingPageTitle from './ListingPageTitle'
import ListingPageDescription from './ListingPageDescription'
import ListingPageForm from './ListingPageForm'

export default function ListingPageContent({roomData}) {
  return (
    <div className='listing-page-container my-0 mx-auto'>
        <ListingPageTitle roomData={roomData} />
        <div className='flex p-8'>
          <ListingPageDescription roomData={roomData} />
          <ListingPageForm  roomData={roomData} />
        </div>
    </div>
  )
}
