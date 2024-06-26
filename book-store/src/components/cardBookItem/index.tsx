import React, { useState, useEffect } from 'react'
import './index.scss'
import { BookDetailProps, Book } from '../../types/interfaces'
import { Title } from '../Title'
import { BookTabs } from '../bookTabs'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../redux/store'
import { addItemToCart, removeItemFromCart, incrementQuantity, decrementQuantity } from '../../redux/cart-slice'
import { toggleItemInFavorites } from '../../redux/favorite-slice'
import { FaRegHeart, FaHeart, FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { QuantityControl } from '../QuantityControl'
import { CardBook } from '../cardBook'
import { getFromLocalStorage, setToLocalStorage } from '../../utils/localStorageUtils'

export const CardBookItem = ({ title, image, price, rating, authors, publisher, language, format, desc, pdf, year, isbn13, pages, isbn10, subtitle, url }: BookDetailProps) => {
  const [showMore, setShowMore] = useState(false)
  const [randomBooks, setRandomBooks] = useState<Book[]>([])
  const activeTab = useSelector((state: RootState) => state.bookItem.activeTab)
  const books = useSelector((state: RootState) => state.books.list)
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const favoriteItems = useSelector((state: RootState) => state.favorites.list)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const storedRandomBooks = getFromLocalStorage<Book[]>(`randomBooks_${isbn13}`)
    if (storedRandomBooks && storedRandomBooks.length > 0) {
      setRandomBooks(storedRandomBooks)
    } else {
      generateRandomBooks()
    }
  }, [])

  // Функции для работы с корзиной и избранным
  const handleAddToCart = () => {
    dispatch(addItemToCart({ title, image, price, rating, authors, publisher, language, format, desc, pdf, year, isbn13, pages, isbn10, subtitle, url }))
  }

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(isbn13))
  }

  const handleIncrementFromCart = () => {
    dispatch(incrementQuantity(isbn13))
  }

  const handleDecrementFromCart = () => {
    dispatch(decrementQuantity(isbn13))
  }

  const handleToggleFavorite = () => {
    dispatch(toggleItemInFavorites({ title, image, subtitle, price, rating, isbn13 }))
  }

  // Функция для открытия PDF в новой вкладке
  const handlePreviewClick = (pdfKey: string) => {
    if (pdf && pdf[pdfKey]) {
      window.open(pdf[pdfKey], '_blank')
    }
  }

  // Функция для переключения дополнительных деталей
  const toggleShowMore = () => {
    setShowMore(prevState => !prevState)
  }

  // Функция для получения случайных книг, исключая текущую
  const generateRandomBooks = () => {
    const shuffledBooks = books.filter((book: Book) => book.isbn13 !== isbn13).sort(() => 0.5 - Math.random())
    const randomBooks = shuffledBooks.slice(0, 6)
    setRandomBooks(randomBooks)
    setToLocalStorage(`randomBooks_${isbn13}`, randomBooks)
  }

  // Проверяем, есть ли товар в корзине и избранном
  const isInCart = cartItems.some(item => item.isbn13 === isbn13)
  const isInFavorite = favoriteItems.some(item => item.isbn13 === isbn13)
  const quantityInCart = cartItems.find(item => item.isbn13 === isbn13)?.quantity || 0

  return (
    <>
      <Title>{title}</Title>
      <div className="books-item__content">
        <div className="books-item__image">
          <img src={image} alt={title} />

          <div className="books-item__favorite" onClick={handleToggleFavorite}>
            {isInFavorite ? <FaHeart className='favorite-card__icon-active' /> : <FaRegHeart />}
          </div>
        </div>
        <div className="books-item__info">
          <div className="books-item__price">
            <p className="price__text">{price}</p>
            <div className="books-detail__rating">
              {'★'.repeat(rating) + '☆'.repeat(5 - rating)}
            </div>
          </div>
          <ul className="books-detail__details">
            {authors && <li><strong>Authors: </strong>{authors}</li>}
            {publisher && <li><strong>Publisher: </strong>{publisher}</li>}
            {language && <li><strong>Language: </strong>{language}</li>}
            {format && <li><strong>Format: </strong>{format}</li>}
          </ul>

          <button className="books-detail__more-details" onClick={toggleShowMore}>
            {showMore ? (<>Show less <FaAngleDown /> </>) : (<>More details <FaAngleUp /> </>)}
          </button>

          {showMore && (
            <ul className="books-detail__details books-detail__more-details-list">
              {subtitle && <li><strong>Subtitle: </strong>{subtitle}</li>}
              {isbn10 && <li><strong>ISBN-10: </strong>{isbn10}</li>}
              {isbn13 && <li><strong>ISBN-13: </strong>{isbn13}</li>}
              {pages && <li><strong>Pages: </strong>{pages}</li>}
              {year && <li><strong>Year: </strong>{year}</li>}
              {url && <li><strong>URL: </strong><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></li>}
            </ul>
          )}

          {isInCart
            ? <div className="books-detail">
              <button className="books-detail__button" onClick={handleRemoveFromCart}>In the basket</button>
              <QuantityControl quantity={quantityInCart} onIncrement={handleIncrementFromCart} onDecrement={handleDecrementFromCart} />
            </div>
            : <button className="books-detail__add-to-cart" onClick={handleAddToCart}>Add to cart</button>
          }

          {pdf && Object.keys(pdf).map((key) => (
            <a key={key} className="books-detail__preview" onClick={() => handlePreviewClick(key)}>Preview {key}</a>
          ))}
        </div>
      </div>

      <BookTabs />

      {activeTab === 'Description' && <div className="books-detail__description">{desc}</div>}
      {activeTab === 'Authors' && <div className="books-detail__authors">{authors}</div>}
      {activeTab === 'Similar Books' && (
        <div className="book-details__similar-books">
          <ul className="book-details__similar-books-list">
            {randomBooks.map((book: Book) => (
                <CardBook key={book.isbn13} {...book} />
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
