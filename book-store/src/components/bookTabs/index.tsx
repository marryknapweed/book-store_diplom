import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { setActiveTab } from '../../redux/book-item-slice'
import './index.scss'

export const BookTabs = () => {
  const dispatch = useDispatch<AppDispatch>()
  const activeTab = useSelector((state: RootState) => state.bookItem.activeTab)

  const handleTabClick = (tab: string) => {
    dispatch(setActiveTab(tab))
  }

  return (
    <div className="book-tabs">
    <button
      className={`tab ${activeTab === 'Description' ? 'active' : ''}`}
      onClick={() => handleTabClick('Description')}
    >
      Description
    </button>
    <button
      className={`tab ${activeTab === 'Authors' ? 'active' : ''}`}
      onClick={() => handleTabClick('Authors')}
    >
      Authors
    </button>
    <button
      className={`tab ${activeTab === 'Similar Books' ? 'active' : ''}`}
      onClick={() => handleTabClick('Similar Books')}
    >
      Similar Books
    </button>
  </div>
  )
}
