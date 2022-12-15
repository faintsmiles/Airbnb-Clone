import React from "react";
// Component
import Thumbnail from "./Thumbnail";
// Unique ID lib
import { v4 as uuidv4 } from "uuid";
// Fontawesome
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function favoritesModal({
  favorites,
  setFavorites,
  setShowFavorites,
}) {
  return (
    <div
      className="fixed h-full w-full top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 p-2 md:p-8"
      onClick={() => setShowFavorites(false)}
    >
      <div
        className="relative top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 h-full w-full md:max-w-4xl overflow-y-scroll no-scrollbar bg-white rounded-xl z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <button
            className="absolute top-5 left-3 p-1 px-3 hover:bg-gray-100 rounded-full"
            onClick={() => setShowFavorites(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className="w-full py-6 text-2xl text-center font-bold border-b">
            Favorites
          </div>
        </header>
        <div className="h-auto w-full grid grid-cols-1 sm:grid-cols-2 justify-items-center px-8 md:px-32 pt-12 pb-24 gap-x-16 gap-y-6">
          {favorites.map((item) => {
            return (
              <div
                className="h-full w-full max-w-sm max-h-sm"
                key={"Favorites" + uuidv4()}
              >
                <Thumbnail
                  key={uuidv4()}
                  listing={item}
                  listingID={item.recordid}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
