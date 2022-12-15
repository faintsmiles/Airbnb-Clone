// Hooks
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// Components
import Header from "../../components/Layout/Header";
import ListingContent from "../../components/Listings/ListingContent";
import FooterExpanded from "../../components/Layout/FooterExpanded";
import FavoritesModal from "../../components/common/FavoritesModal";
// Utility library for google maps API
import { useLoadScript } from "@react-google-maps/api";
// Util function
import { refreshFavorites } from "../../utils/handleFavorites";

// google maps libraries
const googleLibraries = ["places"];

export default function listingPage() {
  // Connect to Google's Maps API
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: googleLibraries,
  });
  // Allows us to get url parameters passed, like the listing ID
  const router = useRouter();
  const { pid } = router.query;
  // States
  const [roomData, setRoomData] = useState();
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  // Named function for event handler
  const callRefreshFavorites = () => {
    refreshFavorites(setFavorites);
  };
  // Initial load and once router is connected and ready to retrieve URL param: listing ID
  useEffect(() => {
    if (!router.isReady) return;
    // syncs/refreshes favorites if altered in another tab witin the same domain
    window.addEventListener("storage", callRefreshFavorites);
    // Set initial values, once router has connected
    let temp = JSON.parse(localStorage.getItem(pid));
    setRoomData(temp);
    temp = JSON.parse(localStorage.getItem("favoriteListings"));
    setFavorites(temp);
    // 
    return () => {
      window.removeEventListener("storage", refreshFavorites);
    };
  }, [router.isReady]);

  // 
  if (!isLoaded) return <h1>Loading...</h1>;
  if (!roomData) return <h1>Listing data could not be found.</h1>;

  return (
    <>
      <Head>
        <title>Listing Page</title>
        <meta name="description" content="Airbnb clone created with NextJS" />
        <link rel="icon" href="/airbnb.svg" />
      </Head>
      <main>
        <Header favorites={favorites} setShowFavorites={setShowFavorites} />
        <ListingContent
          roomData={roomData}
          favorites={favorites}
          setFavorites={setFavorites}
        />
        <FooterExpanded />
        {showFavorites && (
          <FavoritesModal
            favorites={favorites}
            setFavorites={setFavorites}
            setShowFavorites={setShowFavorites}
          />
        )}
      </main>
    </>
  );
}
