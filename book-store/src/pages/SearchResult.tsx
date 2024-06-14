// import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchPosts } from '../redux/post-slice'
// import { PostSmall } from '../components/postSmall'
// import { SortOptionSelector } from '../components/SortOptionSelector'
// import { Pagination } from '../components/Pagination'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// export function SearchResultsPage () {
//   const dispatch = useDispatch()
//   const { query } = useParams()
//   const { page: currentPage } = useParams()
//   const posts = useSelector(state => state.post.list)
//   const error = useSelector(state => state.post.error)
//   const isLoading = useSelector(state => state.post.isLoading)
//   const sortOption = useSelector(state => state.post.sortOption)
//   const [searched, setSearched] = useState(false)

//   useEffect(() => {
//     if (query !== '') {
//       setSearched(true)
//       dispatch(fetchPosts({ search: query, page: currentPage || 1, ordering: sortOption }))
//     }
//   }, [dispatch, query, sortOption, currentPage])

//   function renderPosts () {
//     if (isLoading) return <div>Loading...</div>

//     if (error) return <div className="alert alert-danger">{error}</div>

//     if (searched && posts.length === 0) {
//       return <div>No results found for «{query}»</div>
//     }

//     return posts.map(post => <PostSmall key={post.id} post={post} />)
//   }

//   return (
//     <div className="search-posts">
//       <div className="title-sort-container d-flex">
//         <h1>Search results for «{query}»</h1>
//         <SortOptionSelector />
//       </div>
//       {renderPosts()}
//       <Pagination route={`search/${query}/`} />
//     </div>
//   )
// }
import React, { useEffect, useState } from 'react'
import { fetchBooks } from '../redux/book-slice'
import { CardBook } from '../components/cardBook'
import { SortOptionSelector } from '../components/SortOptionSelector'
import { Pagination } from '../components/Pagination'
import { RootState } from '../redux/store'

interface RouteParams {
  query: string;
  page: string;
}

export const SearchResultsPage: React.FC = () => {
  const dispatch = useDispatch()
  const { query } = useParams<RouteParams>()
  const posts = useSelector((state: RootState) => state.books.list)
  const error = useSelector((state: RootState) => state.books.error)
  const isLoading = useSelector((state: RootState) => state.books.isLoading)
  // const sortOption = useSelector((state: RootState) => state.books.sortOption)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (query !== '') {
      setSearched(true)
      dispatch(fetchBooks({ search: query }))
    }
  }, [dispatch, query])

  const renderPosts = () => {
    if (isLoading) return <div>Loading...</div>

    if (error) return <div className="alert alert-danger">{error}</div>

    if (searched && posts.length === 0) {
      return <div>No results found for «{query}»</div>
    }

    return posts.map(post => <CardBook key={post.id} post={post} />)
  }

  return (
    <div className="search-posts">
      <div className="title-sort-container d-flex">
        <h1>Search results for «{query}»</h1>
        <SortOptionSelector />
      </div>
      {renderPosts()}
      <Pagination route={`search/${query}/`} />
    </div>
  )
}
