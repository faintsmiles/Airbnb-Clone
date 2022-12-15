// Util functions to handle which filters are selected and create fetch URLs
import { parseFilters, createFilterRequests } from '../../utils/handleFilters'

export default async function handler(req, res) {

  const _filters = parseFilters(JSON.parse(req.body))

  const fetchRequests = createFilterRequests(_filters, 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=')

  return Promise.all(fetchRequests)
    .then(results => results.flat())
    .then(results => res.status(200).json(results) )
    .catch(err => res.status(404).json({ Message: err }))
}
