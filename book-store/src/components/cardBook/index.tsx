import React, { useEffect, useState } from 'react'
import './index.scss'
import { CardBookProps } from '../../types/interfaces'
import { Link } from 'react-router-dom'

export const CardBook = ({ title, image, subtitle, price, isbn13 }: CardBookProps) => {
  return (
    <div className="new-book-card">
      <Link to={`/books/${isbn13}`}>
        <div className="new-book-card__image">
          <img src={image} alt="book" />
        </div>
        <div className="new-book-card__info">
          <h3 className="info__title">{title}</h3>
          <p className="info__subtitle">{subtitle}</p>
        </div>
      </Link>
      <div className="new-book-card__price">
        <p className="price__text">{price}</p>
      </div>
    </div>
  )
}
