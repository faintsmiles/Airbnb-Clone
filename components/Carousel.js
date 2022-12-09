import React, { useState, useEffect, useRef } from "react";
import CarouselItem from "./CarouselItem";

import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { categories } from "../utils/carouselOptions";

export default function Carousel({ carouselFocus, setCarouselFocus, searchLocation, setResults }) {
  const ref = useRef();
  const [leftButtonVisibility, setLeftButtonVisibility] = useState("hidden");
  const [rightButtonVisibility, setRightButtonVisibility] = useState("hidden md:block");

  //https://stackoverflow.com/questions/60729924/react-scroll-component-horizontally-on-button-click
  const scroll = (scrollOffset) => { ref.current.scrollLeft += scrollOffset };

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

    const apiURL = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&rows=30&facet=city`;
    const location = "&refine.city=" + searchLocation;
    const propertyType = "&refine.property_type=" + carouselFocus;

    fetch(apiURL + propertyType + location)
      .then((response) => response.json())
      .then((results) => setResults(results.records))
      .catch((err) => alert(err));
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
