let timeoutId = null
const initialNotification = {
  message: null,
  type: 'message',
}

const reducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'MESSAGE': {
      const newState = {
        message: action.data,
        type: 'success',
      }
      return newState
    }
    case 'ERROR': {
      const newState = {
        message: action.data,
        type: 'error',
      }
      return newState
    }
    case 'RESET': {
      return initialNotification
    }
    default: {
      return state
    }
  }
}

export const setMessageAction = (message, sec) => {
  return async (dispatch) => {
    clearTimeout(timeoutId)
    dispatch({
      type: 'MESSAGE',
      data: message,
    })
    timeoutId = setTimeout(() => dispatch({ type: 'RESET' }), 1000 * sec)
  }
}

export const setErrorAction = (message, sec) => {
  return async (dispatch) => {
    clearTimeout(timeoutId)
    dispatch({
      type: 'ERROR',
      data: message,
    })
    timeoutId = setTimeout(() => dispatch({ type: 'RESET' }), 1000 * sec)
  }
}

export default reducer
