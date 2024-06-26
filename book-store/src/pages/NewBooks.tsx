import React, { useEffect } from 'react'
import { Title } from '../components/Title'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks } from '../redux/book-slice'
import { RootState, AppDispatch } from '../redux/store'
import { CardBook } from '../components/cardBook'

export function NewBooksPage () {
  const dispatch = useDispatch<AppDispatch>()
  const books = useSelector((state: RootState) => state.books.list)
  const isLoading = useSelector((state: RootState) => state.books.isLoading)
  const error = useSelector((state: RootState) => state.books.error)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  function renderBooks () {
    if (isLoading) return <div>Loading...</div>
    if (error) return <div className='alert alert-danger'>{error}</div>
    if (!Array.isArray(books)) return <div>No books available</div>

    return (
      <>
        <div className='grid-container row row-cols-md-3 g-3'>
          {books.map((book) => (
          <div key={book.isbn13} className="col">
            <CardBook
              key={book.isbn13}
              isbn13={book.isbn13} // TODO: fix
              title={book.title}
              subtitle={book.subtitle || ''}
              image={book.image}
              price={book.price}
            />
        </div>
          ))}

        </div>
      </>
    )
  }

  return (
    <div>
      <Title>New Releases Books</Title>
      {renderBooks()}
    </div>
  )
}
