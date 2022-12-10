// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const apiURL ="https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&rows=25";

export default async function handler(req, res) {
  // Find user's ip
  // require('dns').lookup(require('os').hostname(), function (err, add, fam) { console.log('addr: ' + add ) })
  // var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
  //       req.socket.remoteAddress

  // console.log(req.headers['x-forwarded-for'])

  let cityName = "&refine.city=" + "Amsterdam";
  let countryName = "&refine.country=" + "Netherlands";

  if (req.body) {
    const body = JSON.parse(req.body);
    cityName = "&refine.city=" + body.city;
    countryName = "&refine.country=" + body.country;
  }

  return fetch(apiURL + cityName)
    .then((response) => response.json())
    .then((data) => {
      res
        .status(200)
        .json({
          results: data.records,
          defaultLocation: cityName.split("=")[1] || cityName,
        });
    })
    .catch((err) => {
      res.status(404).json({ Message: err });
    });
}
