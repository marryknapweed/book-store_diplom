import React from 'react'
import { NavLink } from 'react-router-dom'
import { buildPaginationScheme } from '../../utils/buildPaginationScheme'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { PaginationProps } from '../../types/interfaces'
import './index.scss'

export const Pagination = ({ query, currentPage, pagesCount }: PaginationProps) => {
  if (pagesCount <= 1) return null

  // Генерируем схему пагинации
  const paginationScheme = buildPaginationScheme(currentPage, pagesCount)

  return (
    <ul className="pagination">
      <li className={`pagination__button ${currentPage === 1 ? 'disabled' : ''}`}>
        <NavLink
          className="pagination-link__button"
          to={`/search/${query}/${currentPage - 1}`}
        >
          <FaArrowLeftLong />
          <span className="button-text">Previous</span>
        </NavLink>
      </li>

      <li className='page-item'>
        {paginationScheme.map((item, index) => (
          <div key={index} className={`page-item ${currentPage === item ? 'active' : ''}`}>
            {item === '...'
              ? (
                <span className="page-link">...</span>
                )
              : (
                <NavLink
                  className="page"
                  to={`/search/${query}/${item}`}
                >
                  {item}
                </NavLink>
                )}
          </div>
        ))}
      </li>
      <li className={`pagination__button ${currentPage === pagesCount ? 'disabled' : ''}`}>
        <NavLink
          className="pagination-link__button"
          to={`/search/${query}/${currentPage + 1}`}
          aria-label="Next"
        >
          <span className="button-text">Next</span>
          <FaArrowRightLong />
        </NavLink>
      </li>
    </ul>
  )
}
