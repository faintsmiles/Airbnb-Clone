import React from 'react'

export default function FitlerModalCheckBox({options}) {
    console.log(options)
  return (
    <>
        <div className='font-semibold '>{options.subcategory}</div>

        <div className='checkbox-continer py-8 grid grid-cols-2 gap-4 justify-between '>
            { options.items.map(element => { return (
                <div className='checkbox-item'>
                    <div className='flex '>
                    <input type="checkbox" id={element.title} className='w-6 h-6 hover:border-2' />
                    <label htmlFor={element.title} className='flex flex-col text-sm px-4 cursor-pointer'>
                        <span className=' text-lg font-thin' >{ element.title }</span>
                        <span className='max-w-xs text-gray-500 '> { element.description }</span>
                    </label>
                    </div>
                </div>

            )})}
        </div>
    </>
  )
}
