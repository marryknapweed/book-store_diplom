import { client } from '../api/client'
import { booksEndpoint } from '../api/endpoints'

// async function requestBooksItem (isbn13: string) {
//   const { data } = await client.get(`${booksEndpoint}/${isbn13}`)
//   return data
// }
// import { client } from '../api/client';
// import { booksEndpoint } from '../api/endpoints';

async function requestBooksItem (isbn13: string) {
  if (!isbn13) {
    throw new Error('ID is required to fetch book details.')
  }

  const { data } = await client.get(`/books/${isbn13}`) // Обратите внимание на изменение пути
  return data
}

export { requestBooks, requestBooksItem }

async function requestBooks () {
  const { data } = await client.get(booksEndpoint)

  return data
}

// async function requestBooksItem (isbn13: string) {
//   if (!isbn13) {
//     throw new Error('ID is required to fetch book details.')
//   }

//   const { data } = await client.get(`/books/${isbn13}`) // Обратите внимание на изменение пути
//   return data
// }

// export { requestBooks, requestBooksItem }
