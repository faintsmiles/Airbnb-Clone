import { cleanFilters, createQueryURL } from '../../utils/handleFilters'

export default async function handler(req, res) {

  const _filters = cleanFilters(JSON.parse(req.body))

  const urlsToQuery = createQueryURL(_filters, 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=')

  return Promise.all(urlsToQuery)
    .then(results => results.flat())
    .then(results => res.status(200).json(results) )
    .catch(err => res.status(404).json({ Message: err }))
}
