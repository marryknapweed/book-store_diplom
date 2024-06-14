import React from 'react'
import './index.scss'
import { CardBookProps } from '../../types/interfaces'

export const CardBook = ({ title, image, subtitle, price }: CardBookProps) => {
  return (
    <div className="new-book-card">
      <div className="new-book-card__image">
        <img src={image} alt="book" />
      </div>
      <div className="new-book-card__info">
        <h3 className="info__title">{title}</h3>
        <p className="info__subtitle">{subtitle}</p>
      </div>
      <div className="new-book-card__price">
        <p className="price__text">{price}</p>
      </div>
    </div>
  )
}
