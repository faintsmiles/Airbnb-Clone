import parseCityFromLocation from "../../utils/parseLocation";
const apiURL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&rows=30';

export default async function handler(req, res) {
  const body = JSON.parse(req.body);

  const cityName = "&refine.city=" + parseCityFromLocation(body.searchLocation);
  const propertyType = "&refine.property_type=" + body.propertyType;

  return fetch(apiURL + cityName + propertyType )
    .then(response => response.json())
    .then(results => res.status(200).json(results.records))
    .catch(err => res.status(404).json({ Message: err }));
}
