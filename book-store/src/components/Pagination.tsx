// import React from 'react'
// import { NavLink, useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { RootState } from '../redux/store'
// import { buildPaginationScheme } from '../utils/buildPaginationScheme'

// interface PaginationProps {
//   query: string; // Запрос для поиска книг
//   currentPage: string; // Текущая страница
//   pagesCount: number; // Общее количество страниц
// }

// export function Pagination (props: PaginationProps) {
//   const { page: currentPage } = useParams()
//   const pagesCount = useSelector((state: RootState) => state.books.pagesCount)

//   if (!pagesCount) return null

//   const paginationScheme = buildPaginationScheme(currentPage, pagesCount)

//   return (
//     <ul className="pagination">
//       {paginationScheme.map((item, index) => {
//         if (item === '...') {
//           return (
//             <li className="page-item" key={index}>
//               <span className="page-link">...</span>
//             </li>
//           )
//         }

//         return (
//           <li className="page-item" key={index}>
//             <NavLink className="page-link" to={`/search/${props.query}/${item}`}>
//               {item}
//             </NavLink>
//           </li>
//         )
//       })}
//     </ul>
//   )
// }

// components/Pagination.tsx
// работает
// import React from 'react'
// import { NavLink, useNavigate } from 'react-router-dom'

// interface Props {
//   query: string;
//   currentPage: number;
//   pagesCount: number;
// }

// export function Pagination ({ query, currentPage, pagesCount }: Props) {
//   const navigate = useNavigate() // useNavigate hook from react-router-dom v6

//   if (pagesCount <= 1) return null

//   return (
//     <ul className="pagination">
//       <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//         <NavLink
//           className="page-link"
//           to={`${query}/${currentPage - 1}`}
//           onClick={(event) => {
//             event.preventDefault()
//             if (currentPage > 1) {
//               navigate(`${query}/${currentPage - 1}`)
//             }
//           }}
//         >
//           Previous
//         </NavLink>
//       </li>
//       {Array.from({ length: pagesCount }, (_, index) => (
//         <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
//           <NavLink
//             className="page-link"
//             to={`${query}/${index + 1}`}
//             onClick={(event) => {
//               event.preventDefault()
//               navigate(`${query}/${index + 1}`)
//             }}
//           >
//             {index + 1}
//           </NavLink>
//         </li>
//       ))}
//       <li className={`page-item ${currentPage === pagesCount ? 'disabled' : ''}`}>
//         <NavLink
//           className="page-link"
//           to={`${query}/${currentPage + 1}`}
//           onClick={(event) => {
//             event.preventDefault()
//             if (currentPage < pagesCount) {
//               navigate(`${query}/${currentPage + 1}`)
//             }
//           }}
//         >
//           Next
//         </NavLink>
//       </li>
//     </ul>
//   )
// }

import React from 'react'
import { NavLink } from 'react-router-dom'

interface Props {
  query: string;
  currentPage: number;
  pagesCount: number;
}

export function Pagination ({ query, currentPage, pagesCount }: Props) {
  if (pagesCount <= 1) return null

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <NavLink
          className="page-link"
          to={`/search/${query}/${currentPage - 1}`}
        >
          Previous
        </NavLink>
      </li>
      {Array.from({ length: pagesCount }, (_, index) => (
        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
          <NavLink
            className="page-link"
            to={`/search/${query}/${index + 1}`}
          >
            {index + 1}
          </NavLink>
        </li>
      ))}
      <li className={`page-item ${currentPage === pagesCount ? 'disabled' : ''}`}>
        <NavLink
          className="page-link"
          to={`/search/${query}/${currentPage + 1}`}
        >
          Next
        </NavLink>
      </li>
    </ul>
  )
}
