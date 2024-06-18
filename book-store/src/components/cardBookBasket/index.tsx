import React, { useState } from 'react'
import './index.scss'
import { CardBookProps } from '../../types/interfaces'

export const CardBookBasket = ({ title, image, subtitle, price, isbn13 }: CardBookProps) => {
  const [amount, setAmount] = useState(1) // Используем useState для хранения количества книг в корзине, начальное значение 1

  const decrementAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1) // Уменьшаем количество на 1, но не менее 1
    }
  }

  const incrementAmount = () => {
    setAmount(amount + 1) // Увеличиваем количество на 1
  }
  return (
    <div className="basket-card">
      <div className="basket-card__image">
        <img src={image} alt="book" />
      </div>
      <div className="basket-card__info">
        <h3 className="info__title">{title}</h3>
        <p className="info__subtitle">{subtitle}</p>
        <div className="basket-card__amount">
          <button className="amount-button" onClick={decrementAmount}>-</button>
          <span className="amount">{amount}</span>
          <button className="amount-button" onClick={incrementAmount}>+</button>
        </div>
      </div>
      <div className="basket-card__price">
        <p className="price__text">{price}</p>
      </div>
      <button className="basket-card__remove">Remove</button>
    </div>
  )
}
