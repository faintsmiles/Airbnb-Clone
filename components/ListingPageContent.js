import React from 'react'
import ListingPageTitle from './ListingPageTitle'

export default function ListingPageContent({roomData}) {
  return (
    <div className='listing-page-container my-0 mx-auto'>
        <ListingPageTitle roomData={roomData} />
    </div>
  )
}
