import { BookDetailProps } from '../../types/interfaces'
import { Title } from '../Title'
import './index.scss'
import { BookTabs } from '../bookTabs'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../redux/store'
import { useState } from 'react'
import { addItemToCart, removeItemFromCart } from '../../redux/cart-slice'
import { QuantityControl } from '../QuantityControl'

export const CardBookItem = ({ title, image, price, rating, authors, publisher, language, format, desc, pdf, year, isbn13, pages, isbn10, subtitle, url }: BookDetailProps) => {
  const activeTab = useSelector((state: RootState) => state.bookItem.activeTab)
  const [showMore, setShowMore] = useState(false)
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch<AppDispatch>()

  const handlePreviewClick = (pdfKey: string) => {
    if (pdf && pdf[pdfKey]) {
      window.open(pdf[pdfKey], '_blank') // Открываем PDF в новой вкладке
    }
  }

  const toggleShowMore = () => {
    setShowMore(prevState => !prevState)
  }

  const handleAddToCart = () => {
    dispatch(addItemToCart({ title, image, price, rating, authors, publisher, language, format, desc, pdf, year, isbn13, pages, isbn10, subtitle, url }))
  }

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(isbn13))
  }

  const isInCart = cartItems.some(item => item.isbn13 === isbn13)

  return (
    <>
      <Title>{title}</Title>
      <div className="books-item__content">
        <div className="books-item__image">
          <img src={image} alt={title} />
          <button className="books-item__favorite">&#10084;</button>
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
            {showMore ? 'Show less ▲' : 'More details ▼'}
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
            ? (
          // <div className="books-item__cart-controls">
          //   <button className="cart-control-button" onClick={handleRemoveFromCart}>-</button>
          //   <span>{cartItems.filter(item => item.isbn13 === isbn13).length}</span>
          //   <button className="cart-control-button" onClick={handleAddToCart}>+</button>
          // </div>

            <QuantityControl quantity={cartItems.filter(item => item.isbn13 === isbn13).length} onIncrement={handleAddToCart} onDecrement={handleRemoveFromCart} />
              )
            : (
            <button className="books-detail__add-to-cart" onClick={handleAddToCart}>Add to cart</button>
              )}

          {pdf && Object.keys(pdf).map((key) => (
            <a key={key} className="books-detail__preview" onClick={() => handlePreviewClick(key)}>Preview {key}</a>
          ))}
        </div>
      </div>

      <BookTabs />

      {activeTab === 'Description' && (
            <div className="books-detail__description">
              {desc}
            </div>
      )}
          {activeTab === 'Authors' && (
            <div className="books-detail__authors">
              {authors}
            </div>
          )}
          {activeTab === 'Reviews' && (
            <div className="books-detail__reviews">
              {/* Отзывы */}
            </div>
          )}

    </>
  )
}
