import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, 
  token:'sk2iyI0EMUxDAK8oGQkjiXtV5H92wxXqNDKCwV1ZhXFjebU5Xj4eui1FlqjSoF0TJwrnkZub6SMcIgWRNI2EOBRf3ogc9aF235yEAOCH0Kgdh9WzfvN7wGHWGDXk8tz1PqMu4TyJqnsBQOjVOYBR5Ju2QH3Bngtsg1FraSg5v47ZcVrFVZQR'
})
