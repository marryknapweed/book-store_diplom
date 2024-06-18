import { BookDetailProps } from '../../types/interfaces'
import { Title } from '../Title'
import './index.scss'
import { BookTabs } from '../bookTabs'

export const CardBookItem = ({ title, image, price, rating, authors, publisher, language, format }: BookDetailProps) => {
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
            <li><strong>Authors: </strong>{authors}</li>
            <li><strong>Publisher: </strong>{publisher}</li>
            <li><strong>Language: </strong>{language}</li>
            <li><strong>Format: </strong>{format}</li>
          </ul>
          <button className="books-detail__more-details">More details &#9660;</button>
          <button className="books-detail__add-to-cart">Add to cart</button>
          <a className="books-detail__preview">Preview book</a>
        </div>
      </div>

      <BookTabs />

    </>
  )
}
