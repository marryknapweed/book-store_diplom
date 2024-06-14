import React from 'react'
import './index.scss'
import { ContainerProps } from '../../types/type'

export function Container ({ children }: ContainerProps) {
  return (
    <div className="container">{children}</div>
  )
}
