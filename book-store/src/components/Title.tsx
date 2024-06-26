import React from 'react'
import { TitleProps } from '../types/type'

export const Title = ({ children }: TitleProps) => {
  const styles = {
    fontFamily: 'Bebas Neue',
    textTransform: 'uppercase' as const,
    fontSize: '56px',
    lineHeight: '64px',
    marginBottom: '72px'
  }

  return <h2 className='title' style={styles}>{children}</h2>
}
