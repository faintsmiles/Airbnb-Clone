import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faList } from "@fortawesome/free-solid-svg-icons";

export default function ListMapControl({ isMapActive, toggleMap }) {
  
  if(isMapActive) return viewlistButton(isMapActive, toggleMap);
  if(!isMapActive) return viewMapButton(isMapActive, toggleMap);
}

const viewControl = (isMapActive, toggleMap ) => {
    toggleMap(!isMapActive);
}

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

const viewlistButton = ( isMapActive, toggleMap ) => {
  return (
    <div className="fixed left-1/2 -translate-x-1/2  bottom-20 z-50 ">
      <button onClick={() => viewControl( isMapActive, toggleMap )} className=" p-4 rounded-full bg-black text-white">
        <span className="flex items-center font-semibold">
          Show List &nbsp;
          <FontAwesomeIcon icon={faList} />
        </span>
      </button>
    </div>
  );
};
