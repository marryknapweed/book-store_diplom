import React from 'react'

export const Footer = () => {
  const styles = {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#A8A8A8',
    borderTop: '1px solid #E7E7E7',
    padding: '34px 0'
  }

  return (
    <footer style={styles}>
     <span>© 2022</span>
     <span>All rights reserved</span>
    </footer>
  )
}
