import React from 'react'

export default function FitlerModalCheckBox({options, amenity, setAmenity}) {
    
    // determines whether checkbox was checked or unchecked, and changes the appropriate state list accordingly 
    const modifyAmentityList = (e) => {
        
        if(e.target.checked) {
            if(!amenity.includes(e.target.value)){
                setAmenity([...amenity, e.target.value])
            }
        }
        if(!e.target.checked){
            if(amenity.includes(e.target.value)) {
                let temp  = amenity.filter(item => item !== e.target.value)
                setAmenity(temp)                    
                }
            }
    }
   

  return (
    <>
        {/* Category title */}
        <div className='font-semibold '>{options.subcategory}</div>
        {/* Options */}
        <div className='checkbox-continer py-8 grid grid-cols-2 gap-4 justify-between '>
            { options.items.map(element => { return (
                <div  className='checkbox-item'>
                    <div className='flex '>
                        <input type="checkbox" id={element.title} value={element.title} className='w-6 h-6 hover:border-2' onChange={(e) => modifyAmentityList(e)} />
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
