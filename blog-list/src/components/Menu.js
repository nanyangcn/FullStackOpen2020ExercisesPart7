import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const Menu = ({ handleLogout }) => {
  const loggedUser = useSelector((state) => state.loggedUser)

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit'>
            <Link style={{ color: 'inherit' }} to='/'>
              blogs
            </Link>
          </Button>
          <Button color='inherit'>
            <Link style={{ color: 'inherit' }} to='/users'>
              users
            </Link>
          </Button>
          <Typography style={{ flexGrow: 1 }} />
          <b>{loggedUser.name}</b>
          <Button
            size='small'
            variant='outlined'
            color='secondary'
            id='logoutButton'
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <br />
    </div>
  )
}

export default Menu
