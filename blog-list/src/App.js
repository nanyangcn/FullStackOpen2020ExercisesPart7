import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import {
  initialBlogs,
  createBlogAction,
  likeBlogAction,
  removeBlogAction,
} from './reducers/blogsReducer'
import {
  initializeUser,
  loginAction,
  logoutAction,
} from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initialBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const createBlogRef = useRef()

  const handleCreateBlog = (blog) => {
    createBlogRef.current.toggleVisibility()
    dispatch(createBlogAction(blog, user))
  }

  const handleLikeClick = (blog) => {
    dispatch(likeBlogAction(blog))
  }

  const handleRemoveClick = (blog) => {
    dispatch(removeBlogAction(blog))
  }

  const handleLogin = (userLoggedIn) => {
    dispatch(loginAction(userLoggedIn))
  }

  const handleLogout = () => {
    dispatch(logoutAction())
  }

  return (
    <div>
      <h1>Blog list</h1>
      <Notification />
      {user === null && <LoginForm handleLogin={handleLogin} />}
      {user !== null && (
        <BlogForm
          handleLogout={handleLogout}
          handleCreateBlog={handleCreateBlog}
          handleLikeClick={handleLikeClick}
          handleRemoveClick={handleRemoveClick}
          createBlogRef={createBlogRef}
        />
      )}
    </div>
  )
}

export default App
