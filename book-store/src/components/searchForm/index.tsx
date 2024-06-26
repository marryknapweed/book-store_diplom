import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../redux/store'
import { requestBooksSearchAPI } from '../../services/book'
import { Book } from '../../types/interfaces'
import './index.scss'

export const SearchForm: React.FC = () => {
  const [search, setSearch] = useState('')
  const [autocompleteVisible, setAutocompleteVisible] = useState(false) // Локальное состояние для отображения автокомплита
  const [autocompleteResults, setAutocompleteResults] = useState<Book[]>([]) // Локальное состояние для результатов поиска
  const navigate = useNavigate()
  const isLoading = useSelector((state: RootState) => state.books.isLoading)

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (search !== '') {
        try {
          const books = await requestBooksSearchAPI(search)
          setAutocompleteResults(books) // Обновляем локальное состояние результатами поиска
          setAutocompleteVisible(true)
        } catch (error) {
          console.error('Error fetching search results:', error)
        }
      } else {
        setAutocompleteVisible(false)
        setAutocompleteResults([]) // Очищаем результаты при пустом поисковом запросе
      }
    }, 800)

    return () => clearTimeout(delayDebounceFn)
  }, [search])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    setSearch(input)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (search === '') {
      alert('Введите поисковый запрос')
      return
    }
    navigate(`/search/${search}`)
    setAutocompleteVisible(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.header__search')) {
      setAutocompleteVisible(false)
    }
  }

  const handleItemClick = (isbn: string) => {
    navigate(`/books/${isbn}`)
    setSearch('')
    setAutocompleteVisible(false)
  }

  const highlightSearchTerm = (text: string) => {
    const searchLower = search.toLowerCase()
    const textLower = text.toLowerCase()
    const index = textLower.indexOf(searchLower)
    if (index === -1) {
      return text
    }
    const before = text.slice(0, index)
    const match = text.slice(index, index + search.length)
    const after = text.slice(index + search.length)
    return (
      <>
        {before}
        <strong className='highlight'>{match}</strong>
        {after}
      </>
    )
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <form className='search' onSubmit={handleSubmit}>
      <div className='header__search'>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleInputChange}
        />
        {autocompleteVisible && search && (
          <ul className='autocomplete'>
            {isLoading
              ? (
              <li className="autocomplete__item">Loading...</li>
                )
              : (
                  autocompleteResults.map((book) => (
                <li key={book.isbn13} className="autocomplete__item" onClick={() => handleItemClick(book.isbn13)}>
                  <div className="autocomplete__image">
                    <img src={book.image} alt={book.title} />
                  </div>
                  <div className="title">{highlightSearchTerm(book.title)}</div>
                </li>
                  ))
                )}
          </ul>
        )}
      </div>
    </form>
  )
}
