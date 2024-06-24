// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
// import { searchBooks } from '../redux/book-slice'
// import { RootState, AppDispatch } from '../redux/store'
// import { Book } from '../types/interfaces'
// import { CardBook } from '../components/cardBook'

// export const SearchResultsPage: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const { query } = useParams<{ query: string }>()
//   // const posts = useSelector((state: RootState) => state.books.list)
//   // const error = useSelector((state: RootState) => state.books.error)
//   // const isLoading = useSelector((state: RootState) => state.books.isLoading)
//   const { list: books, isLoading, error } = useSelector((state: RootState) => state.books)
//   // const sortOption = useSelector((state: RootState) => state.books.sortOption)
//   // const [searched, setSearched] = useState(false)

//   useEffect(() => {
//     if (query !== undefined && query !== '') {
//       // setSearched(true)
//       dispatch(searchBooks(query))
//     }
//   }, [dispatch, query])

//   const renderBooks = () => {
//     if (isLoading) return <div>Loading...</div>

//     if (error) return <div className="alert alert-danger">{error}</div>

//     if (!isLoading && books.length === 0) {
//       return <div className="alert alert-info">No results found for «{query}»</div>
//     }

//     return (
//       <div className="row row-cols-md-3 g-3 ">
//         {books.map((book: Book) => (
//           <div key={book.isbn13} className="col">
//             <CardBook {...book} />
//           </div>
//         ))}
//       </div>
//     )
//   }

//   return (
//     <div className="search-books ">
//       <div className="search-books__title">
//         <h1>Search Results for «{query}»</h1>
//       </div>
//       <div className="search-books__results">
//       {renderBooks()}
//       </div>
//     </div>
//   )
// }

// pages/SearchResultsPage.tsx
// работает
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../redux/store'
import { searchBooks } from '../redux/book-slice'
import { Book } from '../types/interfaces'
import { Pagination } from '../components/Pagination'
import { CardBook } from '../components/cardBook'

export const SearchResultsPage: React.FC = () => {
  const dispatch = useDispatch()
  const { query, page } = useParams<{ query: string; page: string }>()
  const currentPage = parseInt(page, 10) || 1 // Текущая страница, по умолчанию 1
  const { list: books, isLoading, error, pagesCount } = useSelector((state: RootState) => state.books)

  useEffect(() => {
    if (query !== undefined && query !== '') {
      dispatch(searchBooks({ query, page: currentPage }))
    }
  }, [dispatch, query, currentPage])

  const renderBooks = () => {
    if (isLoading) return <div>Loading...</div>

    if (error) return <div className="alert alert-danger">{error}</div>

    if (!isLoading && books.length === 0) {
      return <div className="alert alert-info">No books found for «{query}»</div>
    }

    return (
      <>
        <div className="row row-cols-md-3 g-3">
          {books.map((book: Book) => (
            <div key={book.isbn13} className="col">
              <CardBook {...book} />
            </div>
          ))}
        </div>
        {/* Включаем компонент Pagination */}
        <Pagination query={query} currentPage={currentPage} pagesCount={pagesCount} />
      </>
    )
  }

  return (
    <div className="search-books">
      <div className="search-books__title">
        <h1>Search Results for «{query}»</h1>
      </div>
      <div className="search-books__results">
        {renderBooks()}
      </div>
    </div>
  )
}
