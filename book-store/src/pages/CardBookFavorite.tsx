import React from 'react'
import { Title } from '../components/Title'
import { useSelector } from 'react-redux'
import { CardBookFavorite } from '../components/cardBookFavorite'
import { RootState } from '../redux/store'
import { EmptyState } from '../components/EmptyState'
import { FaHeart } from 'react-icons/fa'

export const CardBookFavoritePage = () => {
  const favoriteItems = useSelector((state: RootState) => state.favorites.list)

  return (
    <div className="cart__favorites">
      <Title>Favorites</Title>

      {favoriteItems.length === 0
        ? (
          <EmptyState icon={FaHeart} text="Your favorites is empty" />
          )
        : (
            favoriteItems.map((item) => (
             <CardBookFavorite key={item.isbn13} {...item} />
            ))
          )}
    </div>
  )
}
