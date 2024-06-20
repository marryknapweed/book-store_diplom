import { createBrowserRouter } from 'react-router-dom'
import { NewBooksPage } from './pages/NewBooks'
import { Layout } from './components/Layout'
import { SearchResultsPage } from './pages/SearchResult'
import { CardBookItemPage } from './pages/CardBookItem'
import { CardBookBasketPage } from './pages/CardBookBasket'
import { CardBookFavoritePage } from './pages/CardBookFavorite'

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
        path: '/books/search/:query',
        element: <SearchResultsPage />
      },

      {
        path: '/books/:id',
        element: <CardBookItemPage />
      },

      {
        path: '/basket',
        element: <CardBookBasketPage />
      },

      {
        path: '/favorites',
        element: <CardBookFavoritePage />
      }

    ]
  }
])

// import { createBrowserRouter } from 'react-router-dom'
// import { NewBooksPage } from './pages/NewBooks'
// import { Layout } from './components/Layout'
// import { SearchResultsPage } from './pages/SearchResult'
// import { CardBookItemPage } from './pages/CardBookItem'

// export const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       {
//         path: '/',
//         element: <NewBooksPage />
//       },
//       {
//         path: '/new',
//         element: <NewBooksPage />
//       },
//       {
//         path: '/books/search/:query',
//         element: <SearchResultsPage />
//       },
//       {
//         path: '/books/:id',
//         element: <CardBookItemPage />
//       }
//     ]
//   }
// ])
