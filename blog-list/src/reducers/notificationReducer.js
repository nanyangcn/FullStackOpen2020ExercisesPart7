let timeoutId = null

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      const newState = action.data
      return newState
    }
    case 'RESET': {
      return null
    }
    default: {
      return state
    }
  }
}

export const setNotification = (message, sec) => {
  return async (dispatch) => {
    clearTimeout(timeoutId)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: message,
    })
    timeoutId = setTimeout(() => dispatch({ type: 'RESET' }), 1000 * sec)
  }
}

export default reducer
