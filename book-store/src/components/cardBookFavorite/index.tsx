import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { BookDetailProps } from '../../types/interfaces'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../redux/store'
import { toggleItemInFavorites } from '../../redux/favorite-slice'
import './index.scss'

export const CardBookFavorite = ({ title, image, subtitle, price, rating, isbn13 }: BookDetailProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const favoriteItems = useSelector((state: RootState) => state.favorites.list)
  const isInFavorite = favoriteItems.some(item => item.isbn13 === isbn13)

  const handleToggleFavorite = () => {
    dispatch(toggleItemInFavorites({ title, image, subtitle, price, rating, isbn13 }))
  }

  return (
    <div className="favorite-card">
      <div className="favorite-card__image">
        <img src={image} alt="book" />
      </div>
      <div className="favorite-card_info">
        <h3 className="info__title">{title}</h3>
        <p className="info__subtitle">{subtitle}</p>

        <div className="favorite-card__price">
          <p className="price__text">{price}</p>
          <div className="books-detail__rating">
              {'★'.repeat(rating) + '☆'.repeat(5 - rating)}
            </div>
        </div>
      </div>

      {/* <div className="favorite-card__icon">
        <FaHeart/>
      </div> */}

      <div className="books-item__favorite" onClick={handleToggleFavorite}>
        {isInFavorite ? <FaHeart className='favorite-card__icon-active' /> : <FaRegHeart />}
      </div>
    </div>
  )
}
