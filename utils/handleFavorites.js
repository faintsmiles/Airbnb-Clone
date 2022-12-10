export function modifyFavorites(favorites, setFavorites, newItem) {
    if(!favorites){ // favorites is empty, add new item
      localStorage.setItem( "favoriteListings", JSON.stringify([newItem]))
      setFavorites([newItem])
      return;
    }
    // check favorites to see if item is already present, if so remove. otherwise add on if statement.
    let duplicateFound = false;
    favorites = favorites.filter(object => object.id != newItem.id ? true : (duplicateFound = true, false))

    if(!duplicateFound) {
      favorites.push(newItem)
    }

    localStorage.setItem( "favoriteListings", JSON.stringify(favorites))
    setFavorites(favorites)
  }  

  export function refreshFavorites(setFavorites) {
    let data = JSON.parse(localStorage.getItem("favoriteListings")) || []
    setFavorites(data)
  }
