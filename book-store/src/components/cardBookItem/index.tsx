import { BookDetailProps } from '../../types/interfaces'
import { Title } from '../Title'
import './index.scss'
import { BookTabs } from '../bookTabs'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export const CardBookItem = ({ title, image, price, rating, authors, publisher, language, format, desc, pdf }: BookDetailProps) => {
  const activeTab = useSelector((state: RootState) => state.bookItem.activeTab)

  // const handlePreviewClick = (pdf: string) => {
  //   window.open(pdf, '_blank') // Открываем PDF в новой вкладке
  // }

  const handlePreviewClick = (pdfKey: string) => {
    if (pdf && pdf[pdfKey]) {
      window.open(pdf[pdfKey], '_blank') // Открываем PDF в новой вкладке
    }
  }
  return (
    <>
      <Title>{title}</Title>
      <div className="books-item__content">
        <div className="books-item__image">
          <img src={image} alt={title} />
          <button className="books-item__favorite">&#10084;</button>
        </div>
        <div className="books-item__info">
          <div className="books-item__price">
            <p className="price__text">{price}</p>
            <div className="books-detail__rating">
              {'★'.repeat(rating) + '☆'.repeat(5 - rating)}
            </div>
          </div>
          <ul className="books-detail__details">
            {/* <li><strong>Authors: </strong>{authors}</li>
            <li><strong>Publisher: </strong>{publisher}</li>
            <li><strong>Language: </strong>{language}</li>
            <li><strong>Format: </strong>{format}</li> */}
            {authors && <li><strong>Authors: </strong>{authors}</li>}
            {publisher && <li><strong>Publisher: </strong>{publisher}</li>}
            {language && <li><strong>Language: </strong>{language}</li>}
            {format && <li><strong>Format: </strong>{format}</li>}
          </ul>
          <button className="books-detail__more-details">More details &#9660;</button>
          <button className="books-detail__add-to-cart">Add to cart</button>
          {/* <a className="books-detail__preview" onClick={() => pdf && handlePreviewClick(pdf['Chapter 5'])}>Preview book</a>
          // {pdf && Object.keys(pdf).map((key) => (
          //   <a key={key} className="books-detail__preview" onClick={() => handlePreviewClick(key)}>Preview {key}</a>
          // ))} */}
          {pdf && Object.keys(pdf).map((key) => (
            <a key={key} className="books-detail__preview" onClick={() => handlePreviewClick(key)}>Preview {key}</a>
          ))}
        </div>
      </div>

      <BookTabs />

      {activeTab === 'Description' && (
            <div className="books-detail__description">
              {desc}
            </div>
      )}
          {activeTab === 'Authors' && (
            <div className="books-detail__authors">
              {authors}
            </div>
          )}
          {activeTab === 'Reviews' && (
            <div className="books-detail__reviews">
              {/* Отзывы */}
            </div>
          )}

    </>
  )
}
