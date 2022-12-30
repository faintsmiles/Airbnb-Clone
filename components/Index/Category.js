import React from 'react'
// Components
import Carousel from '../Carousel/Carousel'
import FilterButton from '../Filter/FilterButton'

export default function Category({ carouselFocus, setCarouselFocus, searchLocation, setResults, setShowFilterModal, setCurrentFetch}) {
  return (
    <section className='flex gap-4 w-full pt-8 pb-2 px-8 lg:px-24 2xl:px-44 '  >
        <Carousel carouselFocus={carouselFocus} setCarouselFocus={setCarouselFocus} searchLocation={searchLocation} setResults={setResults} setCurrentFetch={setCurrentFetch} />
        <FilterButton setShowFilterModal={setShowFilterModal} />
    </section>
  )
}
