// Parse and clean the City name from searchLocation 
export function parseCityFromLocation(searchLocation) {
    // Search location may contain the full "City, Region, Country" if switched by User
    // In which case split string and return first instance
    let cityName =  searchLocation.split(",").slice(0,1).join() || searchLocation
    // Remove trailing whitespaces then replace any remaining spaces with '+'
    cityName = cityName.trim().replace(/\s/g, "+")
    return cityName
}