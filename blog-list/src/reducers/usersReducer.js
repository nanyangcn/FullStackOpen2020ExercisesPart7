import usersService from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_USERS': {
      const newState = action.data
      return newState
    }
    default: {
      return state
    }
  }
}

export const initializeUsersAction = () => {
  return async (dispatch) => {
    const response = await usersService.getAll()
    dispatch({
      type: 'INITIALIZE_USERS',
      data: response,
    })
  }
}

export default reducer
