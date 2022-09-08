import React, {useRef, useState} from "react";
import Image from 'next/image'

import { Autocomplete } from "@react-google-maps/api";

import { faBars, faGlobe } from '@fortawesome/free-solid-svg-icons'
import {  faUser } from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Header({ setSearchLocation }) {

  // Ref to accesss the search input value
  const searchInputValue = useRef();
  var searchOptions = {
    types: ["(cities)"],
   };

  // Submit handler for search input 
  const handleSearchSubmit = async (e) => {
    if(e) {
      e.preventDefault();
    }
    console.log("handle search submission")
    setSearchLocation(searchInputValue.current.value);
  } 

  return (
    <div className="text-xs py-4 px-8 pb-5 lg:px-24 2xl:px-44 border-b">
      <header className="flex flex-col sm:flex-row justify-between items-center h-auto">
        <div className="hidden md:flex sm:pr-4">
          <a href="/"><Image width={102} height={32} src='/airbnb.svg' alt="airbnb brand image" ></Image></a>
        </div>
        <form className="search-container flex items-center w-full md:max-w-xs hover:shadow-lg" onSubmit={(e) => handleSearchSubmit(e)}>
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <Autocomplete options={searchOptions} onPlaceChanged={(e)=>handleSearchSubmit(e)} >
              <input type="text" id="simple-search" 
                className="bg-gray-50 border border-gray-300 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-lg" 
                placeholder="Start your search" 
                ref={searchInputValue}
                required 
              />
            </Autocomplete>
            <button className="flex absolute inset-y-0 right-0 items-center pr-2 ">
              <div className=" bg-brand-color rounded-3xl p-1.5 ">
                <svg aria-hidden="true" className="w-5 h-5" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              </div>
            </button>
          </div>
        </form>
        <div className="hidden md:flex justify-between gap-1 " >
          <div className=" py-3 px-4 hover:bg-gray-100 rounded-full text-sm font-semibold ">Become a Host</div>
          <button className="p-3 flex hover:bg-gray-100 rounded-full text-base">
            <FontAwesomeIcon icon={faGlobe} />
          </button>
          <div className="p-2 ml-2 border hover:shadow-xl rounded-full">
            <span className="flex px-2 py-1 align-baseline gap-3 ">
              <span>
                <FontAwesomeIcon icon={faBars} />
              </span>
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
            </span>
          </div>
        </div> 
      </header>
    </div>
  );
}

