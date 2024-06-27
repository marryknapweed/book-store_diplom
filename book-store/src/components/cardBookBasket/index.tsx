import React, { useState, useEffect } from 'react'
import './index.scss'
import { CardBookProps } from '../../types/interfaces'
import { IoCloseOutline, IoAdd, IoRemove } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { removeItemFromCart, decrementQuantity, incrementQuantity } from '../../redux/cart-slice'
import { AppDispatch } from '../../redux/store'
import { getFromLocalStorage, setToLocalStorage } from '../../utils/localStorageUtils' // Импортируем утилиты
import { isbnToId, getImageBackgroundColor } from '../../utils/helpersFunction'
import { Link } from 'react-router-dom'

export const CardBookBasket = (props: CardBookProps) => {
  const [quantity, setQuantity] = useState<number>(props.quantity ?? 1) // Используем useState для отслеживания количества
  const dispatch = useDispatch<AppDispatch>()

  const id = isbnToId(props.isbn13)

  // При монтировании компонента извлекаем количество из localStorage
  useEffect(() => {
    const storedQuantity = getFromLocalStorage<number>(`cart-${id}`)
    if (storedQuantity !== null) {
      setQuantity(storedQuantity)
    }
  }, [id])

  const decrementAmount = () => {
    if (quantity !== undefined && quantity > 1) {
      const updatedQuantity = quantity - 1
      setQuantity(updatedQuantity)
      dispatch(decrementQuantity(id))
      setToLocalStorage(`cart-${id}`, updatedQuantity) // Сохраняем обновленное значение в localStorage
    }
  }

  const incrementAmount = () => {
    if (quantity !== undefined) {
      const updatedQuantity = quantity + 1
      setQuantity(updatedQuantity)
      dispatch(incrementQuantity(id))
      setToLocalStorage(`cart-${id}`, updatedQuantity) // Сохраняем обновленное значение в localStorage
    }
  }

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(id))
    localStorage.removeItem(`cart-${id}`) // Удаляем значение из localStorage при удалении товара из корзины
  }

  return (
    <div className="basket-card">
        <Link to={`/books/${id}`}>
          <div className="basket-card__image" style={{ backgroundColor: getImageBackgroundColor(props.price.toString()) }}>
            <img src={props.image} alt="book" />
          </div>
        </Link>
        <div className="basket-card__info">
          <Link to={`/books/${id}`}>
            <h3 className="info__title">{props.title}</h3>
            <p className="info__subtitle">{props.subtitle}</p>
          </Link>
          <div className="basket-card__amount">
            <IoRemove className="amount-button" onClick={decrementAmount} />
            <span className="amount">{quantity}</span>
            <IoAdd className="amount-button" onClick={incrementAmount} />
          </div>
        </div>
        <div className="basket-card__price">
          <p className="price__text">{props.price}</p>
        </div>
      <IoCloseOutline className="basket-card__remove" onClick={handleRemoveFromCart} />
    </div>
  )
}
