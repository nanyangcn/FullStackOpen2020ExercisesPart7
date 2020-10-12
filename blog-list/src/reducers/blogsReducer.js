import blogService from '../services/blogs'

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
      const newState = state.blogs.filter((blog) => blog.id !== action.data.id)
      return newState
    }
    case 'INITIALIZE_BLOG': {
      const newState = [...action.data]
      return newState
    }
    default: {
      return state
    }
  }
}

export const createBlogAction = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.create(blog)
      dispatch({
        type: 'CREATE',
        data: response,
      })
      // setNotification(`a blog ${blog.title} by ${blog.author} added`)
      // setTimeout(() => setNotification(null), 5000)
    } catch (error) {
      // setError(error.response.data.error)
      // setTimeout(() => setError(null), 5000)
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
      // setError(error.response.data.error)
      // setTimeout(() => setError(null), 5000)
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
        // setNotification('blog deleted')
        // setTimeout(() => setNotification(null), 5000)
      } catch (error) {
        // setError(error.response.data.error)
        // setTimeout(() => setError(null), 5000)
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
