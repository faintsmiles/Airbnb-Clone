// Hooks
import { useState } from "react";
// Utility library to interact with Google's APIs.
import { GoogleMap } from "@react-google-maps/api";
// Component
import Marker from "./Marker";

export default function Map({ results, center, favorites, setFavorites }) {
  // Controls which marker is set to display it's show InfoWindow, only 1 can be visible at any given
  const [showInfoIndex, setShowInfoIndex] = useState("");

  return (
    <GoogleMap
      id="map"
      mapContainerClassName="map-container"
      zoom={10}
      center={center}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      { results.map((item, index) => {
        let showInfo = false; // by default all InfoWindows are closed, also close any prev opened
        if (index === showInfoIndex) { showInfo = true;} // only display the last user clicked marker's InfoWindow

        return (
          <Marker
            index={index}
            key={item.recordid}
            item={item}
            showInfo={showInfo}
            setShowInfoIndex={setShowInfoIndex}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        );
      })}
    </GoogleMap>
  );
}
