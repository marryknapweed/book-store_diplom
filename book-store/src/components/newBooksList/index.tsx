import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBook } from '../cardBook'
import { fetchBooks } from '../../redux/book-slice'
import { RootState, AppDispatch } from '../../redux/store'
import './index.scss'

export function NewBooksList () {
  const dispatch = useDispatch<AppDispatch>()
  // const { list, isLoading, error } = useSelector((state: RootState) => state.books)
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
        <div className='grid-container'>
          {books?.map((book) => (
          <CardBook
            key={book.isbn13}
            isbn13={book.isbn13} // TODO: fix
            title={book.title}
            subtitle={book.subtitle || ''}
            image={book.image}
            price={book.price}
          />
          ))}

        </div>
      </>
    )
  }

  return (
    <div>
      {renderBooks()}
    </div>
  )
}
