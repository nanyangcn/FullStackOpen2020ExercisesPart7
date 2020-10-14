import blogService from '../services/blogs'

import { setMessageAction, setErrorAction } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE': {
      const newState = [...state, action.data]
      return newState
    }
    case 'LIKE': {
      const newState = state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      )
      return newState
    }
    case 'REMOVE': {
      const newState = state.filter((blog) => blog.id !== action.data.id)
      return newState
    }
    case 'INITIALIZE_BLOG': {
      const newState = [...action.data]
      return newState
    }
    case 'CREATE_COMMENT': {
      const newState = state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      )
      return newState
    }
    default: {
      return state
    }
  }
}

export const createCommentAction = (blog, comment, loggedUser) => {
  return async (dispatch) => {
    try {
      const response = await blogService.createComment(blog.id, comment)
      response.user = {}
      response.user.username = loggedUser.username
      dispatch({
        type: 'CREATE_COMMENT',
        data: response,
      })
      dispatch(setMessageAction(`new comment added`, 5))
    } catch (error) {
      dispatch(setErrorAction(error.response.data.error, 5))
    }
  }
}

export const createBlogAction = (blog, loggedUser) => {
  return async (dispatch) => {
    try {
      const response = await blogService.create(blog)
      response.user = {}
      response.user.username = loggedUser.username
      dispatch({
        type: 'CREATE',
        data: response,
      })
      dispatch(
        setMessageAction(`a blog ${blog.title} by ${blog.author} added`, 5)
      )
    } catch (error) {
      dispatch(setErrorAction(error.response.data.error, 5))
    }
  }
}

export const likeBlogAction = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = { ...blog }
      newBlog.likes += 1
      await blogService.update(newBlog)
      dispatch({
        type: 'LIKE',
        data: newBlog,
      })
    } catch (error) {
      dispatch(setErrorAction(error.response.data.error, 5))
    }
  }
}

export const removeBlogAction = (blog) => {
  return async (dispatch) => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      try {
        await blogService.remove(blog.id)
        dispatch({
          type: 'REMOVE',
          data: blog,
        })
        dispatch(setMessageAction('blog deleted', 5))
      } catch (error) {
        dispatch(setErrorAction(error.response.data.error, 5))
      }
    }
  }
}

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE_BLOG',
      data: blogs,
    })
  }
}

export default reducer
