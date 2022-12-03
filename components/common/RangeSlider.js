import React, { useState } from 'react'

export default function RangeSlider() {

    const [low, setLow] = useState(0)
    const [high, setHigh] = useState(10000)

    const onLowChange = (e) => {
        setLow(e.target.value)
        if( parseInt(e.target.value) > parseInt(high)) { setHigh(10000) }
    }
    const onHighChange = (e) => {
        setHigh(e.target.value)
        if( parseInt(e.target.value) < parseInt(low) ) { setLow(0)}
    }

  return (
    <div className='w-full py-8 flex justify-center items-center'>
        <div className='relative w-full'>
            <div className=''>
                <input 
                    type='range' min={0} max={10000} value={low} 
                    className='absolute h-2 w-full opacity-0 cursor-pointer z-20'
                    onInput={(e) => onLowChange(e) }
                />
                <input 
                    type='range' min={1} max={10000} value={high} 
                    className='absolute h-2 w-full opacity-0 cursor-pointer z-20'
                    onInput={(e) => onHighChange(e) }
                />

                <div className='relative h-2 text-center'>
                    {/* Range background colors */}
                    <div 
                        className='absolute w-full top-0 bottom-0 rounded-md bg-gray-200'
                    />
                    <div 
                        className='absolute left-0 right-0 bottom-0 top-0 rounded-md bg-blue-300'
                        style={{ left:`${low/10000 * 97 + '%'}`, right:`${ 100 - (high/10000 * 97) + '%'}` }}
                    />
                    {/* Artificial range thumbs */}
                    <div 
                        id='low' style={{ left:`${low/10000 * 97 + '%'}` }} 
                        className='absolute w-6 h-6 top-0 bg-red-300 rounded-full -mt-2' 
                    />
                    <div 
                        id='high' style={{ left:`${high/10000 * 97 + '%'}` }} 
                        className='absolute w-6 h-6 top-0 right-0 bg-green-300 rounded-full -mt-2' 
                    />
                </div>
            </div>
            <div className='mt-12 flex gap-2'>
                <div className='flex-grow leading-none pl-4 pt-2 text-gray-500  border rounded-lg'>
                    <label htmlFor='minPrice' className='absolute w-full h-full top-0 bottom-0 left-0 opacity-0 z-10' />
                    <span className='text-xs leading-none' >min price</span>
                    <div className='leading-none'>
                        <span>$ </span>
                        <input 
                            id='minPrice'
                            className='text-black focus:outline-none appearance-none' type='number' 
                            placeholder={'0'} value={low} 
                            min={0}
                            onInput={(e) => onLowChange(e) }
                        />
                    </div>
                </div>
                <span className='p-4'> - </span>
                <div className='relative flex-grow leading-none  pl-4 pt-2 text-gray-500  border rounded-lg'>
                    <label htmlFor='maxPrice' className='absolute w-full h-full top-0 bottom-0 left-0 opacity-0 z-10' />
                    <span className='text-xs leading-none' >max price</span>
                    <div className='leading-none'>
                        <span>$ </span>
                        <input 
                            id='maxPrice'
                            className='text-black focus:outline-none appearance-none' type='number' 
                            placeholder={'10000+'} value={high} 
                            max={10000}
                            onInput={(e) => onHighChange(e) }
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
