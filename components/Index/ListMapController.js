import React from "react";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faList } from "@fortawesome/free-solid-svg-icons";

export default function ListMapController({ isMapActive, toggleMap }) {
  // Which component (below) to display
  if(isMapActive) return viewlistButton(isMapActive, toggleMap);
  if(!isMapActive) return viewMapButton(isMapActive, toggleMap);
}
// Modify toggle map state
const viewControl = (isMapActive, toggleMap ) => {
    toggleMap(!isMapActive);
}

// Button components
// Map
const viewMapButton = ( isMapActive, toggleMap ) => {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-20 z-50 " >
      <button onClick={() => viewControl( isMapActive, toggleMap )} className=" p-4 rounded-full bg-black text-white">
        <span className="flex items-center font-semibold">
          Show Map &nbsp;
          <FontAwesomeIcon icon={faMap} />
        </span>
      </button>
    </div>
  );
};
// List
const viewlistButton = ( isMapActive, toggleMap ) => {
  return (
    <div className="fixed left-1/2 -translate-x-1/2  bottom-20 z-50 ">
      <button onClick={() => viewControl( isMapActive, toggleMap )} className=" p-4 rounded-full bg-black text-white">
        <span className="flex items-center font-semibold">
          Show Grid &nbsp;
          <FontAwesomeIcon icon={faList} />
        </span>
      </button>
    </div>
  );
};
