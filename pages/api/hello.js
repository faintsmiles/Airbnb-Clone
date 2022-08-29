// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const apiURL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&rows=20&facet=host_response_time&facet=host_response_rate&facet=host_verifications&facet=city&facet=country&facet=property_type&facet=room_type&facet=bed_type&facet=amenities&facet=availability_365&facet=cancellation_policy&facet=features'
const apiURL ='https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&facet=city&facet=country&facet=property_type&facet=room_type&facet=bed_type&facet=amenities&facet=availability_365&facet=cancellation_policy&facet=features&refine.country=Netherlands&refine.city=Amsterdam'
export default async function handler(req, res) {
    return fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
       res.status(200).json({ data: data.records });
    })
    .catch((err) => {
       res.status(404).json({ Message: "An error occured" });
    });

}
