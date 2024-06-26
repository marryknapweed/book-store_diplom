import React from 'react'
import './index.scss'
import { CardBookProps } from '../../types/interfaces'
import { Link } from 'react-router-dom'
import { getImageBackgroundColor, isbnToId } from '../../utils/helpersFunction'

export const CardBook = ({ title, image, subtitle, price, isbn13 }: CardBookProps) => {
  const id = isbnToId(isbn13)

  return (
    <div className="card-book">
      <Link to={`/books/${id}`}>
        <div className="card-book__image" style={{ backgroundColor: getImageBackgroundColor(price.toString()) }}>
          <img src={image} alt="book" />
        </div>
        <div className="card-book__info">
          <h3 className="info__title">{title}</h3>
          <p className="info__subtitle">{subtitle}</p>
        </div>
      </Link>
      <div className="card-book__price">
        <p className="price__text">{price}</p>
      </div>
    </div>
  )
}
