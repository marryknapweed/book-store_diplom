import { createBrowserRouter } from 'react-router-dom'
import { NewBooksPage } from './pages/NewBooks'
import { Layout } from './components/Layout'
import { SearchResultsPage } from './pages/SearchResult'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <NewBooksPage />
      },

      {
        path: '/new',
        element: <NewBooksPage />
      },

      {
        path: 'books/search/:query',
        element: <SearchResultsPage />
      }
    ]
  }
])
