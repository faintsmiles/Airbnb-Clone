import React, { useState } from "react";
// Utility library to interact with Google's APIs.
import { MarkerF, InfoWindowF } from "@react-google-maps/api";
// Component
import MapThumbnail from "./MapThumbnail";

export default function Marker({
  item,
  index,
  showInfo,
  setShowInfoIndex,
  favorites,
  setFavorites,
}) {
  // Prevents displaying where image hangs/returns an error
  const [error, setError] = useState(false);

  if (error) return;
  // Fields used in thumbnail
  if (!item.fields.geolocation) return;
  if (!item.fields.price) return;
  if (!item.fields.xl_picture_url) return;
  if (!item.fields.smart_location) return;

  return (
    <MarkerF
      position={{
        lat: item.fields.geolocation[0],
        lng: item.fields.geolocation[1],
      }}
      icon={{
        url: "/icon.png",
        scaledSize: new window.google.maps.Size(55, 40),
      }}
      label={{
        text: "$ " + item.fields.price.toString(),
        color: "white",
        fontWeight: "bold",
      }}
      clickable
      onClick={() => setShowInfoIndex(index)}
    >
      {showInfo && (
        <InfoWindowF
          position={{
            lat: item.fields.geolocation[0],
            lng: item.fields.geolocation[1],
          }}
          id="infoWindowF"
          onCloseClick={() => setShowInfoIndex(null)}
        >
          <MapThumbnail
            listing={item.fields}
            recordID={item.recordid}
            setError={setError}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        </InfoWindowF>
      )}
    </MarkerF>
  );
}
