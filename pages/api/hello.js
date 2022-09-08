// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const apiURL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&rows=20&facet=host_response_time&facet=host_response_rate&facet=host_verifications&facet=city&facet=country&facet=property_type&facet=room_type&facet=bed_type&facet=amenities&facet=availability_365&facet=cancellation_policy&facet=features'
const apiURL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&rows=20&facet=host_response_time&facet=host_response_rate&facet=host_verifications&facet=city&facet=country&facet=property_type&facet=room_type&facet=bed_type&facet=amenities&facet=availability_365&facet=cancellation_policy&facet=features'
//const apiURL ='';

export default async function handler(req, res) {
   
   let cityName = '&refine.city=' + 'Amsterdam'
   let countryName = '&refine.country=' + 'Netherlands'
   
   // Find user's ip
   // require('dns').lookup(require('os').hostname(), function (err, add, fam) { console.log('addr: ' + add ) })
   // var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
   //       req.socket.remoteAddress

   // console.log(req.headers['x-forwarded-for'])
   
   if(req.body){
      const body = JSON.parse(req.body)
      cityName = '&refine.city=' + body.city;
      countryName = '&refine.country=' + body.country;
   }

   console.log("api url:" + apiURL + countryName + cityName )

   return fetch(apiURL + countryName + cityName )
    .then((response) => response.json())
    .then((data) => {
       res.status(200).json({ data: data.records });
    })
    .catch((err) => {
       res.status(404).json({ Message: err });
    });

}

