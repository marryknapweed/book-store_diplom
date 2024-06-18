import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { setActiveTab } from '../../redux/book-item-slice'

export const BookTabs = () => {
  const dispatch = useDispatch<AppDispatch>()
  const activeTab = useSelector((state: RootState) => state.bookItem.activeTab)

  const handleTabCLick = (tab) => {
    dispatch(setActiveTab(tab))
  }
  return (
    <div className="book-tabs">
      <button className={`tab ${activeTab === 'Description' ? 'active' : ''}`} onClick={() => handleTabCLick('Description')}>Description</button>
      <button>Authors</button>
      <button>Reviews</button>
    </div>
  )
}
