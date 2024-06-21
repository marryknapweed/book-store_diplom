import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchBooks } from '../redux/book-slice'
import { RootState, AppDispatch } from '../redux/store'
import { Book } from '../types/interfaces'
import { CardBook } from '../components/cardBook'

export const SearchResultsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { query } = useParams<{ query: string }>()
  // const posts = useSelector((state: RootState) => state.books.list)
  // const error = useSelector((state: RootState) => state.books.error)
  // const isLoading = useSelector((state: RootState) => state.books.isLoading)
  const { list: books, isLoading, error } = useSelector((state: RootState) => state.books)
  // const sortOption = useSelector((state: RootState) => state.books.sortOption)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (query !== undefined && query !== '') {
      setSearched(true)
      dispatch(fetchBooks({ search: query }))
    }
  }, [dispatch, query])

  const renderBooks = () => {
    if (isLoading) return <div>Loading...</div>

    if (error) return <div className="alert alert-danger">{error}</div>

    if (searched && books.length === 0) {
      return <div>No results found for «{query}»</div>
    }

    return books.map((book: Book) => <CardBook key={book.isbn13} {...book} />)
  }

  return (
    <div className="search-books">
      <div className="search-books__title">
        <h1>Search Results for «{query}»</h1>
      </div>
      <div className="search-books__results row row-cols-3">
      {renderBooks()}
      </div>
    </div>
  )
}
