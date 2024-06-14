import { createBrowserRouter } from 'react-router-dom'
import { NewBooksPage } from './pages/NewBooks'
import { Layout } from './components/Layout'

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
      }
    ]
  }
])
