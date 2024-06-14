import React from 'react'
import { Title } from '../components/Title'
import { NewBooksList } from '../components/newBooksList'

export function NewBooksPage () {
  return (
    <>
      <Title>New Releases Books</Title>
      <NewBooksList />
    </>
  )
}
