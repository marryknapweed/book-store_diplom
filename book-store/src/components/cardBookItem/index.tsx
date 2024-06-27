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
import { getImageBackgroundColor, isbnToId } from '../../utils/helpersFunction'

export const CardBookItem = (props: BookDetailProps) => {
  const [showMore, setShowMore] = useState(false)
  const [quantity, setQuantity] = useState<number>(1) // Используем useState для отслеживания количества
  const [randomBooks, setRandomBooks] = useState<Book[]>([])
  const activeTab = useSelector((state: RootState) => state.bookItem.activeTab)
  const books = useSelector((state: RootState) => state.books.list)
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const favoriteItems = useSelector((state: RootState) => state.favorites.list)
  const dispatch = useDispatch<AppDispatch>()

  const id = isbnToId(props.isbn13)

  // Установка начального значения quantity при загрузке компонента
  useEffect(() => {
    setQuantity(props.quantity ?? 1)
  }, [props.quantity])

  // Обновление quantity при изменении cartItems (для синхронизации с корзиной)
  useEffect(() => {
    const cartItem = cartItems.find((item) => item.isbn13 === props.isbn13)
    if (cartItem) {
      setQuantity(cartItem.quantity)
    } else {
      setQuantity(1)
    }
  }, [cartItems, props.isbn13])

  useEffect(() => {
    const storedRandomBooks = getFromLocalStorage<Book[]>(`randomBooks_${id}`)
    if (storedRandomBooks && storedRandomBooks.length > 0) {
      setRandomBooks(storedRandomBooks)
    } else {
      generateRandomBooks()
    }
  }, [])

  // Функции для работы с корзиной и избранным
  const handleAddToCart = () => {
    dispatch(addItemToCart(props))
  }

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(id))
    setQuantity(1) // Сбрасываем количество до 1 при удалении из корзины
  }

  const handleIncrementFromCart = () => {
    const updatedQuantity = quantity + 1
    setQuantity(updatedQuantity)
    dispatch(incrementQuantity(id))
    setToLocalStorage(`cart-${id}`, updatedQuantity) // Сохраняем обновленное значение в localStorage
  }

  const handleDecrementFromCart = () => {
    if (quantity > 1) {
      const updatedQuantity = quantity - 1
      setQuantity(updatedQuantity)
      dispatch(decrementQuantity(id))
      setToLocalStorage(`cart-${id}`, updatedQuantity) // Сохраняем обновленное значение в localStorage
    }
  }

  const handleToggleFavorite = () => {
    dispatch(toggleItemInFavorites(props))
  }

  // Функция для открытия PDF в новой вкладке
  const handlePreviewClick = (pdfKey: string) => {
    if (props.pdf && props.pdf[pdfKey]) {
      window.open(props.pdf[pdfKey], '_blank')
    }
  }

  // Функция для переключения дополнительных деталей
  const toggleShowMore = () => {
    setShowMore(prevState => !prevState)
  }

  // Функция для получения случайных книг, исключая текущую
  const generateRandomBooks = () => {
    const shuffledBooks = books.filter((book: Book) => book.isbn13 !== props.isbn13).sort(() => 0.5 - Math.random())
    const randomBooks = shuffledBooks.slice(0, 6)
    setRandomBooks(randomBooks)
    setToLocalStorage(`randomBooks_${id}`, randomBooks)
  }

  // Проверяем, есть ли товар в корзине и избранном
  const isInCart = cartItems.some(item => item.isbn13 === props.isbn13)
  const isInFavorite = favoriteItems.some(item => item.isbn13 === props.isbn13)
  const quantityInCart = cartItems.find(item => item.isbn13 === props.isbn13)?.quantity || 0

  return (
    <>
      <Title>{props.title}</Title>
      <div className="books-item">
        <div className="books-item__image" style={{ backgroundColor: getImageBackgroundColor(props.price) }}>
          <img src={props.image} alt={props.title} />

          <div className="books-item__favorite" onClick={handleToggleFavorite}>
            {isInFavorite ? <FaHeart className='favorite-card__icon-active' /> : <FaRegHeart />}
          </div>
        </div>
        <div className="books-item__info">
          <div className="books-item__price">
            <p className="price__text">{props.price}</p>
            <div className="books-detail__rating">
              {'★'.repeat(props.rating) + '☆'.repeat(5 - props.rating)}
            </div>
          </div>
          <ul className="books-item__details">
            {props.authors && <li><strong>Authors: </strong>{props.authors}</li>}
            {props.publisher && <li><strong>Publisher: </strong>{props.publisher}</li>}
            {props.language && <li><strong>Language: </strong>{props.language}</li>}
            {props.format && <li><strong>Format: </strong>{props.format}</li>}
          </ul>

          <button className="books-detail__show-more" onClick={toggleShowMore}>
            {showMore ? (<>Show less <FaAngleDown /> </>) : (<>More details <FaAngleUp /> </>)}
          </button>

          {showMore && (
            <ul className="books-item__details books-item__more-details-list">
              {props.subtitle && <li><strong>Subtitle: </strong>{props.subtitle}</li>}
              {props.isbn10 && <li><strong>ISBN-10: </strong>{props.isbn10}</li>}
              {props.isbn13 && <li><strong>ID: </strong>{props.isbn13}</li>}
              {props.pages && <li><strong>Pages: </strong>{props.pages}</li>}
              {props.year && <li><strong>Year: </strong>{props.year}</li>}
              {props.url && <li><strong>URL: </strong><a href={props.url} target="_blank" rel="noopener noreferrer">{props.url}</a></li>}
            </ul>
          )}

          {isInCart
            ? <div className="books-detail">
                <button className="books-detail__button" onClick={handleRemoveFromCart}>In the basket</button>
                <QuantityControl quantity={quantityInCart} onIncrement={handleIncrementFromCart } onDecrement={handleDecrementFromCart} />
              </div>
            : <button className="books-detail__add-to-cart" onClick={handleAddToCart}>Add to cart</button>
          }

          {props.pdf && Object.keys(props.pdf).map((key) => (
            <a key={key} className="books-detail__preview" onClick={() => handlePreviewClick(key)}>Preview {key}</a>
          ))}
        </div>
      </div>

      <BookTabs />

      {activeTab === 'Description' && <div className="books-detail__description">{props.desc}</div>}
      {activeTab === 'Authors' && <div className="books-detail__authors">{props.authors}</div>}
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
