import React from 'react'
import './index.scss'

interface CartSummaryProps {
  sumTotal: number;
  VAT: number;
  total: number;
}

export const CartSummary = ({ sumTotal, VAT, total }: CartSummaryProps) => {
  return (
    <div className="cart-summary">
      <div className="summary-item">
        <span>Sum total</span>
        <span>${sumTotal.toFixed(2)}</span>
      </div>
      <div className="summary-item">
        <span>VAT</span>
        <span>${VAT.toFixed(2)}</span>
      </div>
      <div className="summary-item total">
        <span>TOTAL:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button className="checkout-button">CHECK OUT</button>
    </div>
  )
}
