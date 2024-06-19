// src/components/QuantityControl/index.tsx
import React from 'react'
import { IoAdd, IoRemove } from 'react-icons/io5'

interface QuantityControlProps {
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
}

const styleControl = {
  display: 'flex',
  alignItems: 'center',
  width: '168px',
  justifyContent: 'space-between',
  margin: 'auto',
  fontFamily: 'Bebas Neue',
  fontSize: '24px'
}

const styleButton = {
  cursor: 'pointer',
  margin: '0 5px',
  fontSize: '30px'
}

const styleAmount = {
  margin: '0 5px'
}

export const QuantityControl = ({ quantity, onIncrement, onDecrement }: QuantityControlProps) => {
  return (
    <div className="quantity-control" style={styleControl}>
      <IoRemove className="quantity-control__button" onClick={onDecrement} style={styleButton} />
      <span className="quantity-control__amount" style={styleAmount}>{quantity}</span>
      <IoAdd className="quantity-control__button" style={styleButton} onClick={onIncrement} />
    </div>
  )
}
