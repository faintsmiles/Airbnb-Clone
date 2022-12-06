import React from 'react'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Reviews({listingRating , numberOfReviews, cleanlinessRating, accuracyRating, communicationRating, valueRating, locationRating, checkinRating }) {
  

  if(!listingRating || numberOfReviews === 0) { return <div className='text-2xl'>No Reviews (yet)</div> }
  
  return (
    <>
        {/* Score card */}
        <div id='review-section'>
            {/* Avg review score + number of reviews */}
            <div className='flex gap-2 items-center leading-loose '>
              <span> 
                <FontAwesomeIcon icon={faStar} /> 
              </span>
              <span className='text-2xl'>
                { listingRating ? (Math.round(( ( listingRating / 20) + Number.EPSILON) * 100) / 100).toFixed(2) : "New" }
              </span>
              <span className='text-2xl'>·</span>
              <span className='text-2xl'>
                {numberOfReviews + " reviews"}
              </span>
            </div>
            {/* Score graph */}
            <div className='pt-8 hidden md:grid grid-cols-2 grid-rows-3 gap-4'>
              <div className='mr-12 flex justify-between items-center'>
                <div className='w-full '>Cleanliness</div>
                <div className='my-auto w-1/2 h-1  bg-slate-200 rounded-full'>
                  <div style={{width: ((cleanlinessRating / 2).toFixed(2) / 5) * 100 + "%"}} className='h-1 bg-black rounded-full'></div>
                </div>
                <span className='mx-2 text-xs font-bold '>
                  { cleanlinessRating ? (cleanlinessRating/2).toFixed(2) : "New" }
                </span>
              </div>
              <div className='mr-12 flex justify-between items-center'>
                <span className='w-full '>Accuracy</span>
                <span className='my-auto w-1/2 h-1  bg-slate-200 rounded-full'>
                  <div style={{width: ((accuracyRating / 2).toFixed(2) / 5) * 100 + "%"}} className='h-1 bg-black rounded-full'></div>
                </span>
                <span className='mx-2 text-xs font-bold '>
                  { accuracyRating ? (accuracyRating/2).toFixed(2) : "New" }
                </span>
              </div>
              <div className='mr-12 flex justify-between items-center'>
                <span className='w-full '>Communication</span>
                <span className='my-auto w-1/2 h-1  bg-slate-200 rounded-full'>
                  <div style={{width: ((communicationRating / 2).toFixed(2) / 5) * 100 + "%"}} className='h-1 bg-black rounded-full'></div>
                </span>
                <span className='mx-2 text-xs font-bold '>
                  { communicationRating ? (communicationRating/2).toFixed(2) : "New" }
                </span>
              </div>
              <div className='mr-12 flex justify-between items-center'>
                <span className='w-full '>Location</span>
                <span className='my-auto w-1/2 h-1  bg-slate-200 rounded-full'>
                  <div style={{width: ((locationRating / 2).toFixed(2) / 5) * 100 + "%"}} className='h-1 bg-black rounded-full'></div>
                </span>
                <span className='mx-2 text-xs font-bold '>
                  { locationRating ? (locationRating/2).toFixed(2) : "New" }
                </span>
              </div>
              <div className='mr-12 flex justify-between items-center '>
                <span className='w-full '>Check-in</span>
                <span className='my-auto w-1/2 h-1  bg-slate-200 rounded-full'>
                  <div style={{width: ((checkinRating / 2).toFixed(2) / 5) * 100 + "%"}} className='h-1 bg-black rounded-full'></div>
                </span>
                <span className='mx-2 text-xs font-bold '>
                  { checkinRating ? (checkinRating/2).toFixed(2) : "New" }
                </span>
              </div>
              <div className='mr-12 flex justify-between items-center'>
                <span className='w-full '>Value</span>
                <span className='my-auto w-1/2 h-1  bg-slate-200 rounded-full'>
                  <div style={{width: ((valueRating / 2).toFixed(2) / 5) * 100 + "%"}} className='h-1 bg-black rounded-full'></div>
                </span>
                <span className='mx-2 text-xs font-bold '>
                  { valueRating ? (valueRating/2).toFixed(2) : "New" }
                </span>
              </div>
            </div>
        </div>
        {/* Reviews */}
        <div className='py-8 grid grid-cols-1 auto-rows-auto gap-4 md:grid-cols-2 '>
          {createReviews(numberOfReviews)}
        </div>
        {/* Show all reviews button */}
        <div className='my-2'>
          <button className='py-4 px-8 text-sm font-bold border border-black rounded-xl'>{`Show all ${numberOfReviews} reviews`}</button>
        </div>
    </>
  )
}

function createReviews(numberOfReviews) {
  const maxReviewsToShow = numberOfReviews >= 8 ? 8 : numberOfReviews;
  let names = ['Max', 'Christy','Sam', 'Nicole', 'Ember', 'Matthew', 'Michelle' , 'John' ]
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  return(
    <>
      { [...Array(maxReviewsToShow)].map((e,i) => {
        return (
        <div key={'review' + i} className='mr-16' >
          <div className='flex items-center'>
            <div className='h-12 w-12 rounded-full border border-blue-900 bg-slate-100'></div>
              <div className='pl-2 flex flex-col'>
                {/* <div className='font-bold'>{names[Math.floor(Math.random() * names.length )]}</div> */}
                <div className='font-bold'>{names[i]}</div>
                <div className='text-sm text-slate-500'>October 2022</div>
              </div>
          </div>
          <p className='mt-2 line-clamp-3'>{lorem.substring(0, Math.floor(Math.random() * lorem.length ))}</p>
        </div>)
      }) }
    </>
  )

}