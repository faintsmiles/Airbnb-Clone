import React from 'react'
import Image from 'next/image'


export default function FilterButton({setShowFilterModal}) {
  return (
    <div className='m-auto'>
        <button className='hidden md:flex p-4 text-xs font-bold border rounded-2xl' onClick={()=>{ setShowFilterModal(true) }}>
            <span className='pr-2 w-6'>
              <Image src='/icons8-filter-100.png' width={400} height={400} />
            </span>
            <span> Filters</span>
        </button>
    </div>
  )
}
