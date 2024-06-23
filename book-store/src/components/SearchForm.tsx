// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { searchBooks } from '../redux/book-slice'
// import { RootState, AppDispatch } from '../redux/store'
// import { Book } from '../types/interfaces'
// import './seatch.scss'

// export const SearchForm: React.FC = () => {
//   const [search, setSearch] = useState('')
//   const [autocompleteVisible, setAutocompleteVisible] = useState(false) // Состояние для управления видимостью списка
//   const [autocompleteResults, setAutocompleteResults] = useState<Book[]>([])
//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()

//   const books = useSelector((state: RootState) => state.books.list)
//   const isLoading = useSelector((state: RootState) => state.books.isLoading)

//   const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(event.target.value)
//     if (event.target.value !== '') {
//       dispatch(searchBooks(event.target.value))
//       setAutocompleteVisible(true) // Показываем список при вводе
//     } else {
//       setAutocompleteVisible(false) // Скрываем список при пустом вводе
//       setAutocompleteResults([])
//     }
//   }

//   useEffect(() => {
//     if (search !== '') {
//       setAutocompleteResults(books)
//       setAutocompleteVisible(true) // Показываем список при наличии результатов поиска
//     } else {
//       setAutocompleteVisible(false) // Скрываем список при пустом вводе
//       setAutocompleteResults([])
//     }
//   }, [books, search])

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     if (search === '') {
//       alert('Enter your search term')
//       return
//     }
//     navigate(`search/${search}`)
//     setSearch('') // Очистка поля поиска после отправки формы
//     setAutocompleteVisible(false) // Скрытие списка после отправки формы
//   }

//   const handleClickOutside = (event: MouseEvent) => {
//     const target = event.target as HTMLElement
//     if (!target.closest('.header__search')) {
//       setAutocompleteVisible(false) // Скрыть список при клике вне области поиска
//     }
//   }

//   const handleItemClick = (isbn: string) => {
//     navigate(`books/${isbn}`)
//     setSearch('')
//     setAutocompleteVisible(false) // Скрыть список при клике по элементу списка
//   }

//   useEffect(() => {
//     document.addEventListener('click', handleClickOutside)

//     return () => {
//       document.removeEventListener('click', handleClickOutside)
//     }
//   }, [])

//   return (
//     <form className='search' onSubmit={handleSubmit}>
//       <div className='header__search'>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={search}
//           onChange={handleChangeSearch}
//           onFocus={() => setAutocompleteVisible(true)} // Показываем список при фокусе на поле ввода
//         />
//         {autocompleteVisible && search && (
//           <ul className='autocomplete'>
//             {isLoading
//               ? (
//               <li className="autocomplete__item">Loading...</li>
//                 )
//               : (
//                   autocompleteResults.map((book) => (
//                 <li key={book.isbn13} className="autocomplete__item" onClick={() => handleItemClick(book.isbn13)}>
//                   <img src={book.image} alt={book.title} />
//                   <div className="title">{book.title}</div>
//                 </li>
//                   ))
//                 )}
//           </ul>
//         )}
//       </div>
//     </form>
//   )
// }

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { searchBooks } from '../redux/book-slice'
import { RootState, AppDispatch } from '../redux/store'
import { Book } from '../types/interfaces'
import './seatch.scss'

export const SearchForm: React.FC = () => {
  const [search, setSearch] = useState('')
  const [autocompleteVisible, setAutocompleteVisible] = useState(false) // Состояние для управления видимостью списка
  const [autocompleteResults, setAutocompleteResults] = useState<Book[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const books = useSelector((state: RootState) => state.books.list)
  const isLoading = useSelector((state: RootState) => state.books.isLoading)

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    if (event.target.value !== '') {
      dispatch(searchBooks(event.target.value))
      setAutocompleteVisible(true) // Показываем список при вводе
    } else {
      setAutocompleteVisible(false) // Скрываем список при пустом вводе
      setAutocompleteResults([])
    }
  }

  useEffect(() => {
    if (search !== '') {
      setAutocompleteResults(books)
      setAutocompleteVisible(true) // Показываем список при наличии результатов поиска
    } else {
      setAutocompleteVisible(false) // Скрываем список при пустом вводе
      setAutocompleteResults([])
    }
  }, [books, search])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (search === '') {
      alert('Enter your search term')
      return
    }
    navigate(`search/${search}`)
    setSearch('') // Очистка поля поиска после отправки формы
    setAutocompleteVisible(false) // Скрытие списка после отправки формы
  }

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.header__search')) {
      setAutocompleteVisible(false) // Скрыть список при клике вне области поиска
    }
  }

  const handleItemClick = (isbn: string) => {
    navigate(`books/${isbn}`)
    setSearch('')
    setAutocompleteVisible(false) // Скрыть список при клике по элементу списка
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

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

  return (
    <form className='search' onSubmit={handleSubmit}>
      <div className='header__search'>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleChangeSearch}
          onFocus={() => setAutocompleteVisible(true)} // Показываем список при фокусе на поле ввода
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

export default SearchForm
