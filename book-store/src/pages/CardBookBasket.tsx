// src/components/Cart.tsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Title } from '../components/Title'
import { RootState } from '../redux/store'
import { CardBookBasket } from '../components/cardBookBasket'
import { EmptyState } from '../components/EmptyState'
import { FaShoppingCart } from 'react-icons/fa'
import { CartSummary } from '../components/сartSummary'

export function CardBookBasketPage () {
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const { sumTotal, VAT, total } = cartItems.reduce(
    (acc, item) => {
      const price = item.price ? parseFloat(item.price) : 0
      return {
        sumTotal: acc.sumTotal + (price * item.quantity || 0),
        VAT: acc.VAT + (price * item.quantity * 0.18 || 0),
        total: acc.total + (price * item.quantity * 1.18 || 0)
      }
    },
    { sumTotal: 0, VAT: 0, total: 0 }
  )

  return (
    <div className="cart">
      <Title>Shopping Cart</Title>
      {cartItems.length === 0
        ? (
          <EmptyState icon={FaShoppingCart} text="Your basket is empty" />
          )
        : (
            cartItems.map((item) => (
          <CardBookBasket key={item.isbn13} {...item} />
            ))
          )}
          {cartItems.length > 0 && <CartSummary sumTotal={sumTotal} VAT={VAT} total={total} />}
    </div>
  )
}
