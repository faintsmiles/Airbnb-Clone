const apiURL = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&rows=25";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  let cityName = "&refine.city=" + body.city;
  let countryName = "&refine.country=" + body.country;

  return fetch(apiURL + cityName + countryName)
    .then(response => response.json())
    .then(results => res.status(200).json(results.records))
    .catch(err => res.status(404).json({ Message: err }));
}
