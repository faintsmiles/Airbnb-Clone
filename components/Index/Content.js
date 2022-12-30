import React, { useState, useEffect } from "react";
// Components
import Grid from "./Grid";
import Map from "../Maps/Map";

export default function Content({ results, setResults, searchLocation, showMap, favorites, setFavorites, currentFetch, setCurrentFetch }) {
  // Set map center to the first result's location or ~Amsterdam if not available
  const lng = 4.92
  const lat = 52.35
  // const lng = results[0].geometry.coordinates[0] || 4.92
  // const lat = results[0].geometry.coordinates[1] || 52.35
  const [center, setCenter] = useState({ lat: lat, lng: lng });
  const [intitialRender, setInitialRender] = useState(0);

  // User requested location change, only meant to run when search location has been changed
  useEffect(() => {
    // Prevents fetching new results on the initial render
    if (intitialRender === 0) {
      setInitialRender(1);
      return;
    }
    // Call google.maps.Geocoder for new coords, set new map center, and update results
    updateResultsByLocation(searchLocation, setCenter, setResults, setCurrentFetch)

  }, [searchLocation]);

  // Make sure we actually have results to display
  if (!results || results.length === 0) {
    return (
      <div className="absolute p-12 w-full h-max border font-bold text-center mx-auto ">
        {!results
          ? "Results could not be fetched. Please try refreshing"
          : "No results found"}
      </div>
    );
  }
  // Display Map view
  if (showMap)
    return (
      <Map
        results={results}
        center={center}
        favorites={favorites}
        setFavorites={setFavorites}
      />
    );
    // Display Grid view
  return (
      <Grid results={results} setResults={setResults} favorites={favorites} setFavorites={setFavorites} currentFetch={currentFetch} />
  );
}

// User modified location, call geocoder for coords
function updateResultsByLocation (searchLocation, setCenter, setResults, setCurrentFetch) {
  const geocoder = new google.maps.Geocoder();
  // Gets the coordinates for the address inside of search
  geocoder.geocode({ address: searchLocation }, (_results, status) => {
    if (status === google.maps.GeocoderStatus.OK) {
      const lat = _results[0].geometry.location.lat();
      const lng = _results[0].geometry.location.lng();
      setCenter({ lat: lat, lng: lng });
      _results = parseGeocoder(_results);
      fetchNewResults(_results, setResults, setCurrentFetch);
    } else {
      alert("Geocode returned with the following error: " + status);
    }
  });
}
// Modify geocoder results to fit our needs
function parseGeocoder (results) {
  let tempCityHelper = results[0].formatted_address.split(",");
  let tempCountryHelper;
  results[0].address_components.map((element) => {
    if (element.types.includes("country"))
      tempCountryHelper = element.long_name;
  });
  //removes leading/trailing whitespaces and then replaces remaining whitespaces with '+' symbol
  let city = tempCityHelper[0].trim().replace(/\s/g, "+")
  let country = tempCountryHelper ? tempCountryHelper.trim().replace(/\s/g, "+") : tempCityHelper[tempHelper.length - 1].trim().replace(/\s/g, "+")
  const body = {
    searchLocation: city + ', ' + country
  };
  return body;
};
// Update listing data
function fetchNewResults (body, setResults, setCurrentFetch) {
  fetch("/api/location", {
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((result) => setResults(result))
    .catch((err) =>
      alert(
        "There was a problem getting listing data. Please try again, or change destination"
      )
    );
    // Change api call and criteria for infinite scroll fetch 
    setCurrentFetch({
      api: '/api/location', 
      criteria: {
        searchLocation: body.searchLocation,
        filters: "",
        propertyType: "", 
      }, 
    })
};
