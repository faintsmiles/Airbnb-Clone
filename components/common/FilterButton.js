import React from 'react'

export default function FilterButton({setShowFilterModal}) {
  return (
    <div className='m-auto'>
        <button className='hidden md:flex p-4 text-xs font-bold border rounded-2xl' onClick={()=>{ setShowFilterModal(true) }}>
            <span>i</span>
            <span> Filters</span>
        </button>
    </div>
  )
}
