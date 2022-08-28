// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const apiURL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&rows=50&facet=host_response_time&facet=host_response_rate&facet=host_verifications&facet=city&facet=country&facet=property_type&facet=room_type&facet=bed_type&facet=amenities&facet=availability_365&facet=cancellation_policy&facet=features'

export default async function handler(req, res) {
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      return res.status(200).json({ data: data.records });
    })
    .catch((err) => {
      return res.status(404).json({ Message: "An error occured" });
    });

}
