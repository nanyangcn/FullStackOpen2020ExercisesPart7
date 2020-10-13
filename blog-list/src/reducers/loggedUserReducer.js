import blogService from '../services/blogs'
import loginService from '../services/login'
import { setErrorAction } from './notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const newState = action.data
      return newState
    }
    case 'LOGOUT': {
      return null
    }
    default: {
      return state
    }
  }
}

export const loginAction = (userLoggedIn) => {
  return async (dispatch) => {
    try {
      const user = await loginService(userLoggedIn)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user,
      })
    } catch (error) {
      dispatch(setErrorAction(error.response.data.error, 5))
    }
  }
}

export const logoutAction = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({
      type: 'LOGOUT',
      data: null,
    })
  }
}

export const initializeLoggedUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'LOGIN',
        data: loggedUser,
      })
      blogService.setToken(loggedUser.token)
    }
  }
}

export default reducer
