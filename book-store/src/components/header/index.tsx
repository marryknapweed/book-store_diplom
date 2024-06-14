import React from 'react'
import { NavLink } from 'react-router-dom'
import { SlBasket, SlHeart } from 'react-icons/sl'
import { SearchForm } from '../SearchForm'
import './index.scss'
import '../../index.scss'

export const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <NavLink to="/">BOOKSTORE</NavLink>
      </div>
      <SearchForm/>
      <div className="header__icons">
        <NavLink to='/favourites'><SlHeart /></NavLink>
        <NavLink to='/basket'><SlBasket /></NavLink>
      </div>
    </header>
  )
}
