import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { BookDetailProps } from '../../types/interfaces'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../redux/store'
import { toggleItemInFavorites } from '../../redux/favorite-slice'
import { getImageBackgroundColor } from '../../utils/helpersFunction'
import './index.scss'

export const CardBookFavorite = (props: BookDetailProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const favoriteItems = useSelector((state: RootState) => state.favorites.list)
  const isInFavorite = favoriteItems.some(item => item.isbn13 === props.isbn13)

  const handleToggleFavorite = () => {
    dispatch(toggleItemInFavorites(props))
  }

  return (
    <div className="favorite-card">
      <div className="favorite-card__image" style={{ backgroundColor: getImageBackgroundColor(props.price) }}>
        <img src={props.image} alt="book" />
      </div>
      <div className="favorite-card__info">
        <h3 className="info__title">{props.title}</h3>
        <p className="info__subtitle">{props.subtitle}</p>

        <div className="favorite-card__price">
          <p className="price__text">{props.price}</p>
          <div className="favorite-card__rating">
            {'★'.repeat(props.rating) + '☆'.repeat(5 - props.rating)}
          </div>
        </div>
      </div>

      <div className="favorite-card__favorite" onClick={handleToggleFavorite}>
        {isInFavorite ? <FaHeart className='favorite-card__icon-active' /> : <FaRegHeart />}
      </div>
    </div>
  )
}
