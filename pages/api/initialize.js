const apiURL = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&rows=25";

export default async function handler(req, res) {
  // Defaults
  let cityName = "&refine.city=" + "Amsterdam";
  //let countryName = "&refine.country=" + "Netherlands";

  return fetch(apiURL + cityName)
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json({
        results: data.records,
        defaultLocation: cityName.split("=")[1] || cityName,
      });
    })
    .catch((err) => {
      res.status(404).json({ Message: err });
    });
}
