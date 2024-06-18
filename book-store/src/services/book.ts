import { client } from '../api/client'
import { booksEndpoint } from '../api/endpoints'

async function requestBooks (params = {}) {
  console.log('Requesting books with params:', params)
  const { data } = await client.get(booksEndpoint, { params })
  console.log('Received data from API:', data)

  return data
}
async function requestBooksItem (isbn13: string) {
  // if (!isbn13) {
  //   throw new Error('ID is required to fetch book details.')
  // }

  const { data } = await client.get(`/books/${isbn13}`)
  return data
}

export { requestBooks, requestBooksItem }
