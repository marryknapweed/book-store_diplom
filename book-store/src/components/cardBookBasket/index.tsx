import React, { useState } from 'react'
import './index.scss'
import { CardBookProps } from '../../types/interfaces'
import { IoCloseOutline, IoAdd, IoRemove } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { removeItemFromCart, decrementQuantity, incrementQuantity } from '../../redux/cart-slice'
import { AppDispatch } from '../../redux/store'

export const CardBookBasket = ({ title, image, subtitle, price, isbn13 }: CardBookProps) => {
  const [amount, setAmount] = useState(1) // Используем useState для хранения количества книг в корзине, начальное значение 1
  const dispatch = useDispatch<AppDispatch>()

  // const decrementAmount = () => {
  //   if (amount > 1) {
  //     setAmount(amount - 1) // Уменьшаем количество на 1, но не менее 1
  //   }
  // }

  const decrementAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1)
      dispatch(decrementQuantity(isbn13))
    }
  }

  // const incrementAmount = () => {
  //   setAmount(amount + 1) // Увеличиваем количество на 1
  // }

  const incrementAmount = () => {
    setAmount(amount + 1)
    dispatch(incrementQuantity(isbn13))
  }

  // const handleRemoveFromCart = () => {
  //   dispatch(removeItemFromCart(isbn13))
  // }

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(isbn13))
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
          {/* <button className="amount-button" onClick={decrementAmount}>-</button> */}
          <IoRemove className="amount-button" onClick={decrementAmount} />
          <span className="amount">{amount}</span>
          <IoAdd className="amount-button" onClick={incrementAmount} />
          {/* <button className="amount-button" onClick={incrementAmount}>+</button> */}
        </div>
      </div>
      <div className="basket-card__price">
        <p className="price__text">{price}</p>
      </div>
      {/* <button className="basket-card__remove">Remove</button> */}
      <IoCloseOutline className="basket-card__remove" onClick={handleRemoveFromCart} />

    </div>
  )
}
