import React, { useState, useEffect } from 'react'
import './index.scss'
import { CardBookProps } from '../../types/interfaces'
import { IoCloseOutline, IoAdd, IoRemove } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { removeItemFromCart, decrementQuantity, incrementQuantity } from '../../redux/cart-slice'
import { AppDispatch } from '../../redux/store'
import { getFromLocalStorage, setToLocalStorage } from '../../utils/localStorageUtils' // Импортируем утилиты

export const CardBookBasket = ({ title, image, subtitle, price, isbn13, quantity: initialQuantity }: CardBookProps) => {
  const [quantity, setQuantity] = useState(initialQuantity) // Используем useState для отслеживания количества
  const dispatch = useDispatch<AppDispatch>()

  // При монтировании компонента извлекаем количество из localStorage
  useEffect(() => {
    const storedQuantity = getFromLocalStorage<number>(`cart-${isbn13}`)
    if (storedQuantity !== null) {
      setQuantity(storedQuantity)
    }
  }, [isbn13])

  const decrementAmount = () => {
    if (quantity > 1) {
      const updatedQuantity = quantity - 1
      setQuantity(updatedQuantity)
      dispatch(decrementQuantity(isbn13))
      setToLocalStorage(`cart-${isbn13}`, updatedQuantity) // Сохраняем обновленное значение в localStorage
    }
  }

  const incrementAmount = () => {
    const updatedQuantity = quantity + 1
    setQuantity(updatedQuantity)
    dispatch(incrementQuantity(isbn13))
    setToLocalStorage(`cart-${isbn13}`, updatedQuantity) // Сохраняем обновленное значение в localStorage
  }

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(isbn13))
    localStorage.removeItem(`cart-${isbn13}`) // Удаляем значение из localStorage при удалении товара из корзины
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
          <IoRemove className="amount-button" onClick={decrementAmount} />
          <span className="amount">{quantity}</span>
          <IoAdd className="amount-button" onClick={incrementAmount} />
        </div>
      </div>
      <div className="basket-card__price">
        <p className="price__text">{price}</p>
      </div>

      <IoCloseOutline className="basket-card__remove" onClick={handleRemoveFromCart} />
    </div>
  )
}
