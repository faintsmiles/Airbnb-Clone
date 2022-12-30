// React + Next Hooks
import React, {useRef, useState, useEffect} from "react";
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
// Utility library to interact with Google's APIs.
import { Autocomplete } from "@react-google-maps/api";
// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGlobe, faHeart, faMagnifyingGlass  } from '@fortawesome/free-solid-svg-icons'
import {  faUser } from '@fortawesome/free-regular-svg-icons'


export default function Header({ setSearchLocation, favorites, setShowFavorites, setShowLoginModal, setCarouselFocus }) {
  // Determine if current route is index
  const { asPath } = useRouter()
  const isPathIndex = asPath === '/' ? true : false;
  // Limiting Google's Autocomplete API to display results for CITY names only
  let searchOptions = { types: ["(cities)"] };
  // Ref for Search Input
  const searchInputValue = useRef();
  // Show user menu ref + state
  const userMenu = useRef()
  const [showMenu,  setShowMenu] = useState(false)

  // Submit handler for search input 
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setSearchLocation(searchInputValue.current.value)
  } 
  // Close User Menu when user clicks outside the bounds of the menu options or on another target
  const closeUserMenu = (e) => {
    if(userMenu.current && showMenu && !userMenu.current.contains(e.target)){
      setShowMenu(false)
    }
  }
  // Event listener that determines when user menu is closed
  useEffect(()=> {
    document.addEventListener('mousedown', closeUserMenu)
    
    return() => { removeEventListener('mousedown', closeUserMenu) }
  })

  return (
    <section className="text-xs py-4 px-8 pb-5 lg:px-24 2xl:px-44 border-b">
      <header className="flex flex-1 justify-between  items-center h-auto">
        {/* Brand */}
        <div className="w-full hidden md:flex sm:pr-4">
          <Link href='/'>
            <a>
              <Image width={102} height={32} src='/airbnb.svg' alt="airbnb brand image" />
            </a>
          </Link>
        </div>
        {/* Search bar */}
        { isPathIndex &&
        <form className="search-container flex items-center w-full md:max-w-xs hover:shadow-lg rounded-full" onSubmit={(e) => handleSearchSubmit(e)}>
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            {/* Autocomplete componenet */}
            <Autocomplete options={searchOptions} >
              <input 
                type="text" id="simple-search" 
                className="block w-full pr-10 p-2.5 text-sm rounded-2xl border bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-lg " 
                placeholder="Start your search" 
                ref={searchInputValue}
                required 
              />
            </Autocomplete>
            {/* Search Button */}
            <button className="flex absolute inset-y-0 right-0 items-center pr-2 text-center  ">
              <div className="bg-brand w-8 h-8 rounded-full">
                <FontAwesomeIcon icon={faMagnifyingGlass} className='m-auto p-2 text-white text-base' />
              </div>
            </button>
          </div>
        </form>
        }
        {/* Options */}
        <div className="hidden w-full md:flex md:justify-end md:items-center gap-1 " >
          {/* 'Become a Host link */}
          <div className="hidden text-center lg:flex py-3 px-4 hover:bg-gray-100 rounded-full text-sm font-semibold ">Become a Host</div>
          {/* Globe Icon */}
          <button className="p-3 flex hover:bg-gray-100 rounded-full text-base">
            <FontAwesomeIcon icon={faGlobe} />
          </button>
          {/* Favorites Button. Only visible when favorites has items */}
          { (favorites && favorites.length > 0) && 
            <button className="p-3 flex hover:bg-gray-100 rounded-full text-base" onClick={() => setShowFavorites(true)}>
              <FontAwesomeIcon icon={faHeart} />
            </button>
          }
          {/* Bars + User Icon */}
          <div className="relative p-2 ml-2 border hover:shadow-xl rounded-full" ref={userMenu} onClick={(e)=> {setShowMenu(!showMenu)} }>
            <span className="flex px-2 py-1 align-baseline  gap-3 ">
              <span>
                <FontAwesomeIcon icon={faBars} />
              </span>
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
            </span>
            {/* Expanded onclick menu for bars + user */}
            { showMenu &&
              <div className="absolute mt-5 right-0 w-64 py-2 text-base z-50 bg-white shadow-[0_0px_16px_rgba(0,0,0,0.1)] rounded-lg">  
                  <div className="px-4 py-2 hover:bg-gray-100" onClick={() => setShowLoginModal(true)} >Sign Up</div>
                  <div className="px-4 py-2 hover:bg-gray-100" onClick={() => setShowLoginModal(true)} >Log in</div>
                  <div className="w-full my-2 border-b"></div>
                  <div className="px-4 py-2 hover:bg-gray-100" onClick={() => setShowLoginModal(true)} >Host your home</div>
                  <div className="px-4 py-2 hover:bg-gray-100" onClick={() => setShowLoginModal(true)} >Host an experience</div>
                  <div className="px-4 py-2 hover:bg-gray-100" onClick={() => setShowLoginModal(true)} >Help</div>
              </div>
            }
          </div>
        </div> 
      </header>
    </section>
  );
}

