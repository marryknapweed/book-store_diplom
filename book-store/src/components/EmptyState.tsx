import React from 'react'
import { EmptyStateProps } from '../types/interfaces'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px',
    textAlign: 'center' as const
  },

  icon: {
    fontSize: '50px',
    color: '#A8A8A8',
    marginBottom: '20px'
  },

  text: {
    fontSize: '24px',
    color: '#313037'
  }
}

export const EmptyState = ({ icon: Icon, text }: EmptyStateProps) => (
  <div className="empty-state" style={styles.container}>
    <Icon className="empty-state__icon" style={styles.icon} />
    <p className="empty-state__text" style={styles.text}>{text}</p>
  </div>
)
