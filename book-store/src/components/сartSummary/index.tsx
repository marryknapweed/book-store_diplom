import React from 'react'
import { CartSummaryProps } from '../../types/interfaces'
import './index.scss'

export const CartSummary = ({ sumTotal, VAT, total }: CartSummaryProps) => {
  return (
    <div className="cart-summary">
      <div className="cart-summary__item">
        <span>Sum total</span>
        <span>${sumTotal.toFixed(2)}</span>
      </div>
      <div className="cart-summary__item">
        <span>VAT</span>
        <span>${VAT.toFixed(2)}</span>
      </div>
      <div className="cart-summary__item total">
        <span>TOTAL:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button className="cart-summary__button">CHECK OUT</button>
    </div>
  )
}
