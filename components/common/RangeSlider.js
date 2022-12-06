import React from 'react'

export default function RangeSlider({ minPrice, setMinPrice, maxPrice, setMaxPrice}) {

    const minPriceAllowed = 0
    const maxPriceAllowed = 20000

    const onLowPriceChange = (e) => {
        e.target.value < maxPriceAllowed ? setMinPrice(parseInt(e.target.value)) : setMinPrice(maxPriceAllowed - 1)

        if( parseInt(e.target.value) > parseInt(maxPrice)) { 
            // 20,000 arbitrary max input value
            e.target.value < maxPriceAllowed ? setMaxPrice( parseInt(e.target.value) + 50) : setMaxPrice(maxPriceAllowed)
        }
    }
    const onMaxPriceChange = (e) => {
        // 20,000 arbitrary max input value
        e.target.value < maxPriceAllowed ? setMaxPrice(parseInt(e.target.value)) : setMaxPrice(maxPriceAllowed)

        if( parseInt(e.target.value) < parseInt(minPrice) ) { 
            parseInt(e.target.value) - 50 < minPriceAllowed ? setMinPrice(minPriceAllowed) : setMinPrice(parseInt(e.target.value) - 50)
        }
    }

    const findPadding = (price) => {
        if(0 >= price ) return 0 
        
        return price < 600 ? price/600 * 96 : 96
    } 


  return (
    <div className='w-full py-8 flex justify-center items-center'>
        <div className='relative w-full'>
            <div className=''>
                <input 
                    type='range' min={0} max={600} value={minPrice} 
                    className='absolute h-2 w-full opacity-0 cursor-pointer z-20'
                    onInput={(e) => onLowPriceChange(e) }
                />
                <input 
                    type='range' min={1} max={600} value={maxPrice} 
                    className='absolute h-2 w-full opacity-0 cursor-pointer z-20'
                    onInput={(e) => onMaxPriceChange(e) }
                />

                <div className='relative h-2 text-center'>
                    {/* Range background colors */}
                    <div 
                        className='absolute w-full top-0 bottom-0 rounded-md bg-gray-100'
                    />
                    <div 
                        className='absolute left-0 right-0 bottom-0 top-0 rounded-md bg-blue-300'
                        style={{ left:`${findPadding(minPrice) + '%'}`, right:`${ 96 - findPadding(maxPrice) + '%'}` }}
                    />
                    {/* Artificial range thumbs */}
                    <div 
                        id='minPrice' style={{ left:`${findPadding(minPrice) + '%'}` }} 
                        className='absolute w-8 h-8 top-0 bg-gray-200 rounded-full -mt-3 border border-gray-500' 
                    />
                    <div 
                        id='maxPrice' style={{ left :`${ findPadding(maxPrice) + '%'}` }} 
                        className='absolute w-8 h-8 top-0 right-0 bg-gray-200 rounded-full -mt-3 border border-gray-500' 
                    />
                </div>
            </div>
            <div className='mt-12 flex gap-2'>
                <div className='relative flex-grow leading-none pl-4 pt-2 text-gray-500  border rounded-lg z-10'>
                    <label htmlFor='minPriceInput' className='absolute w-full h-full top-0 bottom-0 left-0 opacity-0 z-20' />
                    <span className='text-xs leading-none' >min price</span>
                    <div className='leading-none'>
                        <span>$ </span>
                        <input 
                            id='minPriceInput'
                            className='text-black focus:outline-none appearance-none' type='number' 
                            placeholder={'0'} value={minPrice} 
                            min={0} max={9999}
                            onInput={(e) => onLowPriceChange(e) }
                        />
                    </div>
                </div>
                <span className='p-4'> - </span>
                <div className='relative flex-grow leading-none  pl-4 pt-2 text-gray-500  border rounded-lg'>
                    <label htmlFor='maxPriceInput' className='absolute w-full h-full top-0 bottom-0 left-0 opacity-0 z-10' value={' '} />
                    <span className='text-xs leading-none' >max price</span>
                    <div className='leading-none'>
                        <span>$ </span>
                        <input 
                            id='maxPriceInput' type='number'
                            className='text-black focus:outline-none appearance-none'
                            placeholder={'600+'} value={maxPrice} 
                            max={20000}
                            onInput={(e) => onMaxPriceChange(e) }
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
