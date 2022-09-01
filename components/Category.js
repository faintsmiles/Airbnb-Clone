import React from 'react'
import CategoryCarousel from './CategoryCarousel'

export default function Category() {
  return (
    <div className='flex gap-2 w-full py-8 px-8 pb-5 lg:px-24 2xl:px-44 border-b'  >
        <CategoryCarousel />
        <button className='hidden md:flex p-4 border '>Filter</button>
        {/* <FilterButton /> */}
    </div>
  )
}
