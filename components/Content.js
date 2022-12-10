import React, { useState, useEffect } from "react";
import List from "../components/List";
import Map from "../components/Map";

export default function Content({ results, setResults, searchLocation, showMap, favorites, setFavorites }) {
  // Set map center to first first result's location or ~Amsterdam
  const lng = 4.92
  const lat = 52.35
  // const lng = results[0].geometry.coordinates[0] || 4.92
  // const lat = results[0].geometry.coordinates[1] || 52.35
  const [center, setCenter] = useState({ lat: lat, lng: lng });
  const [intitialRender, setInitialRender] = useState(0);

  // User requested location change, only runs when search location has been changed
  useEffect(() => {
    // Prevents fetching new results on the initial render
    if (intitialRender === 0) {
      setInitialRender(1);
      return;
    }
    // Call google.maps.Geocoder for new coords, set new map center, and update results
    updateResultsByLocation(searchLocation, setCenter, setResults)

  }, [searchLocation]);

  if (!results || results.length === 0) {
    return (
      <div className="absolute p-12 w-full h-max border font-bold text-center mx-auto ">
        {!results
          ? "Results could not be fetched. Please try refreshing"
          : "No results found"}
      </div>
    );
  }

  if (showMap)
    return (
      <Map
        results={results}
        center={center}
        favorites={favorites}
        setFavorites={setFavorites}
      />
    );
  return (
    <List results={results} favorites={favorites} setFavorites={setFavorites} />
  );
}

function updateResultsByLocation (searchLocation, setCenter, setResults) {
  const geocoder = new google.maps.Geocoder();
  // Gets the coordinates for the address inside of search
  geocoder.geocode({ address: searchLocation }, (_results, status) => {
    if (status === google.maps.GeocoderStatus.OK) {
      const lat = _results[0].geometry.location.lat();
      const lng = _results[0].geometry.location.lng();
      setCenter({ lat: lat, lng: lng });
      _results = parseGeocoder(_results);
      fetchNewResults(_results, setResults);
    } else {
      alert("Geocode returned with the following error: " + status);
    }
  });
}

function parseGeocoder (results) {
  let tempCityHelper = results[0].formatted_address.split(",");
  let tempCountryHelper;
  results[0].address_components.map((element) => {
    if (element.types.includes("country"))
      tempCountryHelper = element.long_name;
  });
  //removes leading/trailing whitespaces and then replaces remaining whitespaces with '+' symbol
  const body = {
    city: tempCityHelper[0].trim().replace(/\s/g, "+"),
    country: tempCountryHelper
      ? tempCountryHelper.trim().replace(/\s/g, "+")
      : tempCityHelper[tempHelper.length - 1].trim().replace(/\s/g, "+"),
  };
  return body;
};

function fetchNewResults (body, setResults) {
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
};
