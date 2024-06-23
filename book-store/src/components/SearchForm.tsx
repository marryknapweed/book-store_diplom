import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SearchForm: React.FC = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (search === '') {
      alert('Enter your search term')
      return
    }
    navigate(`search/${search}`)
  }

  return (
    <form className="header__search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleChangeSearch}
      />
      <button type="submit">Search</button>
    </form>
  )
}
