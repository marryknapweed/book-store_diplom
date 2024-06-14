import { client } from '../api/client'
import { booksEndpoint } from '../api/endpoints'

async function requestBooks () {
  const { data } = await client.get(booksEndpoint)

  return data
}

export { requestBooks }
