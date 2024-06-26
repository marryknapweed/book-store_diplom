import { client } from '../api/client'
import { booksEndpoint } from '../api/endpoints'

async function requestBooks (params = {}) {
  const { data } = await client.get(booksEndpoint, { params })
  return data
}

async function requestBooksSearch (query: string, page: number) {
  const { data } = await client.get(`/search/${query}/${page}`)
  return data
}

async function requestBooksItem (isbn13: string) {
  const { data } = await client.get(`/books/${isbn13}`)
  return data
}

async function requestBooksSearchAPI (query: string) {
  try {
    const data = await requestBooksSearch(query, 1)
    return data.books // Возвращаем только данные книг
  } catch (error) {
    console.error('Error fetching search results:', error)
    throw error // Перебрасываем ошибку для обработки выше
  }
}

export { requestBooks, requestBooksSearch, requestBooksItem, requestBooksSearchAPI }
