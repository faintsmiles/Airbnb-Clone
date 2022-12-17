const apiURL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&rows=30';

export default async function handler(req, res) {
  const body = JSON.parse(req.body);

  // Search location may contain the full "City, Region, Country" if switched by User
  // In which case split string and return first instance
  let cityName =  body.searchLocation.split(",").slice(0,1).join() || body.searchLocation
  // Remove trailing whitespaces then replace any remaining spaces with '+'
  cityName = cityName.trim().replace(/\s/g, "+")
  cityName = "&refine.city=" + cityName;

  const propertyType = "&refine.property_type=" + body.propertyType;

  return fetch(apiURL + cityName + propertyType )
    .then(response => response.json())
    .then(results => res.status(200).json(results.records))
    .catch(err => res.status(404).json({ Message: err }));
}
