import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Utility library for google maps API
import { useLoadScript } from "@react-google-maps/api";

// Components
import Header from "../../components/Header";
import ListingPageContent from "../../components/ListingPageContent";
// import ListingPageForm from '../../components/ListingPageForm'
import FooterExpanded from "../../components/FooterExpanded";
import FavoritesModal from "../../components/FavoritesModal";
import { refreshFavorites } from "../../utils/favorites";

const googleLibraries = ["places"];

export default function listingPage() {
  const { isLoaded } = useLoadScript({
    // This needs to be hidden in the future, currently visible in network
    // May need to do SSR in future to prevent leaking or calling to API on server
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: googleLibraries,
  });

  const router = useRouter();
  const { pid } = router.query;

  const [roomData, setRoomData] = useState();
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const callRefreshFavorites = () => {
    refreshFavorites(setFavorites);
  };

  useEffect(() => {
    if (!router.isReady) return;

    // syncs/refreshes favorites if altered in another tab witin the same domain
    window.addEventListener("storage", callRefreshFavorites);
    // Set initial values, once router has connected
    let temp = JSON.parse(localStorage.getItem(pid));
    setRoomData(temp);
    temp = JSON.parse(localStorage.getItem("favoriteListings"));
    setFavorites(temp);

    return () => {
      window.removeEventListener("storage", refreshFavorites);
    };
  }, [router.isReady]);

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
        <ListingPageContent
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
