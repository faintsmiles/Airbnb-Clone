import React from 'react'
import Carousel from './Carousel'
import FilterButton from './common/FilterButton'

export default function Category({ carouselFocus, setCarouselFocus, searchLocation, setResults, setShowFilterModal}) {
  return (
    <section className='flex gap-4 w-full pt-8 pb-2 px-8 lg:px-24 2xl:px-44 '  >
        <Carousel carouselFocus={carouselFocus} setCarouselFocus={setCarouselFocus} searchLocation={searchLocation} setResults={setResults} />
        <FilterButton setShowFilterModal={setShowFilterModal} />
    </section>
  )
}
