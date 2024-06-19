// import React from 'react'
// import { Title } from '../components/Title'
// import { CardBookBasket } from '../components/cardBookBasket'

// export function CardBookBasketPage () {
//   return (
//     <>
//       <Title>New Releases Books</Title>
//       <CardBookBasket />
//     </>
//   )
// }

// src/components/Cart.tsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { CardBookBasket } from '../components/cardBookBasket'

export function CardBookBasketPage () {
  const cartItems = useSelector((state: RootState) => state.cart.items)

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0
        ? (
        <p>Your cart is empty</p>
          )
        : (
            cartItems.map((item) => (
          <CardBookBasket key={item.isbn13} {...item} />
            ))
          )}
    </div>
  )
}
