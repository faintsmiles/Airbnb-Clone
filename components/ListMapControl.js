import React from "react";

export default function ListMapControl({ isMapActive, toggleMap }) {
  
  if(isMapActive) return viewlistButton(isMapActive, toggleMap);
  if(!isMapActive) return viewMapButton(isMapActive, toggleMap);
}

const viewControl = (isMapActive, toggleMap ) => {
    toggleMap(!isMapActive);
}

const viewMapButton = ( isMapActive, toggleMap ) => {
  return (
    <div className="m-10 z-50" >
      <button onClick={() => viewControl( isMapActive, toggleMap )} className=" p-4 rounded-full bg-black text-white">
        <span className="flex items-center font-semibold">
          Show Map &nbsp;
          <svg
            className="h-4"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            {/* <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
            <path d="M384 476.1L192 421.2V35.93L384 90.79V476.1zM416 88.37L543.1 37.53C558.9 31.23 576 42.84 576 59.82V394.6C576 404.4 570 413.2 560.9 416.9L416 474.8V88.37zM15.09 95.13L160 37.17V423.6L32.91 474.5C17.15 480.8 0 469.2 0 452.2V117.4C0 107.6 5.975 98.78 15.09 95.13V95.13z" />
          </svg>
        </span>
      </button>
    </div>
  );
};

const viewlistButton = ( isMapActive, toggleMap ) => {
  return (
    <div className="mb-10">
      <button onClick={() => viewControl( isMapActive, toggleMap )} className=" p-4 rounded-full bg-black text-white">
        <span className="flex items-center font-semibold">
          Show List &nbsp;
          <svg             className="h-4"
            fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            {/* <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
            <path d="M16 96C16 69.49 37.49 48 64 48C90.51 48 112 69.49 112 96C112 122.5 90.51 144 64 144C37.49 144 16 122.5 16 96zM480 64C497.7 64 512 78.33 512 96C512 113.7 497.7 128 480 128H192C174.3 128 160 113.7 160 96C160 78.33 174.3 64 192 64H480zM480 224C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H192C174.3 288 160 273.7 160 256C160 238.3 174.3 224 192 224H480zM480 384C497.7 384 512 398.3 512 416C512 433.7 497.7 448 480 448H192C174.3 448 160 433.7 160 416C160 398.3 174.3 384 192 384H480zM16 416C16 389.5 37.49 368 64 368C90.51 368 112 389.5 112 416C112 442.5 90.51 464 64 464C37.49 464 16 442.5 16 416zM112 256C112 282.5 90.51 304 64 304C37.49 304 16 282.5 16 256C16 229.5 37.49 208 64 208C90.51 208 112 229.5 112 256z" />
          </svg>
        </span>
      </button>
    </div>
  );
};
