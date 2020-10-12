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

  useEffect(() => {
    dispatch(initialBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const createBlogRef = useRef()

  const handleCreateBlog = async (blog) => {
    createBlogRef.current.toggleVisibility()
    dispatch(createBlogAction(blog))
  }

  const handleLikeClick = async (blog) => {
    dispatch(likeBlogAction(blog))
  }

  const handleRemoveClick = async (blog) => {
    dispatch(removeBlogAction(blog))
  }

  const handleLogin = async (userLoggedIn) => {
    dispatch(loginAction(userLoggedIn))
  }

  const handleLogout = () => {
    dispatch(logoutAction())
  }

  const user = useSelector((state) => state.user)

  return (
    <div>
      <h1>Blog list</h1>
      {/* <Notification className='error' notification={error} />
      <Notification className='notification' notification={notification} /> */}
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
