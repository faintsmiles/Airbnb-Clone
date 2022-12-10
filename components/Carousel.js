import React, { useState, useEffect, useRef } from "react";
// fontawesome
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// componenet
import CarouselItem from "./CarouselItem";
// options
import { categories } from "../utils/carouselOptions";

export default function Carousel({ carouselFocus, setCarouselFocus, searchLocation, setResults, }) {
  const ref = useRef();
  const [leftButtonVisibility, setLeftButtonVisibility] = useState("hidden");
  const [rightButtonVisibility, setRightButtonVisibility] = useState("hidden md:block");

  //https://stackoverflow.com/questions/60729924/react-scroll-component-horizontally-on-button-click
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  // Determines if side button controls are visible
  const buttonVisibility = (scrollPosition) => {
    if (scrollPosition > 0) setLeftButtonVisibility("hidden md:block");
    else setLeftButtonVisibility("hidden");
    if (scrollPosition >= ref.current.scrollLeftMax)
      setRightButtonVisibility("hidden");
    else setRightButtonVisibility("hidden md:block");
  };

  useEffect(() => {
    if (!carouselFocus) { return }
    // get new results by search location and carousel item property type
    fetchNewResults (searchLocation, carouselFocus, setResults)
  }, [carouselFocus]);

  return (
    <div
      className="carousel relative flex h-max text-xs whitespace-nowrap overflow-hidden"
      onScrollCapture={() => buttonVisibility(ref.current.scrollLeft)}
    >
      <div
        ref={ref}
        className=" carousel mx-4 relative flex h-max text-xs text-center whitespace-nowrap overflow-x-scroll no-scrollbar"
      >
        {/* Create items */}
        {categories.map((element) => {
          return (
            <CarouselItem
              key={element.type}
              element={element}
              carouselFocus={carouselFocus}
              setCarouselFocus={setCarouselFocus}
            />
          );
        })}
      </div>
      {/* Buttons */}
      <div>
        <button
          className={`${leftButtonVisibility} h-8 w-8 px-2 absolute left-0 top-4 bottom-0 bg-white text-black border border-neutral-300 rounded-full hover:shadow-lg`}
          onClick={() => scroll(-400)}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
      <div>
        <button
          className={`${rightButtonVisibility} h-8 w-8 px-2 absolute right-0 top-4 bottom-0 bg-white text-black border border-neutral-300 rounded-full hover:shadow-lg`}
          onClick={() => scroll(400)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}

function fetchNewResults (searchLocation, carouselFocus, setResults) {
  fetch("/api/property", {
    method: "POST",
    body: JSON.stringify({
      searchLocation: searchLocation,
      propertyType: carouselFocus,
    }),
  })
    .then(response => response.json())
    .then(results => setResults(results))
    .catch(err => alert(err));
}