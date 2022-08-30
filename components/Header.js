import React, {useRef, useState} from "react";
import Image from 'next/image'

import { Autocomplete } from "@react-google-maps/api";

export default function Header({ setSearchLocation, setResults }) {

  // Ref to accesss the search input value
  const searchInputValue = useRef();

  // Submit handler for search input 
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("handle search submission")
    setSearchLocation(searchInputValue.current.value);
    
    fetch('/api/hello')
    .then(response => response.json())
    .then( result => {
      console.log(result)
      setResults(result) 
    })
    .catch(alert('There was a problem getting listing data. Please try again, or change destination'))
  }

  // Prevents fetching during the initial render
  // const isInitialMount = useRef(true);
  // useEffect(() => {

  //   console.log('fired')
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //     return;
  //   }
  //   else {
  //     console.log("WTF????" + searchLocation)
  //     fetch('/hello/api')
  //     .then(response => response.json())
  //     .then( (result) => setResults(result))
  //     .then(console.log(data))
  //     .catch(alert('There was a problem getting listing data. Please try again, or change destination'))
  //   }

  // }, [searchLocation]);



  return (
    <div className="text-xs my-4 px-8 md:px-15 lg:px-24 2xl:px-48">
      <header className="flex flex-col sm:flex-row justify-between items-center h-auto">
        <div className="hidden sm:flex sm:pr-4">
          <a href="/"><Image width={102} height={32} src='/airbnb.svg' alt="airbnb brand image" ></Image></a>
        </div>
        <form className="search-container flex items-center w-full  md:max-w-xs" onSubmit={(e) => handleSearchSubmit(e)}>
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <Autocomplete>
              <input type="text" id="simple-search" 
                className="bg-gray-50 border border-gray-300 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-lg" 
                placeholder="Start your search" 
                ref={searchInputValue}
                required 
              />
            </Autocomplete>
            <div className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
              <div className=" bg-brand-color rounded-3xl p-1.5 ">
                <svg aria-hidden="true" className="w-5 h-5" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              </div>
            </div>
          </div>
        </form>
        <div className="hidden md:flex justify-between space-x-4" >
          <div>Become a Host</div>
          <button className="flex ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4" viewBox="0 0 512 512">
              {/* <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
              <path d="M352 256C352 278.2 350.8 299.6 348.7 320H163.3C161.2 299.6 159.1 278.2 159.1 256C159.1 233.8 161.2 212.4 163.3 192H348.7C350.8 212.4 352 233.8 352 256zM503.9 192C509.2 212.5 512 233.9 512 256C512 278.1 509.2 299.5 503.9 320H380.8C382.9 299.4 384 277.1 384 256C384 234 382.9 212.6 380.8 192H503.9zM493.4 160H376.7C366.7 96.14 346.9 42.62 321.4 8.442C399.8 29.09 463.4 85.94 493.4 160zM344.3 160H167.7C173.8 123.6 183.2 91.38 194.7 65.35C205.2 41.74 216.9 24.61 228.2 13.81C239.4 3.178 248.7 0 256 0C263.3 0 272.6 3.178 283.8 13.81C295.1 24.61 306.8 41.74 317.3 65.35C328.8 91.38 338.2 123.6 344.3 160H344.3zM18.61 160C48.59 85.94 112.2 29.09 190.6 8.442C165.1 42.62 145.3 96.14 135.3 160H18.61zM131.2 192C129.1 212.6 127.1 234 127.1 256C127.1 277.1 129.1 299.4 131.2 320H8.065C2.8 299.5 0 278.1 0 256C0 233.9 2.8 212.5 8.065 192H131.2zM194.7 446.6C183.2 420.6 173.8 388.4 167.7 352H344.3C338.2 388.4 328.8 420.6 317.3 446.6C306.8 470.3 295.1 487.4 283.8 498.2C272.6 508.8 263.3 512 255.1 512C248.7 512 239.4 508.8 228.2 498.2C216.9 487.4 205.2 470.3 194.7 446.6H194.7zM190.6 503.6C112.2 482.9 48.59 426.1 18.61 352H135.3C145.3 415.9 165.1 469.4 190.6 503.6V503.6zM321.4 503.6C346.9 469.4 366.7 415.9 376.7 352H493.4C463.4 426.1 399.8 482.9 321.4 503.6V503.6z"/>
            </svg>
          </button>
          <div className="ml-2">
            Menu
          </div>
        </div> 
      </header>
    </div>
  );
}

