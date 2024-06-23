// import React from 'react'
// import { Link } from 'react-router-dom'

// interface PaginationProps {
//   route: string;
//   pagesCount: number;
//   currentPage: number;
// }

// export function buildPaginationScheme (currentPage: number, pagesCount: number) {
//   const prevPageNumber = currentPage - 1
//   const nextPageNumber = currentPage + 1
//   const scheme = [1, prevPageNumber, currentPage, nextPageNumber, pagesCount]
//   const filteredScheme = scheme.filter(item => item > 0 && item <= pagesCount)
//   const set = new Set(filteredScheme)
//   const result = Array.from(set)

//   if (result[0] + 1 !== result[1]) result.splice(1, 0, '...')
//   if (result.at(-2) + 1 !== result.at(-1)) result.splice(result.length - 1, 0, '...')

//   return result
// }

// export const Pagination: React.FC<PaginationProps> = ({ route, pagesCount, currentPage }) => {
//   const pages = buildPaginationScheme(currentPage, pagesCount)

//   return (
//     <nav>
//       <ul className='pagination'>
//         {pages.map((page, index) =>
//           page === '...'
//             ? (
//               <li key={index} className='page-item disabled'>
//                 <span className='page-link'>...</span>
//               </li>
//               )
//             : (
//               <li key={index} className={`page-item ${page === currentPage ? 'active' : ''}`}>
//                 <Link className='page-link' to={`${route}${page}`}>{page}</Link>
//               </li>
//               )
//         )}
//       </ul>
//     </nav>
//   )
// }
