import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState, AppDispatch } from '../redux/store'
import { searchBooks } from '../redux/book-slice'
import { Book } from '../types/interfaces'
import { Pagination } from '../components/pagination'
import { CardBook } from '../components/cardBook'
import { Title } from '../components/Title'

export const SearchResultsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { query = '', page = '1' } = useParams<{ query: string; page: string }>() // По умолчанию query = '', page = '1'
  const currentPage = parseInt(page, 10) // По умолчанию 1, если page неопределено
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
      <Title>«{query}» Search Results</Title>
      <div className="search-books__results">
        {renderBooks()}
      </div>
    </div>
  )
}
