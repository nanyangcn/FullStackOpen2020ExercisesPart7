import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Menu = ({ handleLogout }) => {
  const loggedUser = useSelector((state) => state.loggedUser)

  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to='/' style={padding}>
        blogs
      </Link>
      <Link to='/users' style={padding}>
        users
      </Link>
      {loggedUser && loggedUser.name} logged in
      <button id='logoutButton' onClick={handleLogout}>
        log out
      </button>
    </div>
  )
}

export default Menu
