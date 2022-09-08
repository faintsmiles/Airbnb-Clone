import React from 'react'
import CategoryCarousel from './CategoryCarousel'
import FilterButton from './common/FilterButton'

export default function Category({setShowFilterModal}) {
  return (
    <div className='flex gap-4 w-full py-8 px-8 pb-5 lg:px-24 2xl:px-44 border-b'  >
        <CategoryCarousel />
        {/* <button className='hidden md:flex p-4 border '>Filter</button> */}
        <FilterButton setShowFilterModal={setShowFilterModal} />
    </div>
  )
}
