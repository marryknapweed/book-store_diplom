import React, { useEffect } from 'react'
import { Title } from '../components/Title'
import { CardBookItem } from '../components/cardBookItem'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchBookById, setActiveTab } from '../redux/book-item-slice'
import { RootState, AppDispatch } from '../redux/store'

export function CardBookItemPage () {
  const dispatch = useDispatch<AppDispatch>()
  const { id: isbn13 } = useParams<{ id: string }>()
  const book = useSelector((state: RootState) => state.bookItem.list)
  const isLoading = useSelector((state: RootState) => state.bookItem.isLoading)
  const error = useSelector((state: RootState) => state.bookItem.error)

  useEffect(() => {
    // Сброс активного таба при размонтировании компонента
    return () => {
      dispatch(setActiveTab(''))
    }
  }, [dispatch])

  useEffect(() => {
    if (isbn13) {
      dispatch(fetchBookById(isbn13))
    }
  }, [isbn13, dispatch])
  function renderContent () {
    if (isLoading) return <div>Loading...</div>
    if (error) return <div className='alert alert-danger'>{error}</div>

    return (
      <div className="books-item-page">
        {book && <CardBookItem {...book} />}
      </div>
    )
  }

  return (
    <>
      {renderContent()}
    </>
  )
}
