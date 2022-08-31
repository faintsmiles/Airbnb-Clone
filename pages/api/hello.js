// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const apiURL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&rows=20&facet=host_response_time&facet=host_response_rate&facet=host_verifications&facet=city&facet=country&facet=property_type&facet=room_type&facet=bed_type&facet=amenities&facet=availability_365&facet=cancellation_policy&facet=features'


export default async function handler(req, res) {
   
   let cityName = 'Amsterdam'
   let countryName = 'Netherlands'
   // Find user's ip
   // const forwarded = req.headers["x-forwarded-for"]
   // const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
   // console.log(ip)

   // var ip_addr = req.headers['X-FORWARDED-FOR'] || req.connection.remoteAddress;
   // console.log(ip_addr)
   require('dns').lookup(require('os').hostname(), function (err, add, fam) {
      console.log('addr: ' + add );
    })

   if(req.body){
      const body = JSON.parse(req.body)
      cityName = body.city;
      // countryName = body.country;
   }
   //  if(req.body) {

   //  }

   //const apiURL = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&facet=city&facet=country&facet=property_type&facet=room_type&facet=bed_type&facet=amenities&facet=availability_365&facet=cancellation_policy&facet=features&refine.country=${countryName}&refine.city=${cityName}`
   const apiURL = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&facet=host_response_time&facet=host_response_rate&facet=host_verifications&facet=city&facet=country&facet=property_type&facet=room_type&facet=bed_type&facet=amenities&facet=availability_365&facet=cancellation_policy&facet=features&refine.city=${cityName}`
   console.log(apiURL)


   return fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
       res.status(200).json({ data: data.records });
    })
    .catch((err) => {
       res.status(404).json({ Message: "An error occured" });
    });

}


