import { client } from '../api/client'
import { booksEndpoint } from '../api/endpoints'

async function requestBooks (params = {}) {
  const { data } = await client.get(booksEndpoint, { params })
  return data
}

async function requestBooksSearch (query: string) {
  const { data } = await client.get(`/search/${query}`)
  return data
}

// async function requestBooksSearch (query: string, page: number) {
//   const { data } = await client.get(`/search/${query}/${page}`)
//   return data
// }

async function requestBooksItem (isbn13: string) {
  const { data } = await client.get(`/books/${isbn13}`)
  return data
}

export { requestBooks, requestBooksSearch, requestBooksItem }
