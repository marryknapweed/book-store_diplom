import React from 'react'
import './index.scss'
import { ContainerProps } from '../../types/type'

export const Container = ({ children }: ContainerProps) => {
  return (
      <div className="container">{children}</div>
  )
}
